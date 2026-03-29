// Token Economics
export const tokenPriceUsd = 0.002613
export const totalSupply = 1_000_000_000_000
export const airdropPercent = 0.15
export const poolTokens = totalSupply * airdropPercent // 150B tokens
export const eligibleWalletsTotal = 928_297

// Tier data (non-overlapping)
export interface TierData {
  id: string
  label: string
  wallets: number
  midpointUsd: number
}

export const tiers: TierData[] = [
  { id: 'A', label: '$10K–$100K', wallets: 756_141, midpointUsd: 31_623 },
  { id: 'B', label: '$100K–$1M', wallets: 159_350, midpointUsd: 316_228 },
  { id: 'C', label: '$1M–$10M', wallets: 12_367, midpointUsd: 3_162_278 },
  { id: 'D', label: '$10M–$100M', wallets: 435, midpointUsd: 31_622_777 },
  { id: 'E', label: '$100M+', wallets: 4, midpointUsd: 150_000_000 },
]

// Vesting schedule per tier (must sum to 100% each tier)
export interface VestingData {
  tierId: string
  tge: number // TGE unlock fraction
  linearMonths: number // months over which linear vesting occurs
  linearShare: number // fraction unlocked via linear vesting
}

export const vestingSchedule: VestingData[] = [
  { tierId: 'A', tge: 1.0, linearMonths: 0, linearShare: 0.0 },
  { tierId: 'B', tge: 0.5, linearMonths: 1, linearShare: 0.5 },
  { tierId: 'C', tge: 0.2, linearMonths: 3, linearShare: 0.8 },
  { tierId: 'D', tge: 0.1, linearMonths: 6, linearShare: 0.9 },
  { tierId: 'E', tge: 0.05, linearMonths: 12, linearShare: 0.95 },
]

// Baseline assumptions for sell pressure model
export const baselineClaimRate = 0.5 // 50% claim their airdrop
export const baselineSellRate = 0.25 // 25% of claimed tokens sold

// External links (placeholder URLs)
export const externalLinks = {
  duneSource: 'https://dune.com/queries/5239138/8610835',
  excelModel: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdu5_xWQiAja5ibypNI1GdTB4k25A_hTTUVFtdk0MhVGg2vvxippeyCL7wnybeRKKiX2L_KcwR0Jkn/pubhtml',
  memoDoc: 'https://docs.google.com/document/d/e/2PACX-1vSzNWm12ZGFKk4kgVxqQTxitHvWKfVPwT28CNtBpfNJ0rMDWpO-Gp3Jw_iGZQqr-cjeZg5jlC1rmTMi/pub',
}

// API configuration
export const apiConfig = {
  duneApiKeyEnvVar: 'DUNE_API_KEY',
  duneQueryIdEnvVar: 'DUNE_QUERY_ID',
}

// Site configuration (change this to your actual domain)
export const siteConfig = {
  domain: 'droptek.link',
  twitterHandle: 'droptek',
}
