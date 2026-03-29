'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// ============================================================================
// MATRIX RAIN EFFECT
// ============================================================================
function MatrixRain({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = 'DROPTEK$PUMP01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const charArray = chars.split('')
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = Array(Math.floor(columns)).fill(1)

    let frameCount = 0
    const maxFrames = 180

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#a3e635'
      ctx.font = `${fontSize}px VT323`

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        ctx.fillStyle = Math.random() > 0.9 ? '#ec4899' : '#a3e635'
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      frameCount++
      if (frameCount < maxFrames) {
        requestAnimationFrame(draw)
      } else {
        onComplete()
      }
    }

    const animationId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animationId)
  }, [onComplete])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[10000] pointer-events-none"
      style={{ background: 'rgba(0,0,0,0.9)' }}
    />
  )
}

// ============================================================================
// CONFETTI / TOKEN RAIN
// ============================================================================
function TokenConfetti({ onComplete }: { onComplete: () => void }) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    rotation: number
    scale: number
    speedY: number
    speedX: number
    type: 'pump' | 'coin' | 'rocket' | 'moon' | 'diamond'
  }>>([])

  useEffect(() => {
    const types = ['pump', 'coin', 'rocket', 'moon', 'diamond'] as const
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 30,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.7,
      speedY: 1.5 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 2,
      type: types[Math.floor(Math.random() * types.length)],
    }))
    setParticles(newParticles)

    const timer = setTimeout(onComplete, 4000)
    return () => clearTimeout(timer)
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: p.y + p.speedY,
        x: p.x + p.speedX,
        rotation: p.rotation + 3,
      })))
    }, 40)
    return () => clearInterval(interval)
  }, [])

  const getEmoji = (type: string) => {
    switch (type) {
      case 'pump': return '$PUMP'
      case 'coin': return '🪙'
      case 'rocket': return '🚀'
      case 'moon': return '🌙'
      case 'diamond': return '💎'
      default: return '💰'
    }
  }

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute font-terminal text-lime-400 font-bold"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
            fontSize: p.type === 'pump' ? '14px' : '24px',
            textShadow: '0 0 10px rgba(163, 230, 53, 0.5)',
          }}
        >
          {getEmoji(p.type)}
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// SCREEN SHAKE + WAGMI
// ============================================================================
function ScreenShake({ onComplete }: { onComplete: () => void }) {
  const [showWagmi, setShowWagmi] = useState(false)

  useEffect(() => {
    document.body.classList.add('shake-effect')

    const wagmiTimer = setTimeout(() => setShowWagmi(true), 200)
    const endTimer = setTimeout(() => {
      document.body.classList.remove('shake-effect')
      onComplete()
    }, 2000)

    return () => {
      clearTimeout(wagmiTimer)
      clearTimeout(endTimer)
      document.body.classList.remove('shake-effect')
    }
  }, [onComplete])

  return showWagmi ? (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
      <div className="animate-pulse">
        <span className="font-terminal text-6xl sm:text-8xl text-lime-400 wagmi-flash">
          WAGMI
        </span>
      </div>
    </div>
  ) : null
}

// ============================================================================
// NYAN CAT (NEW!)
// ============================================================================
function NyanCat({ onComplete }: { onComplete: () => void }) {
  const [position, setPosition] = useState(-20)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev > 120) {
          setDone(true)
          return prev
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (done) {
      onComplete()
    }
  }, [done, onComplete])

  const rainbowColors = ['#ff0000', '#ff9900', '#ffff00', '#33ff00', '#0099ff', '#6633ff']

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden bg-black/50">
      {/* Rainbow trail */}
      {rainbowColors.map((color, i) => (
        <div
          key={i}
          className="absolute h-3 transition-all"
          style={{
            left: `${position - 30 - i * 3}%`,
            top: `calc(50% + ${(i - 2.5) * 12}px)`,
            width: '30%',
            backgroundColor: color,
            opacity: 0.8,
          }}
        />
      ))}
      {/* Cat */}
      <div
        className="absolute transition-all"
        style={{
          left: `${position}%`,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <pre className="font-terminal text-xs leading-none" style={{ color: '#ffcc99' }}>
{`  ╱|、
(˚ˎ 。7
 |、˜〵
 じしˍ,)ノ`}
        </pre>
        <p className="font-terminal text-pink-400 text-xs mt-1 animate-pulse">nyan~</p>
      </div>
    </div>
  )
}

// ============================================================================
// RAVE MODE (NEW!)
// ============================================================================
function RaveMode({ onComplete }: { onComplete: () => void }) {
  const [hue, setHue] = useState(0)

  useEffect(() => {
    document.body.style.transition = 'filter 0.1s'

    const interval = setInterval(() => {
      setHue(prev => (prev + 30) % 360)
    }, 100)

    const timer = setTimeout(() => {
      clearInterval(interval)
      document.body.style.filter = ''
      document.body.style.transition = ''
      onComplete()
    }, 4000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      document.body.style.filter = ''
      document.body.style.transition = ''
    }
  }, [onComplete])

  useEffect(() => {
    document.body.style.filter = `hue-rotate(${hue}deg) saturate(1.5)`
  }, [hue])

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center">
      <div className="text-center">
        <p className="font-terminal text-6xl sm:text-8xl text-white animate-bounce" style={{ textShadow: '0 0 20px currentColor' }}>
          🎉 RAVE 🎉
        </p>
        <p className="font-marker text-2xl text-white mt-4 animate-pulse">
          vibes only
        </p>
      </div>
    </div>
  )
}


// ============================================================================
// GM/GN EFFECT (NEW!)
// ============================================================================
function GmGnEffect({ type, onComplete }: { type: 'gm' | 'gn'; onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  const isGm = type === 'gm'

  return (
    <div className={`fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center ${isGm ? 'bg-gradient-to-b from-orange-500/20 to-yellow-500/20' : 'bg-gradient-to-b from-indigo-900/40 to-purple-900/40'}`}>
      <div className="text-center">
        <p className="text-8xl sm:text-9xl mb-4">
          {isGm ? '☀️' : '🌙'}
        </p>
        <p className={`font-terminal text-6xl sm:text-8xl ${isGm ? 'text-yellow-400' : 'text-indigo-400'}`}>
          {isGm ? 'GM' : 'GN'}
        </p>
        <p className="font-marker text-xl text-zinc-400 mt-4">
          {isGm ? 'rise and grind' : 'sweet dreams fren'}
        </p>
      </div>
    </div>
  )
}


// ============================================================================
// DEV MODE TERMINAL (FIXED!)
// ============================================================================
function DevModeTerminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [input, setInput] = useState('')
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const bootMessages = [
      '> DROPTEK_DEV_MODE v0.1.337',
      '> ================================',
      `> TIMESTAMP: ${new Date().toISOString()}`,
      '> ELIGIBLE_WALLETS: 928,297',
      '> POOL_TOKENS: 150,000,000,000',
      '> DEGEN_LEVEL: MAXIMUM',
      '> ALON_STATUS: probably noticed',
      '> VIBE_CHECK: passed',
      '> ================================',
      '> type "help" for commands',
      '> type "exit" to close',
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < bootMessages.length) {
        setLines(prev => [...prev, bootMessages[index]])
        index++
      } else {
        clearInterval(interval)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [])

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    setLines(prev => [...prev, `$ ${cmd}`])

    switch (command) {
      case 'help':
        setLines(prev => [...prev,
          '> COMMANDS:',
          '>   help     - show this',
          '>   stats    - show degen stats',
          '>   secrets  - list easter eggs',
          '>   alon     - ???',
          '>   gm       - gm',
          '>   gn       - gn',
          '>   wagmi    - wagmi',
          '>   ngmi     - ngmi',
          '>   wen      - wen moon',
          '>   rugged   - check rug status',
          '>   clear    - clear terminal',
          '>   exit     - close terminal',
        ])
        break
      case 'stats':
        setLines(prev => [...prev,
          '> DEGEN_STATS:',
          '>   vibes: immaculate',
          '>   bags: heavy',
          '>   hands: diamond',
          '>   copium: low',
          '>   hopium: maximum',
          '>   rug_probability: 0.00%',
        ])
        break
      case 'secrets':
        setLines(prev => [...prev,
          '> EASTER_EGGS (11):',
          '>   droptek - Alon notices',
          '>   matrix  - enter the matrix',
          '>   glitch  - corrupt reality',
          '>   pump    - make it rain',
          '>   wagmi   - we all make it',
          '>   rave    - party mode',
          '>   nyan    - internet nostalgia',
          '>   gm / gn - greetings',
          '>   dev     - you are here',
          '>   /alon   - secret page',
        ])
        break
      case 'alon':
        setLines(prev => [...prev, '> 👀', '> he sees you', '> he knows'])
        break
      case 'gm':
        setLines(prev => [...prev, '> ☀️ gm fren, wagmi'])
        break
      case 'gn':
        setLines(prev => [...prev, '> 🌙 gn, sweet dreams'])
        break
      case 'wagmi':
        setLines(prev => [...prev, '> WAGMI 🚀🚀🚀', '> WE ARE ALL GONNA MAKE IT'])
        break
      case 'ngmi':
        setLines(prev => [...prev, '> ngmi...', '> jk wagmi always'])
        break
      case 'wen':
      case 'wen moon':
        setLines(prev => [...prev, '> wen mass adoption?', '> soon™'])
        break
      case 'rugged':
      case 'rug':
        setLines(prev => [...prev, '> checking rug status...', '> STATUS: NOT RUGGED ✓', '> (yet)'])
        break
      case 'exit':
      case 'quit':
      case 'q':
        onClose()
        break
      case 'clear':
      case 'cls':
        setLines([])
        break
      case 'sudo':
        setLines(prev => [...prev, '> nice try anon'])
        break
      case 'hack':
        setLines(prev => [...prev, '> ACCESS DENIED', '> (this is a meme terminal)'])
        break
      case 'moon':
        setLines(prev => [...prev, '> 🌕', '> to the moon!'])
        break
      case 'ls':
        setLines(prev => [...prev, '> bags.json', '> hopium.txt', '> diamond_hands.exe', '> not_financial_advice.md'])
        break
      case 'cat bags.json':
        setLines(prev => [...prev, '> { "status": "heavy", "hands": "diamond" }'])
        break
      case 'whoami':
        setLines(prev => [...prev, '> degen_explorer', '> (probably broke)'])
        break
      default:
        if (command.startsWith('echo ')) {
          setLines(prev => [...prev, `> ${cmd.slice(5)}`])
        } else {
          setLines(prev => [...prev, `> command not found: ${cmd}`, '> type "help" for commands'])
        }
    }
    setInput('')
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="window-card w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="window-titlebar">
          <span className="window-titlebar-text">dev_mode.exe</span>
          <div className="flex gap-1">
            <button onClick={onClose} className="window-btn hover:bg-red-500" title="Close" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-black font-terminal text-sm text-lime-400 min-h-[300px] max-h-[60vh]">
          {lines.map((line, i) => (
            <div key={i} className={line.startsWith('$') ? 'text-pink-400' : ''}>
              {line}
            </div>
          ))}
          <div className="flex items-center mt-2">
            <span className="text-pink-400 mr-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  handleCommand(input)
                }
                if (e.key === 'Escape') {
                  onClose()
                }
              }}
              className="flex-1 bg-transparent outline-none text-lime-400 caret-lime-400"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// TOAST NOTIFICATION
// ============================================================================
function Toast({ message, onComplete }: { message: string; onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed bottom-6 right-6 z-[10001] animate-bounce">
      <div className="sticker-card-lime px-4 py-3">
        <span className="font-terminal text-lime-400 text-sm">
          {'>'} {message}
        </span>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN EASTER EGG CONTROLLER
// ============================================================================
type ActiveEffect =
  | null
  | 'matrix'
  | 'confetti'
  | 'shake'
  | 'devmode'
  | 'glitch'
  | 'nyan'
  | 'rave'
  | 'gm'
  | 'gn'
  | { type: 'toast'; message: string }

export function EasterEgg() {
  const [keyBuffer, setKeyBuffer] = useState<string[]>([])
  const [activeEffect, setActiveEffect] = useState<ActiveEffect>(null)

  // Sequences to detect (11 easter eggs total)
  const sequences: Array<{ keys: string[]; effect: ActiveEffect }> = [
    { keys: ['d', 'r', 'o', 'p', 't', 'e', 'k'], effect: { type: 'toast', message: 'Alon noticed. probably.' } },
    { keys: ['m', 'a', 't', 'r', 'i', 'x'], effect: 'matrix' },
    { keys: ['g', 'l', 'i', 't', 'c', 'h'], effect: 'glitch' },
    { keys: ['w', 'a', 'g', 'm', 'i'], effect: 'shake' },
    { keys: ['p', 'u', 'm', 'p'], effect: 'confetti' },
    { keys: ['n', 'y', 'a', 'n'], effect: 'nyan' },
    { keys: ['r', 'a', 'v', 'e'], effect: 'rave' },
    { keys: ['d', 'e', 'v'], effect: 'devmode' },
    { keys: ['g', 'm'], effect: 'gm' },
    { keys: ['g', 'n'], effect: 'gn' },
  ]

  const matchesSequence = useCallback((buffer: string[], sequence: string[]) => {
    if (buffer.length < sequence.length) return false
    const recent = buffer.slice(-sequence.length)
    return recent.every((key, i) => key.toLowerCase() === sequence[i].toLowerCase())
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't capture if typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return
    }

    // Don't capture if dev mode is open
    if (activeEffect === 'devmode') return

    const key = e.key
    setKeyBuffer(prev => {
      const newBuffer = [...prev, key].slice(-15)

      // Sort sequences by length (longest first) to avoid false triggers
      const sortedSequences = [...sequences].sort((a, b) => b.keys.length - a.keys.length)

      for (const seq of sortedSequences) {
        if (matchesSequence(newBuffer, seq.keys)) {
          setActiveEffect(seq.effect)
          return []
        }
      }

      return newBuffer
    })
  }, [matchesSequence, activeEffect])

  // Glitch effect handler
  useEffect(() => {
    if (activeEffect === 'glitch') {
      document.body.classList.add('glitch-effect')
      const timer = setTimeout(() => {
        document.body.classList.remove('glitch-effect')
        setActiveEffect(null)
      }, 2000)
      return () => {
        clearTimeout(timer)
        document.body.classList.remove('glitch-effect')
      }
    }
  }, [activeEffect])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const clearEffect = useCallback(() => setActiveEffect(null), [])

  return (
    <>
      {activeEffect === 'matrix' && <MatrixRain onComplete={clearEffect} />}
      {activeEffect === 'confetti' && <TokenConfetti onComplete={clearEffect} />}
      {activeEffect === 'shake' && <ScreenShake onComplete={clearEffect} />}
      {activeEffect === 'devmode' && <DevModeTerminal onClose={clearEffect} />}
      {activeEffect === 'nyan' && <NyanCat onComplete={clearEffect} />}
      {activeEffect === 'rave' && <RaveMode onComplete={clearEffect} />}
      {activeEffect === 'gm' && <GmGnEffect type="gm" onComplete={clearEffect} />}
      {activeEffect === 'gn' && <GmGnEffect type="gn" onComplete={clearEffect} />}
      {activeEffect && typeof activeEffect === 'object' && activeEffect.type === 'toast' && (
        <Toast message={activeEffect.message} onComplete={clearEffect} />
      )}
    </>
  )
}
