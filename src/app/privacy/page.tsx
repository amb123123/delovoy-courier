import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — Деловой Курьеръ',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-6 sm:py-10">
      <nav className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Политика конфиденциальности</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-black">
        Политика конфиденциальности
      </h1>

      <div className="prose-dk space-y-6 text-sm text-gray-700 leading-relaxed">
        <p className="text-base text-gray-900">Дата последнего обновления: 1 января 2026 года</p>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">1. Общие положения</h2>
          <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта delovoy-kurier.ru (далее — «Сайт»), принадлежащего редакции «Делового Курьера» (далее — «Издание»).</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">2. Сбор информации</h2>
          <p>Издание может собирать следующую информацию: имя и адрес электронной почты (при подписке на рассылку), данные об использовании сайта (cookies, IP-адрес, тип устройства, страницы просмотра), информацию, предоставленную пользователем добровольно через формы обратной связи.</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">3. Использование информации</h2>
          <p>Собранная информация используется для: обеспечения работы Сайта, отправки информационных рассылок (с согласия пользователя), улучшения качества контента и пользовательского опыта, формирования обезличенной статистики посещаемости.</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">4. Cookies</h2>
          <p>Сайт использует файлы cookies для обеспечения корректной работы, анализа трафика и персонализации контента. Пользователь может отключить cookies в настройках браузера, однако это может повлиять на функциональность Сайта.</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">5. Передача данных третьим лицам</h2>
          <p>Издание не передаёт персональные данные пользователей третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">6. Защита данных</h2>
          <p>Издание принимает организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">7. Контакты</h2>
          <p>По вопросам, связанным с обработкой персональных данных, обращайтесь: <a href="mailto:privacy@delovoy-kurier.ru" className="text-red-700 hover:underline">privacy@delovoy-kurier.ru</a></p>
        </section>
      </div>
    </div>
  )
}
