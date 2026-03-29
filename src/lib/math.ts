import {
  tiers,
  vestingSchedule,
  poolTokens,
  tokenPriceUsd,
  baselineClaimRate,
  baselineSellRate,
} from './constants'

/**
 * Compute total volume proxy (ΣV approximation)
 * Using wallets * midpointUsd per tier as proxy
 */
export function computeTotalVolumeProxy(): number {
  return tiers.reduce((sum, tier) => sum + tier.wallets * tier.midpointUsd, 0)
}

/**
 * Compute tier shares using linear-by-midpoints model
 * Share_tier = (wallets_tier * midpointUsd_tier) / ΣV
 */
export function computeTierSharesLinearByMidpoints() {
  const totalVolumeProxy = computeTotalVolumeProxy()

  return tiers.map((tier) => {
    const tierVolumeProxy = tier.wallets * tier.midpointUsd
    const share = tierVolumeProxy / totalVolumeProxy

    return {
      ...tier,
      volumeProxy: tierVolumeProxy,
      share,
      tokensAllocated: poolTokens * share,
    }
  })
}

/**
 * Compute tier averages (Model B: linear by volume)
 * Returns tokens per tier, avg tokens per wallet, avg USD per wallet
 */
export function computeTierAveragesModelB() {
  const tierShares = computeTierSharesLinearByMidpoints()

  return tierShares.map((tier) => {
    const avgTokensPerWallet = tier.tokensAllocated / tier.wallets
    const avgUsdPerWallet = avgTokensPerWallet * tokenPriceUsd

    return {
      tierId: tier.id,
      label: tier.label,
      wallets: tier.wallets,
      share: tier.share,
      tokensAllocated: tier.tokensAllocated,
      avgTokensPerWallet,
      avgUsdPerWallet,
    }
  })
}

/**
 * Compute wallet allocation based on volume
 * Ai = poolTokens * (walletVolumeUsd / totalVolumeUsdProxy)
 * Note: This is an approximation until ΣV from full Dune query available
 */
export function computeWalletAllocation(walletVolumeUsd: number) {
  const totalVolumeProxy = computeTotalVolumeProxy()
  const tokens = poolTokens * (walletVolumeUsd / totalVolumeProxy)
  const usd = tokens * tokenPriceUsd

  return { tokens, usd }
}

/**
 * Determine tier for a given volume
 */
export function getTierForVolume(volumeUsd: number): string {
  if (volumeUsd >= 100_000_000) return 'E'
  if (volumeUsd >= 10_000_000) return 'D'
  if (volumeUsd >= 1_000_000) return 'C'
  if (volumeUsd >= 100_000) return 'B'
  return 'A'
}

/**
 * Get vesting schedule for a tier
 */
export function getVestingForTier(tierId: string) {
  return vestingSchedule.find((v) => v.tierId === tierId) || vestingSchedule[0]
}

export interface MonthlyUnlock {
  month: number
  unlockedShareTotalPool: number
  unlockedTokens: number
  unlockedUsd: number
}

/**
 * Compute monthly unlock schedule for the entire pool (months 0..12)
 * Aggregates all tiers' vesting schedules weighted by their allocations
 */
export function computeMonthlyUnlockSchedule(): MonthlyUnlock[] {
  const tierAverages = computeTierAveragesModelB()
  const months: MonthlyUnlock[] = []

  for (let month = 0; month <= 12; month++) {
    let totalUnlockedTokens = 0

    for (const tier of tierAverages) {
      const vesting = getVestingForTier(tier.tierId)

      // TGE unlock at month 0
      let tierUnlockedFraction = vesting.tge

      // Linear vesting after TGE
      if (month > 0 && vesting.linearMonths > 0) {
        const monthsVested = Math.min(month, vesting.linearMonths)
        const linearUnlocked = (monthsVested / vesting.linearMonths) * vesting.linearShare
        tierUnlockedFraction += linearUnlocked
      }

      totalUnlockedTokens += tier.tokensAllocated * tierUnlockedFraction
    }

    const unlockedShareTotalPool = totalUnlockedTokens / poolTokens
    const unlockedUsd = totalUnlockedTokens * tokenPriceUsd

    months.push({
      month,
      unlockedShareTotalPool,
      unlockedTokens: totalUnlockedTokens,
      unlockedUsd,
    })
  }

  return months
}

export interface MonthlySellPressure {
  month: number
  newlyUnlockedTokens: number
  newlyUnlockedUsd: number
  sellPressureUsd: number
}

/**
 * Compute baseline sell pressure per month
 * Sell_m = NewlyUnlockedUSD_m * ClaimRate * SellRate
 */
export function computeBaselineSellPressure(
  claimRate = baselineClaimRate,
  sellRate = baselineSellRate
): MonthlySellPressure[] {
  const unlockSchedule = computeMonthlyUnlockSchedule()
  const sellPressure: MonthlySellPressure[] = []

  for (let i = 0; i < unlockSchedule.length; i++) {
    const current = unlockSchedule[i]
    const previous = i > 0 ? unlockSchedule[i - 1] : { unlockedTokens: 0, unlockedUsd: 0 }

    const newlyUnlockedTokens = current.unlockedTokens - previous.unlockedTokens
    const newlyUnlockedUsd = current.unlockedUsd - previous.unlockedUsd
    const sellPressureUsd = newlyUnlockedUsd * claimRate * sellRate

    sellPressure.push({
      month: current.month,
      newlyUnlockedTokens,
      newlyUnlockedUsd,
      sellPressureUsd,
    })
  }

  return sellPressure
}

/**
 * Compute wallet-specific vesting schedule
 */
export function computeWalletVestingSchedule(
  totalTokens: number,
  tierId: string
): { month: number; tokens: number; usd: number; cumulative: number }[] {
  const vesting = getVestingForTier(tierId)
  const schedule: { month: number; tokens: number; usd: number; cumulative: number }[] = []

  let cumulative = 0

  for (let month = 0; month <= 12; month++) {
    let unlockedFraction = vesting.tge

    if (month > 0 && vesting.linearMonths > 0) {
      const monthsVested = Math.min(month, vesting.linearMonths)
      unlockedFraction += (monthsVested / vesting.linearMonths) * vesting.linearShare
    }

    const tokens = totalTokens * unlockedFraction
    const monthlyTokens = tokens - cumulative
    cumulative = tokens

    schedule.push({
      month,
      tokens: monthlyTokens,
      usd: monthlyTokens * tokenPriceUsd,
      cumulative,
    })
  }

  return schedule
}

/**
 * Get Month 0 baseline sell pressure (for landing page stat)
 */
export function getMonth0SellPressure(): number {
  const sellPressure = computeBaselineSellPressure()
  return sellPressure[0]?.sellPressureUsd || 0
}
