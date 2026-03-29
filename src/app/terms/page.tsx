import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Пользовательское соглашение — Деловой Курьеръ',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-6 sm:py-10">
      <nav className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Пользовательское соглашение</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-black">
        Пользовательское соглашение
      </h1>

      <div className="prose-dk space-y-6 text-sm text-gray-700 leading-relaxed">
        <p className="text-base text-gray-900">Дата последнего обновления: 1 января 2026 года</p>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">1. Термины и определения</h2>
          <p>«Сайт» — интернет-ресурс delovoy-kurier.ru и все его поддомены. «Издание» — редакция «Делового Курьера». «Пользователь» — любое лицо, получающее доступ к Сайту. «Контент» — все материалы, опубликованные на Сайте, включая тексты, фотографии, графику, видео и иные объекты.</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">2. Авторские права</h2>
          <p>Все материалы, опубликованные на Сайте, являются объектами авторского права и охраняются в соответствии с законодательством Российской Федерации. Копирование, воспроизведение и распространение материалов Сайта без письменного разрешения Издания запрещено.</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">3. Цитирование</h2>
          <p>Допускается цитирование материалов Сайта в объёме не более 200 слов с обязательным указанием «Делового Курьера» в качестве источника и активной гиперссылкой на оригинальный материал.</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">4. Ограничение ответственности</h2>
          <p>Издание прилагает все усилия для обеспечения точности и актуальности публикуемой информации, однако не несёт ответственности за возможные неточности, ошибки или упущения. Информация на Сайте не является финансовой, юридической или инвестиционной рекомендацией.</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">5. Комментарии</h2>
          <p>Издание оставляет за собой право удалять комментарии, содержащие оскорбления, нецензурную лексику, призывы к насилию, рекламу или спам. Мнения, высказанные в комментариях, отражают позицию их авторов и могут не совпадать с позицией редакции.</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">6. Изменение условий</h2>
          <p>Издание вправе вносить изменения в настоящее Соглашение без предварительного уведомления. Актуальная версия размещается на данной странице. Продолжение использования Сайта после внесения изменений означает согласие Пользователя с новой редакцией Соглашения.</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">7. Контакты</h2>
          <p>По вопросам, связанным с настоящим Соглашением: <a href="mailto:legal@delovoy-kurier.ru" className="text-red-700 hover:underline">legal@delovoy-kurier.ru</a></p>
        </section>
      </div>
    </div>
  )
}
