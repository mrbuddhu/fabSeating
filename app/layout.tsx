import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Analytics } from '@/components/Analytics'
import { StickyBookCTA } from '@/components/StickyBookCTA'
import { PWARegister } from '@/components/PWARegister'

const cormorant = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'FabSeating | Premium Furniture',
    template: '%s | FabSeating',
  },
  description: 'Premium furniture crafted with excellence and attention to detail.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fabseating.com'),
  manifest: '/manifest.json',
  themeColor: '#2a2520',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: '512x512' },
      { url: '/logo.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FabSeating',
  },
  openGraph: {
    title: 'FabSeating | Premium Furniture',
    description: 'Premium furniture crafted with excellence and attention to detail.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fabseating.com',
    siteName: 'FabSeating',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'FabSeating',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FabSeating | Premium Furniture',
    description: 'Premium furniture crafted with excellence and attention to detail.',
    images: ['/logo.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-950 focus:text-primary-50 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <PWARegister />
        <Header />
        <main id="main-content">{children}</main>
        <StickyBookCTA />
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

