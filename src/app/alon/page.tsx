'use client'

import { useState, useEffect } from 'react'
import { Terminal, Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components'

const secretMessages = [
  "you found it.",
  "the trenches remember.",
  "wagmi, but also wagmba (we're all gonna make breakfast after).",
  "the math doesn't lie. the vibes don't either.",
  "built different. shipped different.",
  "not affiliated. just obsessed. you already knew that.",
  "if you're reading this, you're early.",
  "Alon, if this is you... gm.",
  "15% for the culture.",
  "the spreadsheet is sacred.",
]

const asciiArt = `
    ____  ____  ____  ____  ______ ______ __ __
   / __ \\/ __ \\/ __ \\/ __ \\/_  __// ____// //_/
  / / / / /_/ / / / / /_/ / / /  / __/  / ,<
 / /_/ / _, _/ /_/ / ____/ / /  / /___ / /| |
/_____/_/ |_|\\____/_/     /_/  /_____//_/ |_|

`

export default function AlonPage() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [message, setMessage] = useState('')
  const [showAscii, setShowAscii] = useState(false)
  const [glitchText, setGlitchText] = useState(false)

  useEffect(() => {
    // Fake visitor count (persistent in session)
    const stored = sessionStorage.getItem('alon_visits')
    const visits = stored ? parseInt(stored) + 1 : Math.floor(Math.random() * 50) + 7
    sessionStorage.setItem('alon_visits', visits.toString())
    setVisitorCount(visits)

    // Random message
    setMessage(secretMessages[Math.floor(Math.random() * secretMessages.length)])

    // Delayed reveal
    setTimeout(() => setShowAscii(true), 500)
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Background grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(163, 230, 53, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163, 230, 53, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 border-2 border-pink-500 flex items-center justify-center animate-pulse">
                <Eye size={24} className="text-pink-500" />
              </div>
            </div>

            <h1
              className={`font-terminal text-4xl sm:text-5xl text-white tracking-wide mb-4 cursor-pointer ${glitchText ? 'glitch-effect' : ''}`}
              onClick={() => setGlitchText(!glitchText)}
            >
              /ALON
            </h1>

            <p className="font-marker text-pink-400 text-xl rotate-slight-ccw">
              you weren&apos;t supposed to find this
            </p>
          </div>

          {/* ASCII Art */}
          {showAscii && (
            <div className="window-card mb-8">
              <div className="window-titlebar">
                <span className="window-titlebar-text">secret.exe</span>
                <div className="flex gap-1">
                  <button className="window-btn" />
                  <button className="window-btn" />
                  <button className="window-btn" />
                </div>
              </div>
              <div className="p-4 bg-black/50 overflow-x-auto">
                <pre className="font-terminal text-lime-400 text-xs sm:text-sm whitespace-pre">
                  {asciiArt}
                </pre>
              </div>
            </div>
          )}

          {/* Secret Message */}
          <div className="sticker-card-pink p-6 mb-8 rotate-slight-cw">
            <p className="font-terminal text-zinc-500 text-xs mb-2">
              {'>'} MESSAGE_OF_THE_DAY:
            </p>
            <p className="font-marker text-xl text-pink-400">
              &quot;{message}&quot;
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <div className="sticker-card p-4 text-center">
              <p className="font-terminal text-xs text-zinc-500">VISITOR_COUNT</p>
              <p className="font-terminal text-2xl text-lime-400 mt-1">{visitorCount}</p>
              <p className="font-marker text-xs text-zinc-600 mt-1">degens found this</p>
            </div>
            <div className="sticker-card p-4 text-center rotate-slight-ccw">
              <p className="font-terminal text-xs text-zinc-500">SECRET_LEVEL</p>
              <p className="font-terminal text-2xl text-pink-400 mt-1">MAXIMUM</p>
              <p className="font-marker text-xs text-zinc-600 mt-1">you&apos;re based</p>
            </div>
            <div className="sticker-card p-4 text-center">
              <p className="font-terminal text-xs text-zinc-500">ALON_STATUS</p>
              <p className="font-terminal text-2xl text-lime-400 mt-1 animate-pulse">WATCHING</p>
              <p className="font-marker text-xs text-zinc-600 mt-1">probably</p>
            </div>
          </div>

          {/* Terminal Log */}
          <div className="terminal-block mb-8">
            <p className="text-zinc-500">// SYSTEM LOG</p>
            <p className="mt-2"><span className="text-pink-400">$</span> whoami</p>
            <p className="text-lime-400">{'>'} degen_explorer</p>
            <p className="mt-2"><span className="text-pink-400">$</span> cat secret_note.txt</p>
            <p className="text-lime-400">{'>'} Hey Alon,</p>
            <p className="text-lime-400">{'>'} If you&apos;re seeing this, the blueprint is ready.</p>
            <p className="text-lime-400">{'>'} We built it because the community deserves clarity.</p>
            <p className="text-lime-400">{'>'} Linear by volume. Tiered vesting. Stress-tested.</p>
            <p className="text-lime-400">{'>'} The math is sound. The vibes are immaculate.</p>
            <p className="text-lime-400">{'>'} </p>
            <p className="text-lime-400">{'>'} LFG.</p>
            <p className="text-lime-400">{'>'} - the trenches</p>
            <p className="mt-2"><span className="text-pink-400">$</span> _</p>
          </div>

          {/* Easter Eggs Cheat Sheet */}
          <div className="window-card mb-8">
            <div className="window-titlebar">
              <span className="window-titlebar-text">easter_eggs.txt</span>
              <div className="flex gap-1">
                <button className="window-btn" />
                <button className="window-btn" />
                <button className="window-btn" />
              </div>
            </div>
            <div className="p-4 bg-black/50 font-terminal text-xs">
              <p className="text-zinc-500 mb-3">// TYPE THESE ANYWHERE ON THE SITE:</p>
              <div className="grid grid-cols-2 gap-2 text-zinc-400">
                <p><span className="text-lime-400">droptek</span> → Alon notices</p>
                <p><span className="text-lime-400">matrix</span> → enter the matrix</p>
                <p><span className="text-lime-400">glitch</span> → corrupt reality</p>
                <p><span className="text-lime-400">pump</span> → make it rain</p>
                <p><span className="text-lime-400">wagmi</span> → we all make it</p>
                <p><span className="text-lime-400">rave</span> → party mode</p>
                <p><span className="text-lime-400">nyan</span> → internet nostalgia</p>
                <p><span className="text-lime-400">gm</span> → good morning</p>
                <p><span className="text-lime-400">gn</span> → good night</p>
                <p><span className="text-lime-400">dev</span> → secret terminal</p>
              </div>
              <p className="text-zinc-500 mt-3">// 11 secrets total</p>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Button href="/" variant="secondary">
              <ArrowLeft size={16} />
              BACK TO REALITY
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-center mt-8 font-marker text-zinc-600 text-sm">
            click the title to glitch it. you know you want to.
          </p>
        </div>
      </div>
    </div>
  )
}
