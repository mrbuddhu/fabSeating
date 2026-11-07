import { Metadata } from 'next'
import { CataloguesView, type CatalogueCard } from '@/components/CataloguesView'
import { defaultCatalogueCopy, type CataloguePageCopy } from '@/lib/cataloguePageCopy'
import { urlFor } from '@/lib/sanity/client'
import { getCatalogs, getSiteSettings } from '@/lib/sanity/queries'
import { filled, waLink } from '@/lib/siteContent'
import { metadataForPath } from '@/lib/pageMetadata'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return metadataForPath(
    '/catalogues',
    'Fab Seating Catalogues | Furniture & Furnishings',
    'Explore Fab Seating catalogues for sofas, furniture, curtains, blinds, and furnishings. Discover designs and enquire about options for your space.',
  )
}

function fileNameFor(title: string, original?: string | null) {
  if (original && original.toLowerCase().endsWith('.pdf')) return original
  const slug = title.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'Catalogue'
  return `Fab-Seating-${slug}.pdf`
}

export default async function CataloguesPage() {
  const [catalogs, settings] = await Promise.all([getCatalogs(), getSiteSettings()])
  const source = settings.cataloguesPage || {}
  const copy: CataloguePageCopy = {
    eyebrow: filled(source.eyebrow, defaultCatalogueCopy.eyebrow),
    title: filled(source.title, defaultCatalogueCopy.title),
    description: filled(source.description, defaultCatalogueCopy.description),
    exploreLabel: filled(source.exploreLabel, defaultCatalogueCopy.exploreLabel),
    sectionTitle: filled(source.sectionTitle, defaultCatalogueCopy.sectionTitle),
    sectionDescription: filled(source.sectionDescription, defaultCatalogueCopy.sectionDescription),
    helpTitle: filled(source.helpTitle, defaultCatalogueCopy.helpTitle),
    helpBody: filled(source.helpBody, defaultCatalogueCopy.helpBody),
    helpButton: filled(source.helpButton, defaultCatalogueCopy.helpButton),
    visitTitle: filled(source.visitTitle, defaultCatalogueCopy.visitTitle),
    visitBody: filled(source.visitBody, defaultCatalogueCopy.visitBody),
    directionsLabel: filled(source.directionsLabel, defaultCatalogueCopy.directionsLabel),
    contactLabel: filled(source.contactLabel, defaultCatalogueCopy.contactLabel),
    enquireHref: waLink("Hi Fab Seating, I've been exploring your catalogues and would like to know more about your furniture and furnishing options.", settings.contact.whatsapp),
    mapsUrl: settings.contact.mapsUrl,
  }
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

  return <CataloguesView catalogues={catalogues} copy={copy} />
}
