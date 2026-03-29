'use client'

import { useState } from 'react'
import { Terminal, AlertCircle, Info, Loader2 } from 'lucide-react'
import { Button, ResultCard } from '@/components'
import { isValidSolanaAddress } from '@/lib/format'

interface VestingEntry {
  month: number
  unlockedTokens: number
  unlockedUsd: number
}

interface WalletApiResponse {
  enabled: boolean
  reason?: string
  error?: 'invalid_address' | 'provider_error'
  found?: boolean
  wallet?: string
  walletVolumeUsd?: number
  tier?: string
  allocationTokens?: number
  allocationUsd?: number
  vesting?: VestingEntry[]
}

interface WalletResult {
  address: string
  volumeUsd: number
  tierId: string
  tokens: number
  usd: number
  vesting: VestingEntry[]
}

type PageState =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'disabled' }
  | { type: 'error'; message: string }
  | { type: 'not_found' }
  | { type: 'success'; result: WalletResult }

export default function CalcPage() {
  const [address, setAddress] = useState('')
  const [state, setState] = useState<PageState>({ type: 'idle' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedAddress = address.trim()

    if (!trimmedAddress) {
      setState({ type: 'error', message: 'Please enter a wallet address' })
      return
    }

    if (!isValidSolanaAddress(trimmedAddress)) {
      setState({ type: 'error', message: 'Invalid Solana address format' })
      return
    }

    setState({ type: 'loading' })

    try {
      const response = await fetch(`/api/wallet?address=${encodeURIComponent(trimmedAddress)}`)
      const data: WalletApiResponse = await response.json()

      if (!data.enabled) {
        setState({ type: 'disabled' })
        return
      }

      if (data.error === 'invalid_address') {
        setState({ type: 'error', message: 'Invalid Solana address format' })
        return
      }

      if (data.error === 'provider_error') {
        setState({ type: 'error', message: 'API error. Try again in a bit.' })
        return
      }

      if (!data.found) {
        setState({ type: 'not_found' })
        return
      }

      if (
        data.wallet &&
        data.walletVolumeUsd !== undefined &&
        data.tier &&
        data.allocationTokens !== undefined &&
        data.allocationUsd !== undefined &&
        data.vesting
      ) {
        setState({
          type: 'success',
          result: {
            address: data.wallet,
            volumeUsd: data.walletVolumeUsd,
            tierId: data.tier,
            tokens: data.allocationTokens,
            usd: data.allocationUsd,
            vesting: data.vesting,
          },
        })
      } else {
        setState({ type: 'error', message: 'Received incomplete data from the server' })
      }
    } catch (error) {
      console.error('API call failed:', error)
      setState({ type: 'error', message: 'Failed to connect to the server. Please try again.' })
    }
  }

  const isLoading = state.type === 'loading'

  return (
    <div className="relative">
      <section className="border-b-2 border-zinc-800 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 border-2 border-lime-400 flex items-center justify-center">
              <Terminal size={16} className="text-lime-400" />
            </div>
            <span className="font-terminal text-zinc-500 text-sm">WALLET_LOOKUP</span>
          </div>
          <h1 className="font-terminal text-3xl sm:text-4xl text-white tracking-wide">
            CHECK YOUR <span className="text-lime-400">ALLOCATION</span>
          </h1>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Paste your Solana wallet. Get your estimated airdrop.
          </p>
          <p className="mt-3 font-marker text-zinc-600 text-sm rotate-slight-ccw">
            no wallet connect. just vibes.
          </p>
        </div>
      </section>

      <div className="py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {state.type === 'disabled' && (
            <div className="mb-8 sticker-card-pink p-6">
              <div className="flex gap-4">
                <AlertCircle className="h-6 w-6 shrink-0 text-pink-400" />
                <div>
                  <h3 className="font-terminal text-pink-400 tracking-wide">{'>'} LOOKUP_OFFLINE</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Live wallet lookup is disabled. Set BITQUERY_API_KEY in environment.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="window-card">
            <div className="window-titlebar">
              <span className="window-titlebar-text">wallet_checker.exe</span>
              <div className="flex gap-1">
                <button type="button" className="window-btn" />
                <button type="button" className="window-btn" />
                <button type="button" className="window-btn" />
              </div>
            </div>

            <div className="p-4 bg-black/30">
              <div className="mb-4">
                <label htmlFor="wallet" className="font-terminal text-xs text-zinc-500 tracking-wide">
                  {'>'} paste_wallet:
                </label>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  id="wallet"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                    if (state.type === 'error' || state.type === 'not_found') setState({ type: 'idle' })
                  }}
                  placeholder="So1ana...WaLLeT"
                  className="flex-1 font-terminal text-lime-400 bg-transparent border-2 border-zinc-700 px-3 py-2.5 placeholder-zinc-600 outline-none transition-colors focus:border-lime-400/50 text-sm tracking-wide"
                  disabled={isLoading}
                  autoComplete="off"
                  spellCheck={false}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      CHECKING…
                    </>
                  ) : (
                    <>
                      <Terminal size={18} />
                      RUN TEK
                    </>
                  )}
                </Button>
              </div>

              {state.type === 'error' && (
                <div className="mt-4 border border-pink-500/50 bg-pink-500/10 p-3">
                  <p className="font-terminal text-sm text-pink-400">
                    {'>'} ERROR: {state.message}
                  </p>
                </div>
              )}

              {state.type === 'not_found' && (
                <div className="mt-4 border border-zinc-700 bg-zinc-800/50 p-3">
                  <p className="font-terminal text-sm text-zinc-400">{'>'} NOT_FOUND</p>
                  <p className="mt-2 text-xs text-zinc-500">
                    This wallet has no qualifying volume in the dataset (min $10K lifetime on Pump.fun or PumpSwap).
                  </p>
                  <p className="mt-2 font-marker text-xs text-zinc-600 rotate-slight-ccw">ngmi… jk keep trading</p>
                </div>
              )}
            </div>
          </form>

          {state.type === 'success' && (
            <div className="mt-8">
              <ResultCard
                address={state.result.address}
                volumeUsd={state.result.volumeUsd}
                tierId={state.result.tierId}
                tokens={state.result.tokens}
                vesting={state.result.vesting}
              />
            </div>
          )}

          <div className="mt-8 sticker-card p-6">
            <div className="flex gap-3">
              <Info className="h-5 w-5 shrink-0 text-lime-400" />
              <div>
                <h3 className="font-terminal text-lime-400 tracking-wide">{'>'} HOW_IT_WORKS</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  We query Bitquery for your wallet&apos;s Pump.fun + PumpSwap volume, then calculate your estimated allocation
                  based on linear-by-volume distribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
