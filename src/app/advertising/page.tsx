import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Реклама — Деловой Курьеръ',
  description: 'Размещение рекламы в «Деловом Курьере». Медиакит, форматы и условия.',
}

export default function AdvertisingPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-6 sm:py-10">
      <nav className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Реклама</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-black">
        Реклама
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        «Деловой Курьеръ» — одно из ведущих деловых интернет-изданий России с аудиторией более
        2 млн уникальных посетителей в месяц. Мы предлагаем эффективные форматы для работы с
        бизнес-аудиторией.
      </p>

      <h2 className="font-serif text-xl font-bold text-gray-900 mt-8 mb-4">Аудитория</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { num: '2,1 млн', label: 'уникальных посетителей/мес' },
          { num: '8,4 млн', label: 'просмотров страниц/мес' },
          { num: '72%', label: 'аудитория 25–54 лет' },
          { num: '64%', label: 'доход выше среднего' },
        ].map((stat) => (
          <div key={stat.label} className="border border-gray-200 bg-white p-4 text-center">
            <div className="font-serif text-2xl font-bold text-red-700">{stat.num}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-xl font-bold text-gray-900 mt-8 mb-4">Форматы размещения</h2>
      <div className="space-y-4 mb-8">
        {[
          { name: 'Баннерная реклама', desc: 'Десктоп и мобайл, все разделы сайта. Форматы: 728×90, 300×250, 970×250.' },
          { name: 'Нативная интеграция', desc: 'Спонсорские статьи и партнёрские материалы с пометкой «Партнёрский материал».' },
          { name: 'Спецпроекты', desc: 'Брендированные разделы, лонгриды, интерактивные форматы под задачи клиента.' },
          { name: 'Email-рассылка', desc: 'Размещение в ежедневной рассылке (85 000 подписчиков, open rate 32%).' },
          { name: 'Telegram-канал', desc: 'Рекламные посты в официальном канале (120 000+ подписчиков).' },
        ].map((format) => (
          <div key={format.name} className="border-b border-gray-100 pb-4 last:border-0">
            <h3 className="font-medium text-gray-900">{format.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{format.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 text-white p-6 sm:p-8">
        <h2 className="font-serif text-xl font-bold mb-3">Обсудить размещение</h2>
        <p className="text-gray-300 text-sm mb-4">
          Свяжитесь с коммерческим отделом для получения медиакита и индивидуального предложения.
        </p>
        <div className="space-y-2 text-sm">
          <p>Email: <a href="mailto:ads@delovoy-kurier.ru" className="text-red-400 hover:underline">ads@delovoy-kurier.ru</a></p>
          <p>Телефон: <a href="tel:+79055776969" className="text-red-400 hover:underline">+7 (905) 577-69-69</a></p>
        </div>
      </div>
    </div>
  )
}
