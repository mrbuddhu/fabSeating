import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabseating.com'
  
  return {
    name: 'FabSeating | Premium Furniture',
    short_name: 'FabSeating',
    description: 'Premium furniture crafted with excellence and attention to detail.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f7',
    theme_color: '#2a2520',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['shopping', 'furniture', 'home'],
    lang: 'en',
    dir: 'ltr',
    scope: '/',
  }
}
