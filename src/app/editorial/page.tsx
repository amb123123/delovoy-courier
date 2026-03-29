import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Редакция — Деловой Курьеръ',
  description: 'Команда редакции «Делового Курьера».',
}

const departments = [
  { role: 'Главная редакция', desc: 'Определяет редакционную политику, координирует работу отделов и отвечает за качество публикаций. Основана выпускниками ВШЭ в 2018 году.' },
  { role: 'Отдел экономики', desc: 'Макроэкономическая аналитика, мониторинг государственной политики, еженедельные обзоры ключевых показателей.' },
  { role: 'Отдел политики', desc: 'Внутренняя и внешняя политика, парламентская деятельность, международные переговоры и саммиты.' },
  { role: 'Отдел финансов', desc: 'Финансовые рынки, банковский сектор, криптовалюты, инвестиционная аналитика.' },
  { role: 'Отдел технологий', desc: 'Искусственный интеллект, стартапы, цифровая экономика, научные открытия.' },
  { role: 'Отдел бизнеса', desc: 'M&A, корпоративные стратегии, рынок недвижимости, предпринимательство.' },
  { role: 'Международный отдел', desc: 'События в Европе, на Ближнем Востоке и в Азии. Корреспондентская сеть в 12 странах.' },
  { role: 'Отдел расследований', desc: 'Журналистские расследования, работа с источниками, верификация информации.' },
  { role: 'Дата-редакция', desc: 'Инфографика, визуализация данных, интерактивные проекты и спецпроекты.' },
  { role: 'Редакция рассылок', desc: 'Ежедневные дайджесты, управление Telegram-каналом, push-уведомления.' },
]

export default function EditorialPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-6 sm:py-10">
      <nav className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Редакция</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3 pb-3 border-b-2 border-black">
        Редакция
      </h1>
      <p className="text-gray-600 mb-8">
        В команде «Делового Курьера» — более 20 журналистов, аналитиков и редакторов.
        Издание работает в формате распределённой редакции с отделами по ключевым тематикам.
      </p>

      <div className="space-y-6">
        {departments.map((dept) => (
          <div key={dept.role} className="border-b border-gray-100 pb-5 last:border-0">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm bg-red-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm sm:text-base">{dept.role.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">{dept.role}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mt-1">{dept.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 bg-gray-50 border border-gray-200">
        <p className="text-sm text-gray-600">
          Хотите присоединиться к команде? Отправьте резюме и примеры работ на{' '}
          <a href="mailto:hr@delovoy-kurier.ru" className="text-red-700 hover:underline">hr@delovoy-kurier.ru</a>
        </p>
      </div>
    </div>
  )
}
