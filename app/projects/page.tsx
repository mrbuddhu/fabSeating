import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { getProjects } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'
import { AnimatedCard } from '@/components/AnimatedCard'
import { ResponsiveImage } from '@/components/ResponsiveImage'

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: 'Gallery',
  description: 'A visual gallery of Fab Seating furniture, furnishings and completed projects.',
  path: '/projects',
})

function galleryImages(dirs: string[]) {
  const out: string[] = []
  for (const dir of dirs) {
    try {
      for (const f of fs.readdirSync(path.join(process.cwd(), 'public', 'images', dir))) {
        if (/\.(png|jpe?g|webp|avif)$/i.test(f)) out.push(`/images/${dir}/${f}`)
      }
    } catch {}
  }
  return out
}

export default async function GalleryPage() {
  const projects = await getProjects()
  const images = galleryImages([
    'gallery/case-study-murugan-kilpauk',
    'gallery/case-study-kothari-nungambakkam',
    'gallery',
  ])

  return (
    <>
      <PageHero title="Gallery" subtitle="A visual collection of our work across homes and commercial spaces" />
      <Section>
        {/* Sanity-managed projects (if any) */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projects.map((project, index) => (
              <AnimatedCard key={project._id} index={index}>
                <Link href={`/case-studies/${project.slug.current}`} className="group relative block aspect-square overflow-hidden rounded-xl bg-gray-100">
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

        {/* Photo gallery (masonry) */}
        {images.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
            {images.map((src, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 break-inside-avoid group">
                <Image
                  src={src}
                  alt={`Fab Seating gallery ${i + 1}`}
                  width={800}
                  height={1000}
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          projects.length === 0 && (
            <div className="text-center py-12"><p className="text-xl text-primary-600">Gallery coming soon.</p></div>
          )
        )}
      </Section>
    </>
  )
}
