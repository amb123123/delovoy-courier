'use client'

import { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'

interface FormulaBlockProps {
  title: string
  formula: string
  description?: string
}

export function FormulaBlock({ title, formula, description }: FormulaBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formula)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="window-card">
      {/* Title bar */}
      <div className="window-titlebar">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-lime-400" />
          <span className="window-titlebar-text">{title}</span>
        </div>
        <div className="flex gap-1">
          <button className="window-btn" />
          <button className="window-btn" />
          <button className="window-btn" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-black/30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <code className="terminal-block block text-base sm:text-lg">
              <span className="text-zinc-500">{'> '}</span>
              {formula}
            </code>
            {description && (
              <p className="mt-3 text-xs text-zinc-500 font-terminal">
                // {description}
              </p>
            )}
          </div>
          <button
            onClick={copyToClipboard}
            className="shrink-0 p-2 text-zinc-500 hover:text-lime-400 border border-zinc-700 hover:border-lime-400/50 transition-colors"
            title="Copy formula"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
