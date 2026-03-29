'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { computeBaselineSellPressure } from '@/lib/math'
import { formatUsd } from '@/lib/format'

export function SellPressureChart() {
  const data = computeBaselineSellPressure().map((item) => ({
    month: `M${item.month}`,
    pressure: item.sellPressureUsd,
  }))

  return (
    <div className="window-card">
      {/* Title bar */}
      <div className="window-titlebar">
        <span className="window-titlebar-text">sell_pressure.exe</span>
        <div className="flex gap-1">
          <button className="window-btn" />
          <button className="window-btn" />
          <button className="window-btn" />
        </div>
      </div>

      {/* Chart content */}
      <div className="p-4 bg-black/30">
        <p className="font-terminal text-xs text-zinc-500 mb-4">
          // monthly baseline (50% claim, 25% sell)
        </p>
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis
                dataKey="month"
                stroke="#52525b"
                tick={{ fill: '#ec4899', fontSize: 11, fontFamily: 'VT323' }}
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
                labelStyle={{ color: '#ec4899' }}
                formatter={(value: number) => [formatUsd(value), 'SELL PRESSURE']}
              />
              <Bar
                dataKey="pressure"
                fill="#ec4899"
                radius={[0, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
