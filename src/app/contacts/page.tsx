import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Контакты — Деловой Курьеръ',
  description: 'Контактная информация редакции «Делового Курьера».',
}

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-6 sm:py-10">
      <nav className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Контакты</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-black">
        Контакты
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <div className="border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Редакция</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="text-gray-400 flex-shrink-0 w-16">Телефон</span>
              <a href="tel:+79055776969" className="text-red-700 hover:underline font-medium">+7 (905) 577-69-69</a>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-400 flex-shrink-0 w-16">Email</span>
              <a href="mailto:info@delovoy-kurier.ru" className="text-red-700 hover:underline">info@delovoy-kurier.ru</a>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-400 flex-shrink-0 w-16">Telegram</span>
              <a href="https://t.me/delovoy_kurier" className="text-red-700 hover:underline" target="_blank" rel="noopener noreferrer">@delovoy_kurier</a>
            </li>
          </ul>
        </div>

        <div className="border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Адрес</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            101000, г. Москва,<br />
            ул. Мясницкая, д. 20,<br />
            БЦ «Курьеръ», офис 412
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Приём посетителей: пн–пт, 10:00–18:00
          </p>
        </div>

        <div className="border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Для прессы</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="text-gray-400 flex-shrink-0 w-16">Email</span>
              <a href="mailto:press@delovoy-kurier.ru" className="text-red-700 hover:underline">press@delovoy-kurier.ru</a>
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Запросы на комментарии, аккредитация, использование материалов.
          </p>
        </div>

        <div className="border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Реклама</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="text-gray-400 flex-shrink-0 w-16">Email</span>
              <a href="mailto:ads@delovoy-kurier.ru" className="text-red-700 hover:underline">ads@delovoy-kurier.ru</a>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-400 flex-shrink-0 w-16">Телефон</span>
              <a href="tel:+79055776969" className="text-red-700 hover:underline font-medium">+7 (905) 577-69-69</a>
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            <Link href="/advertising" className="text-red-700 hover:underline">Медиакит и условия размещения →</Link>
          </p>
        </div>
      </div>

      <div className="mt-8 p-5 bg-gray-50 border border-gray-200 text-sm text-gray-600">
        <p className="font-medium text-gray-900 mb-1">Сообщить о неточности</p>
        <p>Если вы обнаружили ошибку в материале, напишите на <a href="mailto:corrections@delovoy-kurier.ru" className="text-red-700 hover:underline">corrections@delovoy-kurier.ru</a> — мы оперативно проверим и исправим.</p>
      </div>
    </div>
  )
}
