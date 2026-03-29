'use client'

import { ReactNode } from 'react'

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  titleStyle?: 'default' | 'marker' | 'terminal'
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  titleStyle = 'default',
}: SectionProps) {
  const titleClasses = {
    default: 'text-2xl font-bold text-white sm:text-3xl',
    marker: 'font-marker text-2xl text-lime-400 sm:text-3xl rotate-slight-ccw',
    terminal: 'font-terminal text-xl text-lime-400 tracking-wider uppercase sm:text-2xl',
  }

  return (
    <section id={id} className={`py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2 className={titleClasses[titleStyle]}>{title}</h2>
            )}
            {subtitle && (
              <p className="mt-2 text-sm text-zinc-400 sm:text-base">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
