import { NextRequest, NextResponse } from 'next/server'
import { isValidSolanaAddress } from '@/lib/format'
import { poolTokens, tokenPriceUsd, vestingSchedule } from '@/lib/constants'
import { computeTotalVolumeProxy } from '@/lib/math'
import { getCached, setCached } from '@/lib/cache'

type VestingEntry = { month: number; unlockedTokens: number; unlockedUsd: number }

type WalletApiResponse =
  | { enabled: false; reason: 'missing_env' }
  | { enabled: true; error: 'invalid_address' | 'provider_error' | 'queued' }
  | { enabled: true; found: false }
  | {
      enabled: true
      found: true
      wallet: string
      walletVolumeUsd: number
      tier: string
      allocationTokens: number
      allocationUsd: number
      vesting: VestingEntry[]
    }

function getTierFromVolume(volumeUsd: number): string {
  if (volumeUsd >= 100_000_000) return 'E' // $100M+
  if (volumeUsd >= 10_000_000) return 'D' // $10M–$100M
  if (volumeUsd >= 1_000_000) return 'C' // $1M–$10M
  if (volumeUsd >= 100_000) return 'B' // $100K–$1M
  return 'A' // $10K–$100K
}

function computeWalletVesting(allocationTokens: number, tierId: string): VestingEntry[] {
  const rule = vestingSchedule.find((v) => v.tierId === tierId)

  const tge = rule?.tge ?? 1
  const linearMonths = rule?.linearMonths ?? 0
  const linearShare = rule?.linearShare ?? 0

  const out: VestingEntry[] = []
  for (let month = 0; month <= 12; month++) {
    let unlockedFraction = tge
    if (month > 0 && linearMonths > 0) {
      const monthsVested = Math.min(month, linearMonths)
      unlockedFraction += (monthsVested / linearMonths) * linearShare
    }
    const unlockedTokens = allocationTokens * unlockedFraction
    out.push({
      month,
      unlockedTokens,
      unlockedUsd: unlockedTokens * tokenPriceUsd,
    })
  }
  return out
}

// Bitquery GraphQL query for PumpFun + PumpSwap volume
const BITQUERY_ENDPOINT = 'https://streaming.bitquery.io/graphql'

const VOLUME_QUERY = `
query GetWalletVolume($wallet: String!) {
  Solana(dataset: combined) {
    DEXTradeByTokens(
      where: {
        Trade: {
          Account: { 
            Owner: { is: $wallet } 
          }
          Dex: { 
            ProgramAddress: { 
              in: [
                "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
                "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
              ] 
            } 
          }
          Currency: {
            MintAddress: {
              in: [
                "So11111111111111111111111111111111111111112",
                "11111111111111111111111111111111"
              ]
            }
          }
        }
        Transaction: { Result: { Success: true } }
      }
    ) {
      Trade {
        Dex {
          ProtocolName
          ProgramAddress
        }
      }
      total_volume_usd: sum(of: Trade_AmountInUSD)
      trade_count: count
    }
  }
}
`

async function fetchBitqueryVolume(wallet: string, apiKey: string): Promise<{ volumeUsd: number; tradeCount: number } | null> {
  const response = await fetch(BITQUERY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query: VOLUME_QUERY,
      variables: { wallet },
    }),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`Bitquery request failed: ${response.status} ${text}`)
  }

  const data = await response.json()

  // Debug log to see what we're getting
  console.log('Bitquery response:', JSON.stringify(data, null, 2))

  if (data.errors && data.errors.length > 0) {
    throw new Error(`Bitquery error: ${data.errors[0].message}`)
  }

  const trades = data.data?.Solana?.DEXTradeByTokens
  if (!trades || trades.length === 0) {
    return null
  }

  // Sum all volumes from all DEX entries (PumpFun + PumpSwap)
  let totalVolumeUsd = 0
  let totalTradeCount = 0

  for (const trade of trades) {
    // Handle both string and number types from Bitquery
    const volumeUsd = typeof trade.total_volume_usd === 'string'
      ? parseFloat(trade.total_volume_usd)
      : (trade.total_volume_usd || 0)

    const tradeCount = typeof trade.trade_count === 'string'
      ? parseInt(trade.trade_count, 10)
      : (trade.trade_count || 0)

    totalVolumeUsd += volumeUsd
    totalTradeCount += tradeCount

    console.log(`DEX ${trade.Trade?.Dex?.ProtocolName}: $${volumeUsd.toFixed(2)} (${tradeCount} trades)`)
  }

  console.log(`TOTAL: $${totalVolumeUsd.toFixed(2)} (${totalTradeCount} trades)`)

  return {
    volumeUsd: totalVolumeUsd,
    tradeCount: totalTradeCount,
  }
}

export async function GET(request: NextRequest) {
  const bitqueryApiKey = process.env.BITQUERY_API_KEY

  if (!bitqueryApiKey) {
    return NextResponse.json({ enabled: false, reason: 'missing_env' })
  }

  const address = request.nextUrl.searchParams.get('address')?.trim()
  if (!address || !isValidSolanaAddress(address)) {
    return NextResponse.json({ enabled: true, error: 'invalid_address' })
  }

  // Check Vercel KV cache
  const cacheKey = `wallet:${address}`
  const cached = await getCached<WalletApiResponse>(cacheKey)
  if (cached) {
    console.log(`Cache HIT: ${address.slice(0, 8)}...`)
    return NextResponse.json(cached)
  }

  console.log(`Cache MISS: ${address.slice(0, 8)}... calling Bitquery`)

  try {
    const result = await fetchBitqueryVolume(address, bitqueryApiKey)

    if (!result || result.volumeUsd <= 0) {
      const notFound = { enabled: true, found: false } as WalletApiResponse
      await setCached(cacheKey, notFound)
      return NextResponse.json(notFound)
    }

    const walletVolumeUsd = result.volumeUsd
    const tier = getTierFromVolume(walletVolumeUsd)
    const totalVolumeUsdProxy = computeTotalVolumeProxy()
    const allocationTokens = poolTokens * (walletVolumeUsd / totalVolumeUsdProxy)
    const allocationUsd = allocationTokens * tokenPriceUsd
    const vesting = computeWalletVesting(allocationTokens, tier)

    const ok: WalletApiResponse = {
      enabled: true,
      found: true,
      wallet: address,
      walletVolumeUsd,
      tier,
      allocationTokens,
      allocationUsd,
      vesting,
    }

    await setCached(cacheKey, ok)
    console.log(`Cached: ${address.slice(0, 8)}...`)
    return NextResponse.json(ok)
  } catch (err: unknown) {
    console.error('Bitquery API error:', err)
    return NextResponse.json({ enabled: true, error: 'provider_error' })
  }
}