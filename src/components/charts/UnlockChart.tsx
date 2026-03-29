'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { computeMonthlyUnlockSchedule } from '@/lib/math'
import { formatUsd } from '@/lib/format'

export function UnlockChart() {
  const data = computeMonthlyUnlockSchedule().map((item) => ({
    month: `M${item.month}`,
    unlocked: item.unlockedUsd,
  }))

  return (
    <div className="window-card">
      {/* Title bar */}
      <div className="window-titlebar">
        <span className="window-titlebar-text">unlock_curve.exe</span>
        <div className="flex gap-1">
          <button className="window-btn" />
          <button className="window-btn" />
          <button className="window-btn" />
        </div>
      </div>

      {/* Chart content */}
      <div className="p-4 bg-black/30">
        <p className="font-terminal text-xs text-zinc-500 mb-4">
          // cumulative unlocked USD (months 0-12)
        </p>
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="unlockGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a3e635" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis
                dataKey="month"
                stroke="#52525b"
                tick={{ fill: '#a3e635', fontSize: 11, fontFamily: 'VT323' }}
              />
              <YAxis
                stroke="#52525b"
                tick={{ fill: '#71717a', fontSize: 11, fontFamily: 'VT323' }}
                tickFormatter={(value) => formatUsd(value)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '2px solid #3f3f46',
                  borderRadius: '0',
                  fontFamily: 'VT323',
                }}
                labelStyle={{ color: '#a3e635' }}
                formatter={(value: number) => [formatUsd(value), 'UNLOCKED']}
              />
              <Area
                type="monotone"
                dataKey="unlocked"
                stroke="#a3e635"
                strokeWidth={2}
                fill="url(#unlockGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
