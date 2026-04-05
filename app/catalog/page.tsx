import { Metadata } from 'next'
import { Section } from '@/components/Section'
import { PageHero } from '@/components/PageHero'
import { MediaCard } from '@/components/MediaCard'
import { SkeletonCard } from '@/components/SkeletonCard'
import { getCatalogs } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'
import { urlFor } from '@/lib/sanity/client'

// Revalidate often so new/updated catalogs appear soon after publish
export const revalidate = 60

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
        className="pb-6 md:pb-8"
        contentClassName="max-w-6xl"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-3 md:mb-4"
      />
      <Section className="pt-2 pb-12 md:pt-4 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {catalogs && catalogs.length > 0 ? (
              catalogs.map((item) => {
                const coverUrl = item.coverImage ? urlFor(item.coverImage)?.width(1600).url() : null
                return (
                  <MediaCard
                    key={item._id}
                    variant="catalog"
                    media={{
                      type: 'image',
                      src: coverUrl || '/logo.png',
                      alt: item.title,
                      title: item.title,
                      description: item.description ?? undefined,
                      ctaText: item.fileUrl ? 'Download' : 'Coming soon',
                      ctaLink: item.fileUrl || '#',
                      download: !!item.fileUrl,
                      intrinsicWidth: item.coverDimensions?.width,
                      intrinsicHeight: item.coverDimensions?.height,
                    }}
                  />
                )
              })
            ) : (
              [1, 2, 3].map((i) => (
                <SkeletonCard key={i} variant="catalog" />
              ))
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
