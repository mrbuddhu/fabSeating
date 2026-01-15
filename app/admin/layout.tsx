import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
  adjustFontFallback: true,
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'Admin | Fab Seating',
  description: 'Admin dashboard for Fab Seating website management',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} luxury-scrollbar`}>
      <body className="font-sans antialiased luxury-scrollbar">
        {children}
      </body>
    </html>
  )
}
