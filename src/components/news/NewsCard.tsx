import Link from 'next/link'
import type { Article } from '@/lib/news-data'

interface NewsCardProps {
  article: Article
  variant?: 'default' | 'hero' | 'compact' | 'sidebar'
}

export function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  if (variant === 'hero') {
    return (
      <article className="group">
        <Link href={`/article/${article.slug}`} className="block">
          <div className="relative overflow-hidden bg-gray-100">
            <img
              src={article.image}
              alt={article.title}
              width={800}
              height={400}
              fetchPriority="high"
              className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 md:p-8">
              <span className="inline-block bg-red-700 text-white text-[10px] sm:text-xs font-bold px-2 py-1 mb-2 sm:mb-3 uppercase tracking-wider">
                {article.category}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-1 sm:mb-2">
                {article.title}
              </h2>
              {article.subtitle && (
                <p className="text-gray-200 text-xs sm:text-sm md:text-base line-clamp-2">{article.subtitle}</p>
              )}
            </div>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'compact') {
    return (
      <article className="group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
        <Link href={`/article/${article.slug}`} className="flex gap-3 sm:gap-4">
          <img
            src={article.image}
            alt={article.title}
            width={140}
            height={90}
            loading="lazy"
            className="w-[100px] h-[70px] sm:w-[140px] sm:h-[90px] object-cover bg-gray-100 flex-shrink-0 rounded-sm"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] sm:text-xs font-bold text-red-700 uppercase tracking-wider">
              {article.category}
            </span>
            <h3 className="font-serif text-sm sm:text-base font-bold text-gray-900 leading-snug mt-0.5 sm:mt-1 group-hover:text-red-700 transition-colors line-clamp-3">
              {article.title}
            </h3>
            <time className="text-[10px] sm:text-xs text-gray-400 mt-1 block">{article.time}</time>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'sidebar') {
    return (
      <article className="group border-b border-gray-100 pb-3 last:border-0 last:pb-0">
        <Link href={`/article/${article.slug}`} className="block">
          <h4 className="font-serif text-sm font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors">
            {article.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-red-700 font-medium">{article.category}</span>
            <span className="text-xs text-gray-400">{article.time}</span>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="group">
      <Link href={`/article/${article.slug}`} className="block">
        <div className="overflow-hidden rounded-sm bg-gray-100">
          <img
            src={article.image}
            alt={article.title}
            width={800}
            height={400}
            loading="lazy"
            className="w-full h-[160px] sm:h-[200px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
        <div className="pt-2.5 sm:pt-3">
          <span className="text-[10px] sm:text-xs font-bold text-red-700 uppercase tracking-wider">
            {article.category}
          </span>
          <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 leading-snug mt-1 group-hover:text-red-700 transition-colors">
            {article.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1.5 sm:mt-2 line-clamp-2">{article.lead}</p>
          <time className="text-[10px] sm:text-xs text-gray-400 mt-1.5 sm:mt-2 block">{article.date}, {article.time}</time>
        </div>
      </Link>
    </article>
  )
}
