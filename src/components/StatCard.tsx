'use client'

import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | ReactNode
  sublabel?: string
  note?: string
  variant?: 'default' | 'lime' | 'pink'
  rotate?: 'cw' | 'ccw' | 'none'
}

const rotations = {
  cw: 'rotate-slight-cw',
  ccw: 'rotate-slight-ccw',
  none: '',
}

const variants = {
  default: 'sticker-card',
  lime: 'sticker-card-lime',
  pink: 'sticker-card-pink',
}

export function StatCard({
  label,
  value,
  sublabel,
  note,
  variant = 'default',
  rotate = 'none',
}: StatCardProps) {
  return (
    <div className={`${variants[variant]} ${rotations[rotate]} p-4 relative`}>
      {/* Tape effect on top */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-zinc-700/50 border border-zinc-600" />

      <p className="font-terminal text-xs tracking-wider text-zinc-500 uppercase mt-2">
        {label}
      </p>
      <p className="mt-2 font-terminal text-2xl text-lime-400 sm:text-3xl">
        {value}
      </p>
      {sublabel && (
        <p className="mt-1 text-xs text-zinc-500">{sublabel}</p>
      )}
      {note && (
        <p className="mt-2 font-marker text-xs text-zinc-600 rotate-slight-ccw">
          {note}
        </p>
      )}
    </div>
  )
}
