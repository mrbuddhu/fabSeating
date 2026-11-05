import { Metadata } from 'next'
import { CataloguesView, type CatalogueCard } from '@/components/CataloguesView'
import { generateSEOMetadata } from '@/components/SEOHead'
import { urlFor } from '@/lib/sanity/client'
import { getCatalogs } from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = generateSEOMetadata({
  title: 'Fab Seating Catalogues | Furniture & Furnishings',
  description: 'Explore Fab Seating catalogues for sofas, furniture, curtains, blinds, and furnishings. Discover designs and enquire about options for your space.',
  path: '/catalogues',
})

function fileNameFor(title: string, original?: string | null) {
  if (original && original.toLowerCase().endsWith('.pdf')) return original
  const slug = title.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'Catalogue'
  return `Fab-Seating-${slug}.pdf`
}

export default async function CataloguesPage() {
  const catalogs = await getCatalogs()
  const catalogues: CatalogueCard[] = (catalogs || []).map((item) => ({
    id: item._id,
    title: item.title,
    eyebrow: item.eyebrow?.trim() || undefined,
    description: item.description?.trim() || undefined,
    coverUrl: item.coverImage ? urlFor(item.coverImage)?.width(1200).height(900).url() : undefined,
    alt: item.coverImage?.alt || item.title,
    fileUrl: item.fileUrl || undefined,
    downloadName: fileNameFor(item.title, item.fileName),
  }))

  return <CataloguesView catalogues={catalogues} />
}
