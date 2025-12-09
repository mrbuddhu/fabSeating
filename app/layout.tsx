import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Analytics } from '@/components/Analytics'
import { StickyBookCTA } from '@/components/StickyBookCTA'

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <StickyBookCTA />
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

