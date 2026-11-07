import type { Metadata } from 'next'
import { generateSEOMetadata } from '@/components/SEOHead'
import { getSiteSettings, type PageSeoOverride } from '@/lib/sanity/queries'

export async function metadataForPath(path: string, title: string, description: string, seo?: PageSeoOverride | null): Promise<Metadata> {
  const settings = await getSiteSettings()
  const fromSettings = settings.pageSeo.find((item) => item.path === path)
  const chosen = seo?.title || seo?.description || seo?.image ? seo : fromSettings
  return generateSEOMetadata({
    seo: chosen || undefined,
    title,
    description,
    path,
  })
}
