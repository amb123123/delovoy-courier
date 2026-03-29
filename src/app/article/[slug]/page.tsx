import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, articles, getArticlesByCategory } from '@/lib/news-data'
import { NewsCard } from '@/components/news/NewsCard'
import { RichContent } from '@/components/news/RichContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Не найдено' }
  return {
    title: `${article.title} — Деловой Курьеръ`,
    description: article.lead,
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const related = getArticlesByCategory(article.categorySlug)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-4 sm:py-6">
      {/* Breadcrumbs */}
      <nav className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
        <Link href="/" className="hover:text-red-700 transition-colors flex-shrink-0">
          Главная
        </Link>
        <span className="flex-shrink-0">/</span>
        <Link
          href={`/category/${article.categorySlug}`}
          className="hover:text-red-700 transition-colors flex-shrink-0"
        >
          {article.category}
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
        {/* Article content */}
        <article>
          {/* Category & time */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="bg-red-700 text-white text-[10px] sm:text-xs font-bold px-2 py-1 uppercase tracking-wider">
              {article.category}
            </span>
            <time className="text-xs sm:text-sm text-gray-500">
              {article.date}, {article.time}
            </time>
          </div>

          {/* Title */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-2 sm:mb-3">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">{article.subtitle}</p>
          )}

          {/* Author */}
          <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">{article.author}</span>
          </div>

          {/* Main image */}
          <div className="mb-6 sm:mb-8 -mx-4 sm:mx-0">
            <div className="bg-gray-100">
              <img
                src={article.image}
                alt={article.title}
                width={800}
                height={400}
                fetchPriority="high"
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-2 px-4 sm:px-0">
              Фото: {article.author} / Деловой Курьеръ
            </p>
          </div>

          {/* Lead */}
          <p className="text-base sm:text-lg font-medium text-gray-900 leading-relaxed mb-5 sm:mb-6">
            {article.lead}
          </p>

          {/* Body */}
          {article.richBody ? (
            <RichContent blocks={article.richBody} />
          ) : (
            <div className="article-body">
              {article.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* Tags / share */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-bold">Теги:</span>
              <Link
                href={`/category/${article.categorySlug}`}
                className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-2 py-1 hover:bg-gray-200 transition-colors"
              >
                {article.category}
              </Link>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold">Поделиться</span>
              <button className="hover:text-red-700 transition-colors p-1 touch-target" title="Telegram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.053 5.56-5.023c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.828.94z"/>
                </svg>
              </button>
            </div>
          </div>
        </article>

        {/* Sidebar — related */}
        <aside className="mt-6 lg:mt-0">
          <div className="border border-gray-200 bg-white lg:sticky lg:top-4">
            <div className="border-b border-gray-200 px-4 py-3">
              <h3 className="font-serif text-lg font-bold text-gray-900">Читайте также</h3>
            </div>
            <div className="px-4 py-4 space-y-4">
              {related.map((a) => (
                <NewsCard key={a.slug} article={a} variant="sidebar" />
              ))}
              {related.length === 0 && (
                <p className="text-sm text-gray-500">Нет похожих статей</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
