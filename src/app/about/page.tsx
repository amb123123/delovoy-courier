import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'О нас — Деловой Курьеръ',
  description: 'Независимое деловое издание. Основано в 2018 году выпускниками Высшей школы экономики.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-6 sm:py-10">
      <nav className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">О нас</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-black">
        О нас
      </h1>

      <div className="prose-dk">
        <p className="text-lg font-medium text-gray-900 leading-relaxed mb-6">
          «Деловой Курьеръ» — независимое деловое интернет-издание, основанное в 2018 году группой студентов
          факультета экономических наук Национального исследовательского университета «Высшая школа экономики».
        </p>

        <h2 className="font-serif text-xl font-bold text-gray-900 mt-8 mb-3">Как всё начиналось</h2>
        <p>
          В 2018 году четверо студентов ВШЭ запустили телеграм-канал, в котором разбирали экономические новости
          простым и понятным языком. Формат оказался востребованным: за первый год аудитория выросла до 30 тысяч
          подписчиков. В 2020 году редакция зарегистрировала СМИ и запустила полноценный сайт.
        </p>

        <h2 className="font-serif text-xl font-bold text-gray-900 mt-8 mb-3">Что мы делаем сегодня</h2>
        <p>
          Сегодня «Деловой Курьеръ» — это ежедневное издание с аудиторией более 2 миллионов уникальных
          посетителей в месяц. Мы освещаем ключевые события в сферах экономики, политики, бизнеса, финансов
          и технологий. Наша редакция насчитывает более 20 журналистов, аналитиков и редакторов.
        </p>

        <h2 className="font-serif text-xl font-bold text-gray-900 mt-8 mb-3">Наши принципы</h2>
        <ul className="space-y-2 my-4">
          <li className="flex gap-2">
            <span className="text-red-700 font-bold flex-shrink-0">—</span>
            <span><strong>Независимость.</strong> Редакция не аффилирована с государственными структурами или бизнес-группами. Наши публикации основаны на фактах, а не на интересах рекламодателей.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-700 font-bold flex-shrink-0">—</span>
            <span><strong>Точность.</strong> Каждый факт проверяется минимум двумя независимыми источниками. Ошибки признаются и исправляются публично.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-700 font-bold flex-shrink-0">—</span>
            <span><strong>Доступность.</strong> Мы пишем об экономике и финансах так, чтобы материал был понятен не только профессионалам, но и широкой аудитории.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-700 font-bold flex-shrink-0">—</span>
            <span><strong>Оперативность.</strong> Редакция работает в режиме 24/7, обеспечивая покрытие ключевых событий в реальном времени.</span>
          </li>
        </ul>

        <h2 className="font-serif text-xl font-bold text-gray-900 mt-8 mb-3">Признание</h2>
        <p>
          В 2023 году «Деловой Курьеръ» вошёл в топ-10 деловых онлайн-изданий России по версии Медиалогии.
          В 2024 году редакция получила премию «Медиаменеджер» в номинации «Лучшее деловое интернет-СМИ».
          Материалы издания регулярно цитируются ведущими российскими и зарубежными СМИ.
        </p>

        <h2 className="font-serif text-xl font-bold text-gray-900 mt-8 mb-3">Юридическая информация</h2>
        <p className="text-sm text-gray-600">
          Зарегистрированное средство массовой информации.<br />
          Все права на материалы принадлежат редакции «Делового Курьера».
        </p>
      </div>
    </div>
  )
}
