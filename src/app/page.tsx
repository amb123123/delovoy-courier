import { NewsCard } from '@/components/news/NewsCard'
import { Sidebar } from '@/components/news/Sidebar'
import { getMainArticle, getLatestArticles, visibleArticles as articles, breakingNews } from '@/lib/news-data'

export default function HomePage() {
  const mainArticle = getMainArticle()
  const latestArticles = getLatestArticles(12)
  const gridArticles = latestArticles.filter((a) => a.slug !== mainArticle.slug)

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-4 sm:py-6">
      {/* Breaking news ticker */}
      <div className="bg-red-700 text-white text-xs sm:text-sm py-2 px-3 sm:px-4 mb-4 sm:mb-6 flex items-center overflow-hidden rounded-sm">
        <span className="font-bold mr-3 sm:mr-4 flex-shrink-0 bg-white text-red-700 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs uppercase tracking-wider">
          Срочно
        </span>
        <div className="overflow-hidden whitespace-nowrap">
          <span className="ticker-animate inline-block">
            {breakingNews.join(' • ')}
          </span>
        </div>
      </div>

      {/* Hero article */}
      <div className="mb-5 sm:mb-8">
        <NewsCard article={mainArticle} variant="hero" />
      </div>

      {/* Separator */}
      <div className="separator-line mb-4 sm:mb-6" />

      {/* Main content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
        {/* Left — News grid */}
        <div>
          {/* Top row — responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">
            {gridArticles.slice(0, 3).map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="separator-thin mb-4 sm:mb-6" />

          {/* Section: Latest */}
          <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 pb-2 border-b-2 border-black">
            Последние новости
          </h2>

          <div className="space-y-4 sm:space-y-5">
            {gridArticles.slice(3, 9).map((article) => (
              <NewsCard key={article.slug} article={article} variant="compact" />
            ))}
          </div>
        </div>

        {/* Right — Sidebar */}
        <Sidebar articles={articles} />
      </div>
    </div>
  )
}
