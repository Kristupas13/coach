import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ArmCoach – Profesionalios treniruotės',
  description:
    'Individualios ir grupinės treniruotės su profesionaliu treneriu. Pasiekite savo tikslus šiandien.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lt" className={`${inter.variable} ${geistMono.variable} bg-background`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <main className="min-h-screen bg-background">
          <Navbar />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </main>
      </body>
    </html>
  )
}
