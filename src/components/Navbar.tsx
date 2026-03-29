'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/tek', label: 'TEK' },
  { href: '/calc', label: 'CALC' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-terminal text-xl tracking-wider text-white">
            DROP<span className="text-lime-400">TEK</span>
          </Link>

          {/* Desktop nav - tab bar style */}
          <div className="hidden md:flex items-center">
            <div className="flex border-2 border-zinc-700 bg-zinc-900">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 font-terminal text-sm tracking-wider border-r border-zinc-700 last:border-r-0 transition-colors ${
                    pathname === link.href
                      ? 'bg-lime-400/20 text-lime-400'
                      : 'text-zinc-400 hover:text-lime-400 hover:bg-zinc-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-lime-400 border border-zinc-700 hover:border-lime-400/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="border-t-2 border-zinc-800 py-2 md:hidden bg-zinc-900">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 px-3 font-terminal text-sm tracking-wider border-l-2 transition-colors ${
                  pathname === link.href
                    ? 'border-lime-400 text-lime-400 bg-lime-400/10'
                    : 'border-transparent text-zinc-400 hover:text-lime-400 hover:border-zinc-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
