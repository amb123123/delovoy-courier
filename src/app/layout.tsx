import type { Metadata } from 'next'
import { Header } from '@/components/news/Header'
import { NewsFooter } from '@/components/news/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Деловой Курьеръ — Новости России и мира',
  description: 'Независимое деловое издание. Новости политики, экономики, бизнеса, финансов и технологий.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-50 antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <NewsFooter />
        </div>
      </body>
    </html>
  )
}
