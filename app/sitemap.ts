import { MetadataRoute } from 'next'
import { getSitemapData } from '@/lib/sanity/queries'
import { CATEGORIES } from '@/lib/siteContent'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabseating.com'
  const data = await getSitemapData()

  const routes = [
    '',
    '/projects',
    '/contact',
    '/custom-bespoke',
    '/solutions/residential',
    '/solutions/office',
    '/solutions/hospitality',
    ...CATEGORIES.map((c) => `/category/${c.slug}`),
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
