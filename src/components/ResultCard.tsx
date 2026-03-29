'use client'

import { Copy, Check, Twitter, Megaphone } from 'lucide-react'
import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { shortenAddress, formatTokens, formatUsd } from '@/lib/format'
import { tokenPriceUsd, tiers, siteConfig } from '@/lib/constants'
import { Button } from './Button'

interface VestingEntry {
  month: number
  unlockedTokens: number
  unlockedUsd: number
}

interface ResultCardProps {
  address: string
  volumeUsd: number
  tierId: string
  tokens: number
  vesting: VestingEntry[]
}

function ResultVestingChart({ vesting }: { vesting: VestingEntry[] }) {
  const data = vesting.map((item) => ({
    month: `M${item.month}`,
    tokens: item.unlockedTokens,
    usd: item.unlockedUsd,
  }))

  return (
    <div className="window-card">
      <div className="window-titlebar">
        <span className="window-titlebar-text">your_vesting.exe</span>
        <div className="flex gap-1">
          <button className="window-btn" />
          <button className="window-btn" />
          <button className="window-btn" />
        </div>
      </div>
      <div className="p-4 bg-black/30">
        <p className="font-terminal text-xs text-zinc-500 mb-4">
          // cumulative tokens unlocked
        </p>
        <div className="h-48 sm:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="resultVestingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis
                dataKey="month"
                stroke="#52525b"
                tick={{ fill: '#22d3ee', fontSize: 11, fontFamily: 'VT323' }}
              />
              <YAxis
                stroke="#52525b"
                tick={{ fill: '#71717a', fontSize: 11, fontFamily: 'VT323' }}
                tickFormatter={(value) => value != null ? formatTokens(value) : '0'}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '2px solid #3f3f46',
                  borderRadius: '0',
                  fontFamily: 'VT323',
                }}
                labelStyle={{ color: '#22d3ee' }}
                content={({ active, payload, label }) => {
                  if (!active || !payload || !payload.length) return null
                  const tokens = payload[0]?.payload?.tokens
                  const usd = payload[0]?.payload?.usd
                  return (
                    <div style={{
                      backgroundColor: '#18181b',
                      border: '2px solid #3f3f46',
                      padding: '8px 12px',
                      fontFamily: 'VT323',
                    }}>
                      <p style={{ color: '#22d3ee', marginBottom: 4 }}>{label}</p>
                      <p style={{ color: '#a3e635' }}>{formatTokens(tokens)} tokens</p>
                      <p style={{ color: '#f472b6' }}>≈ {formatUsd(usd)}</p>
                    </div>
                  )
                }}
              />
              <Area
                type="stepAfter"
                dataKey="tokens"
                stroke="#22d3ee"
                strokeWidth={2}
                fill="url(#resultVestingGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export function ResultCard({
  address,
  volumeUsd,
  tierId,
  tokens,
  vesting,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false)
  const usdValue = tokens * tokenPriceUsd
  const tier = tiers.find((t) => t.id === tierId)

  const calcUrl = `https://${siteConfig.domain}/calc`
  const tweetText = `Hey @a1lon9

DropTEK says my PumpFun + PumpSwap volume is ${formatUsd(volumeUsd)} → estimated airdrop ${formatTokens(tokens)} $PUMP (~${formatUsd(usdValue)}) with vesting.`

  const summary = `DropTEK Report
================
Wallet: ${shortenAddress(address, 6)}
Volume: ${formatUsd(volumeUsd)}
Tier: ${tierId} (${tier?.label || ''})
Tokens: ${formatTokens(tokens)}
Value: ${formatUsd(usdValue)}

Check yours: ${calcUrl}`

  const copyResults = () => {
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`

  return (
    <div className="space-y-6">
      {/* Main report card */}
      <div className="window-card">
        <div className="window-titlebar">
          <span className="window-titlebar-text">allocation_report.txt</span>
          <div className="flex gap-1">
            <button className="window-btn" />
            <button className="window-btn" />
            <button className="window-btn" />
          </div>
        </div>

        <div className="p-4 bg-black/30 font-terminal">
          <p className="text-zinc-500 text-sm mb-4">// DROPTEK ALLOCATION REPORT</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-zinc-700 p-3">
              <p className="text-xs text-zinc-500">WALLET</p>
              <p className="text-lime-400 text-sm mt-1">{shortenAddress(address, 6)}</p>
            </div>
            <div className="border border-zinc-700 p-3">
              <p className="text-xs text-zinc-500">TOTAL_VOLUME</p>
              <p className="text-lime-400 text-lg mt-1">{formatUsd(volumeUsd)}</p>
            </div>
            <div className="border border-zinc-700 p-3">
              <p className="text-xs text-zinc-500">TIER</p>
              <p className="mt-1">
                <span className="text-pink-400 text-xl">{tierId}</span>
                <span className="text-zinc-500 text-sm ml-2">{tier?.label}</span>
              </p>
            </div>
            <div className="border border-zinc-700 p-3">
              <p className="text-xs text-zinc-500">TOKENS</p>
              <p className="text-lime-400 text-lg mt-1">{formatTokens(tokens)}</p>
              <p className="text-zinc-500 text-xs mt-1">≈ {formatUsd(usdValue)}</p>
            </div>
          </div>

          {/* Value highlight */}
          <div className="mt-4 border-2 border-lime-400/50 bg-lime-400/10 p-4">
            <p className="text-xs text-lime-400/70">ESTIMATED_VALUE</p>
            <p className="text-lime-400 text-3xl mt-1">{formatUsd(usdValue)}</p>
            <p className="text-zinc-500 text-xs mt-1">// @ ${tokenPriceUsd}/token</p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="degen" href={tweetUrl} external>
              <Megaphone size={16} />
              BROADCAST TO CT
            </Button>
            <Button variant="secondary" onClick={copyResults}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'COPIED' : 'COPY'}
            </Button>
          </div>
        </div>
      </div>

      {/* Vesting chart */}
      <ResultVestingChart vesting={vesting} />
    </div>
  )
}
