import Link from 'next/link'
import { categories } from '@/lib/news-data'

export function NewsFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-8 sm:mt-12">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Издание */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4 uppercase tracking-wider">Издание</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">О нас</Link>
              </li>
              <li>
                <Link href="/editorial" className="hover:text-white transition-colors">Редакция</Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link>
              </li>
            </ul>
          </div>

          {/* Рубрики */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4 uppercase tracking-wider">Рубрики</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Сервисы */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4 uppercase tracking-wider">Сервисы</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/subscribe" className="hover:text-white transition-colors">Подписка</Link>
              </li>
              <li>
                <Link href="/archive" className="hover:text-white transition-colors">Архив</Link>
              </li>
              <li>
                <a href="https://t.me/delovoy_kurier" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram</a>
              </li>
            </ul>
          </div>

          {/* Правовая информация */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4 uppercase tracking-wider">Правовое</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">Соглашение</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">Конфиденциальность</Link>
              </li>
              <li>
                <Link href="/advertising" className="hover:text-white transition-colors">Реклама</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-5 sm:pt-6 flex flex-col items-center sm:items-start md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          <div className="text-center sm:text-left">
            <Link href="/" className="block mb-1.5 sm:mb-2">
              <span className="font-serif text-lg sm:text-xl font-bold text-white">Деловой Курьеръ</span>
            </Link>
            <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
              © 2026 «Деловой Курьеръ». Все права защищены. 18+
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed mt-2">
              Данный сайт носит исключительно юмористический и развлекательный характер. Все материалы, имена, события и персонажи являются вымышленными. Любые совпадения с реальными людьми, организациями или событиями случайны и непреднамеренны.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-500">
            <a href="mailto:info@delovoy-kurier.ru" className="hover:text-gray-300 transition-colors">info@delovoy-kurier.ru</a>
            <span className="hidden sm:inline">•</span>
            <a href="tel:+79055776969" className="hover:text-gray-300 transition-colors">+7 (905) 577-69-69</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
