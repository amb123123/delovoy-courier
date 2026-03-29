'use client'

import { vestingSchedule, tiers } from '@/lib/constants'

export function VestingTable() {
  const data = vestingSchedule.map((v) => {
    const tier = tiers.find((t) => t.id === v.tierId)
    return {
      ...v,
      label: tier?.label || v.tierId,
    }
  })

  return (
    <div className="overflow-x-auto">
      <table className="degen-table min-w-[500px]">
        <thead>
          <tr>
            <th>Tier</th>
            <th>Volume Range</th>
            <th>TGE Unlock</th>
            <th>Linear Months</th>
            <th>Linear Share</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.tierId}>
              <td className="font-terminal text-lime-400 text-lg">
                {row.tierId}
              </td>
              <td className="font-terminal text-sm">
                {row.label}
              </td>
              <td className="font-terminal text-pink-400">
                {(row.tge * 100).toFixed(0)}%
              </td>
              <td className="font-terminal">
                {row.linearMonths}
              </td>
              <td className="font-terminal">
                {(row.linearShare * 100).toFixed(0)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
