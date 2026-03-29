import type { Metadata } from 'next'
import Link from 'next/link'
import { visibleArticles as articles } from '@/lib/news-data'
import { NewsCard } from '@/components/news/NewsCard'

export const metadata: Metadata = {
  title: 'Архив — Деловой Курьеръ',
  description: 'Архив всех публикаций «Делового Курьера».',
}

export default function ArchivePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 sm:py-10">
      <nav className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Архив</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-2 pb-3 border-b-2 border-black">
        Архив публикаций
      </h1>
      <p className="text-gray-500 text-sm mb-8">Всего материалов: {articles.length}</p>

      <div className="space-y-5">
        {articles.map((article) => (
          <NewsCard key={article.slug} article={article} variant="compact" />
        ))}
      </div>
    </div>
  )
}
