import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { GalleryFilter } from '@/components/GalleryFilter'
import { GalleryItem } from '@/components/GalleryItem'
import { getProducts, getProjects } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'
import { GalleryClient } from '@/components/GalleryClient'

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: 'Gallery',
  description: 'Comprehensive gallery showcasing our premium furniture and completed projects',
  path: '/gallery',
})

export default async function GalleryPage() {
  const [products, projects] = await Promise.all([
    getProducts(),
    getProjects(),
  ])

  // Collect all images from products and projects
  const galleryImages: Array<{
    id: string
    image: any
    title: string
    category: 'product' | 'project'
    link: string
  }> = []

  // Add product images
  products.forEach((product) => {
    if (product.images && product.images.length > 0) {
      product.images.forEach((image, index) => {
        galleryImages.push({
          id: `${product._id}-${index}`,
          image,
          title: product.title,
          category: 'product',
          link: `/products/${product.slug.current}`,
        })
      })
    }
  })

  // Add project images
  projects.forEach((project) => {
    if (project.images && project.images.length > 0) {
      project.images.forEach((image, index) => {
        galleryImages.push({
          id: `${project._id}-${index}`,
          image,
          title: project.title,
          category: 'project',
          link: `/projects/${project.slug.current}`,
        })
      })
    }
  })

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Comprehensive gallery showcasing our premium furniture and completed projects"
      />
      <Section>
        {galleryImages.length > 0 ? (
          <GalleryClient images={galleryImages} />
        ) : (
          <p className="text-center text-primary-700 py-12">
            No gallery images available at the moment.
          </p>
        )}
      </Section>
    </>
  )
}
