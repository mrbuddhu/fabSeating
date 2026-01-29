import { Metadata } from 'next'
import { Section } from '@/components/Section'
import { PageHero } from '@/components/PageHero'
import { MediaCard } from '@/components/MediaCard'
import { getCatalogs } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'
import { urlFor } from '@/lib/sanity/client'

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: 'Catalog',
  description: 'Browse and download our catalogs',
  path: '/catalog',
})

export default async function CatalogPage() {
  const catalogs = await getCatalogs()

  return (
    <>
      <PageHero
        title="Catalog"
        subtitle="Browse and download our catalogs"
        contentClassName="max-w-6xl"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
      />
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {catalogs.map((item) => (
              <MediaCard
                key={item._id}
                media={{
                  type: 'image',
                  src: urlFor(item.coverImage)?.width(1200).height(675).url() || '/logo.png',
                  alt: item.title,
                  title: item.title,
                  description: item.description,
                  ctaText: 'Download',
                  ctaLink: item.fileUrl,
                  download: true,
                }}
              />
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
