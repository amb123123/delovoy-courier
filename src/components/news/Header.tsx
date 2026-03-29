'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { categories } from '@/lib/news-data'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [moscowTime, setMoscowTime] = useState('')

  const today = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      setMoscowTime(
        now.toLocaleTimeString('ru-RU', {
          timeZone: 'Europe/Moscow',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' МСК'
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="border-b border-gray-200 bg-white">
      {/* Utility bar */}
      <div className="bg-gray-900 text-gray-400 text-xs safe-padding-x">
        <div className="mx-auto max-w-[1200px] px-4 py-1.5 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/subscribe" className="hover:text-white transition-colors">Подписка</Link>
            <span className="text-gray-600">|</span>
            <Link href="/archive" className="hover:text-white transition-colors">Архив</Link>
            <span className="text-gray-600">|</span>
            <Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link>
            <span className="text-gray-600">|</span>
            <Link href="/advertising" className="hover:text-white transition-colors">Реклама</Link>
          </div>
          <div className="flex sm:hidden items-center gap-3">
            <Link href="/subscribe" className="hover:text-white transition-colors">Подписка</Link>
            <span className="text-gray-600">|</span>
            <Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link>
          </div>
          <time className="text-gray-300 font-medium">{moscowTime}</time>
        </div>
      </div>

      {/* Logo + date + markets */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:py-5 flex flex-col items-center gap-2 md:gap-3 md:flex-row md:justify-between">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="block">
              <h1 className="font-serif text-[1.75rem] sm:text-4xl md:text-5xl font-bold tracking-tight text-black text-center md:text-left">
                Деловой Курьеръ
              </h1>
            </Link>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 mt-1">
              <time className="text-[11px] sm:text-xs text-gray-500 capitalize">{today}</time>
              <span className="text-[11px] sm:text-xs text-gray-400 italic">Независимое деловое издание</span>
            </div>
          </div>
          <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
            <div className="flex items-center justify-center md:justify-end gap-3 sm:gap-4 text-[11px] sm:text-xs text-gray-500 whitespace-nowrap px-2 md:px-0">
              <span>$ 84,92 ₽</span>
              <span className="text-gray-300">•</span>
              <span>€ 92,35 ₽</span>
              <span className="text-gray-300">•</span>
              <span>Brent $74,1</span>
              <span className="text-gray-300">•</span>
              <span>MOEX 3 215</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <nav className="border-t border-gray-200 hidden md:block bg-white">
        <div className="mx-auto max-w-[1200px] px-4">
          <ul className="flex items-center justify-center gap-0">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-700 hover:bg-gray-50 transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Navigation - Mobile */}
      <div className="md:hidden border-t border-gray-200">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full px-4 py-3 text-sm font-medium text-gray-700 flex items-center justify-between touch-target"
        >
          <span>Разделы</span>
          <svg
            className={`w-5 h-5 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {menuOpen && (
          <ul className="border-t border-gray-100 bg-gray-50">
            {categories.map((cat) => (
              <li key={cat.slug} className="border-b border-gray-100 last:border-0">
                <Link
                  href={`/category/${cat.slug}`}
                  className="block px-4 py-3.5 text-sm text-gray-700 hover:text-red-700 active:bg-gray-100 touch-target"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}
