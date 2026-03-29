'use client'

import { computeTierAveragesModelB } from '@/lib/math'
import { formatNumber, formatTokens, formatUsd } from '@/lib/format'

export function TierTable() {
  const tiers = computeTierAveragesModelB()

  return (
    <div className="overflow-x-auto">
      <table className="degen-table min-w-[600px]">
        <thead>
          <tr>
            <th>Tier</th>
            <th>Volume Range</th>
            <th>Wallets</th>
            <th>Pool Share</th>
            <th>Avg Tokens</th>
            <th>Avg USD</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier.tierId}>
              <td className="font-terminal text-lime-400 text-lg">
                {tier.tierId}
              </td>
              <td className="font-terminal text-sm">
                {tier.label}
              </td>
              <td className="font-terminal">
                {formatNumber(tier.wallets)}
              </td>
              <td className="font-terminal">
                {(tier.share * 100).toFixed(2)}%
              </td>
              <td className="font-terminal">
                {formatTokens(tier.avgTokensPerWallet)}
              </td>
              <td className="font-terminal text-lime-400">
                {formatUsd(tier.avgUsdPerWallet)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
