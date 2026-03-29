'use client'

import { useState } from 'react'
import type { ContentBlock } from '@/lib/news-data'

function SpoilerBlock({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-6 border border-gray-200 bg-gray-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between text-left group"
      >
        <span className="font-serif text-sm sm:text-base font-bold text-gray-900 group-hover:text-red-700 transition-colors">
          {title}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 ml-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 sm:px-5 sm:pb-5 border-t border-gray-200">
          <ol className="mt-3 space-y-1.5 text-sm text-gray-800 leading-relaxed">
            {items.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gray-400 flex-shrink-0 w-6 text-right tabular-nums">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export function RichContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="article-rich-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={i} className="text-gray-800 leading-relaxed mb-4 sm:mb-5 text-[0.9375rem] sm:text-[1.0625rem]">
                {block.text}
              </p>
            )

          case 'subheading':
            return (
              <h2 key={i} className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mt-8 sm:mt-10 mb-3 sm:mb-4 pb-2 border-b border-gray-200">
                {block.text}
              </h2>
            )

          case 'image':
            return (
              <figure key={i} className="my-6 sm:my-8 -mx-4 sm:mx-0">
                <div className="bg-gray-100">
                  <img
                    src={block.src}
                    alt={block.caption || ''}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-[10px] sm:text-xs text-gray-400 mt-2 px-4 sm:px-0 italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )

          case 'list':
            return (
              <ul key={i} className="my-4 sm:my-5 space-y-2 pl-4 sm:pl-5">
                {block.items.map((item, j) => (
                  <li key={j} className="text-gray-800 text-[0.9375rem] sm:text-[1.0625rem] leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:bg-red-700 before:rounded-full">
                    {item}
                  </li>
                ))}
              </ul>
            )

          case 'spoiler':
            return <SpoilerBlock key={i} title={block.title} items={block.items} />

          case 'quote':
            return (
              <blockquote key={i} className="my-6 sm:my-8 pl-4 sm:pl-5 border-l-4 border-red-700">
                <p className="font-serif text-base sm:text-lg text-gray-900 italic leading-relaxed">
                  {block.text}
                </p>
                {block.author && (
                  <cite className="block mt-2 text-xs sm:text-sm text-gray-500 not-italic">
                    — {block.author}
                  </cite>
                )}
              </blockquote>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
