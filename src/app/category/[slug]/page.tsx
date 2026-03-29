import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categories, getArticlesByCategory, visibleArticles as articles } from '@/lib/news-data'
import { NewsCard } from '@/components/news/NewsCard'
import { Sidebar } from '@/components/news/Sidebar'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) return { title: 'Не найдено' }
  return {
    title: `${category.name} — Деловой Курьеръ`,
    description: `Последние новости в разделе «${category.name}» — Деловой Курьеръ`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const categoryArticles = getArticlesByCategory(slug)

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-4 sm:py-6">
      {/* Breadcrumbs */}
      <nav className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2">
        <Link href="/" className="hover:text-red-700 transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{category.name}</span>
      </nav>

      {/* Title */}
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-black">
        {category.name}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
        <div>
          {categoryArticles.length > 0 ? (
            <>
              {/* First article — large */}
              {categoryArticles[0] && (
                <div className="mb-6 sm:mb-8">
                  <NewsCard article={categoryArticles[0]} variant="hero" />
                </div>
              )}

              {/* Rest — compact */}
              <div className="space-y-4 sm:space-y-5">
                {categoryArticles.slice(1).map((article) => (
                  <NewsCard key={article.slug} article={article} variant="compact" />
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500 py-12 text-center">
              В этом разделе пока нет новостей
            </p>
          )}
        </div>

        <Sidebar articles={articles} />
      </div>
    </div>
  )
}
