import { MetadataRoute } from 'next'
import { getSitemapData } from '@/lib/sanity/queries'
import { getSiteSections } from '@/lib/siteSections'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabseating.com'
  const [data, sections] = await Promise.all([getSitemapData(), getSiteSections()])

  const routes = [
    '',
    '/projects',
    '/contact',
    '/custom-bespoke',
    '/solutions/residential',
    '/solutions/office',
    '/solutions/hospitality',
    ...sections.categories.map((c) => `/category/${c.slug}`),
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
