'use client'

import { useState } from 'react'

const hints = [
  'try typing the project name...',
  'there are 11 secrets hidden here',
  'developers have their own mode',
  'gm means more than hello',
  'the matrix has you',
  'some pages are unlisted',
  'cats fly if you ask nicely',
  'parties happen when you rave',
  'reality can glitch',
  'pumps bring confetti',
  'we are all gonna make it',
]

export function Footer() {
  const [hintIndex, setHintIndex] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const cycleHint = () => {
    setShowHint(true)
    setHintIndex((prev) => (prev + 1) % hints.length)
  }

  return (
    <footer className="border-t-2 border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <p className="text-center font-terminal text-sm text-zinc-600 tracking-wide">
          <span className="text-zinc-500">{'// '}</span>
          not affiliated. just obsessed.
          <span className="text-zinc-500">{' //'}</span>
        </p>
        <p className="text-center font-marker text-xs text-zinc-700 mt-2 rotate-slight-ccw">
          built in the trenches
        </p>

        {/* Twitter link */}
        <div className="mt-4 flex justify-center">
          <a
            href="https://x.com/DropTek_fun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-lime-400 transition-colors"
            title="Follow @DropTek_fun"
          >
            <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        {/* Secret hint system */}
        <div className="mt-4 text-center">
          <button
            onClick={cycleHint}
            className="font-terminal text-xs text-zinc-800 hover:text-zinc-600 transition-colors"
            title="click for hints"
          >
            [?]
          </button>
          {showHint && (
            <p className="font-terminal text-xs text-zinc-700 mt-1 animate-pulse">
              hint: {hints[hintIndex]}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
