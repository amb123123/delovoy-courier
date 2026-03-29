/**
 * Format a number with commas
 */
export function formatNumber(value: number | null | undefined, decimals = 0): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '0'
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Format a number as USD currency
 */
export function formatUsd(value: number | null | undefined, decimals = 2): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '$0.00'
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`
  }
  return `$${value.toFixed(decimals)}`
}

/**
 * Format a number as USD with full precision for smaller amounts
 */
export function formatUsdFull(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '$0.00'
  }
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

/**
 * Format token amounts with appropriate suffixes
 */
export function formatTokens(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '0'
  }
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)}T`
  }
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`
  }
  return value.toFixed(2)
}

/**
 * Format token amounts with full precision
 */
export function formatTokensFull(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '0'
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

/**
 * Shorten a Solana address for display
 */
export function shortenAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 3) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

/**
 * Format percentage
 */
export function formatPercent(value: number | null | undefined, decimals = 1): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '0%'
  }
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Format large numbers compactly
 */
export function formatCompact(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '0'
  }
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`
  }
  return value.toString()
}

/**
 * Validate Solana address format (basic validation)
 * Base58 characters, length 32-44
 */
export function isValidSolanaAddress(address: string): boolean {
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
  return base58Regex.test(address)
}
