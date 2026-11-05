import { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { getProjects, getMainGalleryImages } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'
import { AnimatedCard } from '@/components/AnimatedCard'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { GalleryGrid } from '@/components/GalleryGrid'
import { urlFor } from '@/lib/sanity/client'

export const revalidate = 300

export const metadata: Metadata = generateSEOMetadata({
  title: 'Gallery',
  description: 'A visual gallery of Fab Seating furniture, furnishings and completed projects.',
  path: '/projects',
})

export default async function GalleryPage() {
  const [projects, images] = await Promise.all([getProjects(), getMainGalleryImages()])

  return (
    <>
      <PageHero title="Gallery" subtitle="A visual collection of our work across homes and commercial spaces" />
      <Section className="pt-3 md:pt-4">
        {/* Sanity-managed projects (if any) */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projects.map((project, index) => (
              <AnimatedCard key={project._id} index={index}>
                <Link href={`/projects/${project.slug.current}`} className="group relative block aspect-square overflow-hidden rounded-xl bg-gray-100">
                  {project.images && project.images[0] ? (
                    <ResponsiveImage image={project.images[0]} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-200"><span className="text-gray-400">No Image</span></div>
                  )}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="font-serif text-2xl font-bold text-white">{project.title}</h3>
                    {(project.location || project.year) && (
                      <p className="mt-2 text-sm text-white/90">{[project.location, project.year].filter(Boolean).join(' — ')}</p>
                    )}
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        )}

        {/* Main Gallery photos from the published Sanity Homepage document */}
        {images.length > 0 ? (
          <GalleryGrid
            photos={images.flatMap((image, i) => {
              const src = urlFor(image)?.width(1400).auto('format').url()
              if (!src) return []
              const alt = image.alt || `Fab Seating gallery ${i + 1}`
              return [{
                id: image._key || `${image.asset?._ref}-${i}`,
                src,
                alt,
                description: image.caption || alt,
              }]
            })}
          />
        ) : (
          projects.length === 0 && (
            <div className="text-center py-12"><p className="text-xl text-primary-600">Gallery coming soon.</p></div>
          )
        )}
      </Section>
    </>
  )
}
