'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'degen'
  href?: string
  children: ReactNode
  external?: boolean
}

const variants = {
  primary:
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 font-terminal text-lg tracking-wide bg-lime-400 text-zinc-900 border-2 border-lime-300 shadow-[3px_3px_0_rgba(0,0,0,0.3)] hover:shadow-[1px_1px_0_rgba(0,0,0,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all',
  secondary:
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 font-terminal text-lg tracking-wide bg-zinc-900 text-lime-400 border-2 border-lime-400/50 shadow-[3px_3px_0_rgba(163,230,53,0.2)] hover:border-lime-400 hover:bg-lime-400/10 hover:shadow-[1px_1px_0_rgba(163,230,53,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all',
  ghost:
    'inline-flex items-center justify-center gap-2 px-3 py-1.5 font-terminal text-base text-zinc-400 hover:text-lime-400 border border-transparent hover:border-zinc-700 transition-all',
  degen:
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 font-marker text-lg bg-pink-500 text-white border-2 border-pink-400 shadow-[3px_3px_0_rgba(236,72,153,0.3)] hover:shadow-[1px_1px_0_rgba(236,72,153,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover-wiggle transition-all',
}

export function Button({
  variant = 'primary',
  href,
  children,
  external,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClassName = `${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 ${className}`

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClassName}
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={baseClassName}>
        {children}
      </Link>
    )
  }

  return (
    <button
      className={baseClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
