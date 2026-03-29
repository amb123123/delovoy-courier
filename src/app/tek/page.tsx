'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Terminal, FileText, BookOpen } from 'lucide-react'
import {
  Section,
  FormulaBlock,
  TierTable,
  VestingTable,
  DownloadsStrip,
  UnlockChart,
  SellPressureChart,
} from '@/components'
import {
  eligibleWalletsTotal,
  poolTokens,
  airdropPercent,
  baselineClaimRate,
  baselineSellRate,
} from '@/lib/constants'
import { formatNumber, formatPercent, formatTokens } from '@/lib/format'

const navSections = [
  { id: 'scope', label: 'SCOPE', icon: BookOpen },
  { id: 'data', label: 'DATA', icon: Terminal },
  { id: 'formula', label: 'FORMULA', icon: FileText },
  { id: 'tiers', label: 'TIERS', icon: Terminal },
  { id: 'vesting', label: 'VESTING', icon: FileText },
  { id: 'stress', label: 'STRESS', icon: AlertTriangle },
  { id: 'impl', label: 'IMPL', icon: Terminal },
]

export default function TekPage() {
  const [activeSection, setActiveSection] = useState('scope')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120

      for (const section of navSections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative">
      {/* Header */}
      <section className="border-b-2 border-zinc-800 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 border-2 border-lime-400 flex items-center justify-center">
              <Terminal size={16} className="text-lime-400" />
            </div>
            <span className="font-terminal text-zinc-500 text-sm">FIELD_MANUAL_v0.1</span>
          </div>
          <h1 className="font-terminal text-3xl sm:text-4xl text-white tracking-wide">
            DROP<span className="text-lime-400">TEK</span> BLUEPRINT
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            A technical spec for a linear-by-volume airdrop with tiered vesting.
            Community proposal. Read the whole thing or jump to what you need.
          </p>
          <p className="mt-4 font-marker text-zinc-600 text-sm rotate-slight-ccw">
            for Alon and the team
          </p>
        </div>
      </section>

      {/* Sticky TOC */}
      <nav className="sticky top-14 z-40 border-b-2 border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`shrink-0 px-3 py-1.5 font-terminal text-xs tracking-wider border transition-colors ${
                  activeSection === section.id
                    ? 'bg-lime-400/20 text-lime-400 border-lime-400/50'
                    : 'text-zinc-500 border-zinc-700 hover:text-lime-400 hover:border-lime-400/30'
                }`}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative">
        {/* Scope */}
        <section id="scope" className="py-12 border-b border-zinc-800">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-terminal text-xl text-lime-400 tracking-wider mb-6">
              {'>'} SCOPE
            </h2>

            <div className="window-card max-w-3xl">
              <div className="window-titlebar">
                <span className="window-titlebar-text">scope.txt</span>
                <div className="flex gap-1">
                  <button className="window-btn" />
                  <button className="window-btn" />
                  <button className="window-btn" />
                </div>
              </div>
              <div className="p-4 bg-black/30 font-terminal text-sm space-y-3">
                <p><span className="text-lime-400">1.</span> <span className="text-zinc-400">ELIGIBLE:</span> {formatNumber(eligibleWalletsTotal)} wallets with $10K+ volume</p>
                <p><span className="text-lime-400">2.</span> <span className="text-zinc-400">POOL:</span> {formatTokens(poolTokens)} tokens ({formatPercent(airdropPercent)} of supply)</p>
                <p><span className="text-lime-400">3.</span> <span className="text-zinc-400">METHOD:</span> Linear by volume (bigger = more)</p>
                <p><span className="text-lime-400">4.</span> <span className="text-zinc-400">VESTING:</span> 0-12 months depending on tier</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Model */}
        <section id="data" className="py-12 border-b border-zinc-800">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-terminal text-xl text-lime-400 tracking-wider mb-6">
              {'>'} DATA_MODEL
            </h2>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="sticker-card p-4">
                <h3 className="font-terminal text-lime-400 text-sm mb-3">DATA_SOURCE</h3>
                <p className="text-zinc-400 text-sm">
                  Wallet-level lifetime trading volume from Pump.fun on-chain data,
                  aggregated via Dune Analytics. We use geometric mean of tier
                  boundaries as midpoint estimates.
                </p>
              </div>

              <div className="sticker-card-lime p-4">
                <h3 className="font-terminal text-lime-400 text-sm mb-3">VOLUME_PROXY (ΣV)</h3>
                <p className="text-zinc-400 text-sm mb-3">
                  Total volume proxy = sum of (wallets × midpointUsd) across all tiers.
                  This is an approximation until full Dune query available.
                </p>
                <code className="terminal-block text-xs block">
                  ΣV_proxy = Σ(wallets_tier × midpoint_tier)
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Allocation Formula */}
        <section id="formula" className="py-12 border-b border-zinc-800">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-terminal text-xl text-lime-400 tracking-wider mb-6">
              {'>'} ALLOCATION_FORMULA
            </h2>

            <div className="space-y-6 max-w-3xl">
              <FormulaBlock
                title="individual_allocation.exe"
                formula="Ai = P × Vi / ΣV"
                description="P = pool tokens, Vi = wallet volume, ΣV = total eligible volume"
              />
              <FormulaBlock
                title="sell_pressure_estimate.exe"
                formula="Sell_m = UnlockedUSD_m × ClaimRate × SellRate"
                description={`Baseline: ClaimRate = ${formatPercent(baselineClaimRate)}, SellRate = ${formatPercent(baselineSellRate)}`}
              />
            </div>
          </div>
        </section>

        {/* Tier Distribution */}
        <section id="tiers" className="py-12 border-b border-zinc-800">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-terminal text-xl text-lime-400 tracking-wider mb-6">
              {'>'} TIER_DISTRIBUTION
            </h2>
            <p className="font-terminal text-zinc-500 text-sm mb-6">
              // volume brackets and allocation stats
            </p>
            <TierTable />
          </div>
        </section>

        {/* Vesting Schedule */}
        <section id="vesting" className="py-12 border-b border-zinc-800">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-terminal text-xl text-lime-400 tracking-wider mb-6">
              {'>'} VESTING_SCHEDULE
            </h2>
            <p className="font-terminal text-zinc-500 text-sm mb-6">
              // unlock timing by tier
            </p>
            <div className="space-y-8">
              <VestingTable />
              <UnlockChart />
            </div>
          </div>
        </section>

        {/* Stress Test */}
        <section id="stress" className="py-12 border-b border-zinc-800">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-terminal text-xl text-pink-400 tracking-wider mb-6">
              {'>'} STRESS_TEST
            </h2>

            {/* Warning box */}
            <div className="sticker-card-pink p-4 mb-8 max-w-2xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-terminal text-pink-400 text-sm mb-2">ASSUMPTIONS</h3>
                  <ul className="text-zinc-400 text-sm space-y-1 font-terminal">
                    <li>• Claim rate: {formatPercent(baselineClaimRate)} of eligible wallets</li>
                    <li>• Sell rate: {formatPercent(baselineSellRate)} of claimed tokens</li>
                    <li>• Timing: distributed across unlock months</li>
                  </ul>
                </div>
              </div>
            </div>

            <SellPressureChart />
          </div>
        </section>

        {/* Implementation Notes */}
        <section id="impl" className="py-12 border-b border-zinc-800">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-terminal text-xl text-lime-400 tracking-wider mb-6">
              {'>'} IMPLEMENTATION_NOTES
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="sticker-card p-4">
                <h3 className="font-terminal text-lime-400 text-sm mb-3">MERKLE_DIST</h3>
                <p className="text-zinc-400 text-sm">
                  Use Merkle tree for efficient on-chain verification.
                  Each wallet claims with a proof.
                </p>
              </div>

              <div className="sticker-card p-4 rotate-slight-cw">
                <h3 className="font-terminal text-lime-400 text-sm mb-3">VESTING_CONTRACT</h3>
                <p className="text-zinc-400 text-sm">
                  Track each wallet&apos;s tier. Compute unlockable amounts
                  based on time elapsed since TGE.
                </p>
              </div>

              <div className="sticker-card p-4 rotate-slight-ccw">
                <h3 className="font-terminal text-lime-400 text-sm mb-3">SNAPSHOT_TIMING</h3>
                <p className="text-zinc-400 text-sm">
                  Take snapshot at specific block height.
                  Announce methodology first, then the block.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Downloads */}
        <Section>
          <div className="text-center">
            <p className="font-terminal text-zinc-500 text-sm mb-4">
              {'>'} it is nerdy but worky
            </p>
            <DownloadsStrip />
          </div>
        </Section>
      </div>
    </div>
  )
}
