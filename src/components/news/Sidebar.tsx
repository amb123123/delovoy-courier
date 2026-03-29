import type { Article } from '@/lib/news-data'
import { opinions } from '@/lib/news-data'

interface SidebarProps {
  articles: Article[]
}

export function Sidebar({ articles }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Читаемое */}
      <div className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-4 py-3">
          <h3 className="font-serif text-lg font-bold text-gray-900">Читаемое</h3>
        </div>
        <div className="px-4 py-4 space-y-3">
          {articles.slice(0, 7).map((article, i) => (
            <div key={article.slug} className="flex gap-3 group border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <span className="text-2xl font-serif font-bold text-gray-200 flex-shrink-0 w-8 text-right">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <a
                  href={`/article/${article.slug}`}
                  className="font-serif text-sm font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors block"
                >
                  {article.title}
                </a>
                <span className="text-xs text-gray-400 mt-1 block">{article.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Мнения */}
      <div className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-4 py-3">
          <h3 className="font-serif text-lg font-bold text-gray-900">Мнения</h3>
        </div>
        <div className="px-4 py-4 space-y-4">
          {opinions.map((opinion, i) => (
            <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <p className="font-serif text-sm text-gray-900 leading-snug font-medium">
                {opinion.quote}
              </p>
              <div className="mt-2">
                <span className="text-xs font-bold text-red-700">{opinion.author}</span>
                <span className="text-xs text-gray-400">, {opinion.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Курсы валют */}
      <div className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-4 py-3">
          <h3 className="font-serif text-lg font-bold text-gray-900">Курсы и индексы</h3>
        </div>
        <div className="px-4 py-4">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-gray-700">USD/RUB</td>
                <td className="py-2 text-right text-gray-900 font-bold">84,92</td>
                <td className="py-2 text-right text-green-600 text-xs pl-2">−0,53</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-gray-700">EUR/RUB</td>
                <td className="py-2 text-right text-gray-900 font-bold">92,35</td>
                <td className="py-2 text-right text-green-600 text-xs pl-2">−0,28</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-gray-700">Brent</td>
                <td className="py-2 text-right text-gray-900 font-bold">$74,10</td>
                <td className="py-2 text-right text-red-600 text-xs pl-2">+1,30</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-gray-700">МосБиржа</td>
                <td className="py-2 text-right text-gray-900 font-bold">3 215</td>
                <td className="py-2 text-right text-red-600 text-xs pl-2">+42</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Биткоин</td>
                <td className="py-2 text-right text-gray-900 font-bold">$87 420</td>
                <td className="py-2 text-right text-red-600 text-xs pl-2">+1,2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </aside>
  )
}
