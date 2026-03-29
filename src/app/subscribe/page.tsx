import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Подписка — Деловой Курьеръ',
  description: 'Подпишитесь на рассылку «Делового Курьера» и получайте главные новости каждый день.',
}

export default function SubscribePage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-6 sm:py-10">
      <nav className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Подписка</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-black">
        Подписка
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Будьте в курсе главных событий. Выберите удобный способ получения новостей.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="border border-gray-200 bg-white p-6">
          <div className="text-3xl mb-3">📧</div>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">Email-рассылка</h2>
          <p className="text-sm text-gray-600 mb-4">
            Ежедневный дайджест в 8:00 и 19:00. Главные новости, аналитика, мнения экспертов. Без спама.
          </p>
          <p className="text-xs text-gray-400">85 000 подписчиков</p>
        </div>

        <div className="border border-gray-200 bg-white p-6">
          <div className="text-3xl mb-3">✈️</div>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">Telegram-канал</h2>
          <p className="text-sm text-gray-600 mb-4">
            Оперативные новости, срочные материалы, эксклюзивы. Первыми узнавайте о важном.
          </p>
          <a
            href="https://t.me/delovoy_kurier"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-700 text-white text-sm font-medium px-4 py-2 hover:bg-red-800 transition-colors"
          >
            Подписаться
          </a>
        </div>

        <div className="border border-gray-200 bg-white p-6">
          <div className="text-3xl mb-3">📱</div>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">Push-уведомления</h2>
          <p className="text-sm text-gray-600 mb-4">
            Мгновенные уведомления о срочных новостях. Только самое важное, не чаще 5 раз в день.
          </p>
          <p className="text-xs text-gray-400">Разрешите уведомления в браузере</p>
        </div>

        <div className="border border-gray-200 bg-white p-6">
          <div className="text-3xl mb-3">📡</div>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">RSS</h2>
          <p className="text-sm text-gray-600 mb-4">
            Для тех, кто предпочитает агрегаторы новостей. Полнотекстовый RSS-фид всех публикаций.
          </p>
          <p className="text-xs text-gray-500 font-mono">delovoy-kurier.ru/rss.xml</p>
        </div>
      </div>

      <div className="p-5 bg-gray-50 border border-gray-200 text-sm text-gray-600">
        <p>Вопросы по подписке: <a href="mailto:subscribe@delovoy-kurier.ru" className="text-red-700 hover:underline">subscribe@delovoy-kurier.ru</a></p>
      </div>
    </div>
  )
}
