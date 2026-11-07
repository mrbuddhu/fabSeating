import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { getMainGalleryImages, getGalleryProducts, getGalleryPage } from '@/lib/sanity/queries'
import { metadataForPath } from '@/lib/pageMetadata'
import { GalleryGrid, type GalleryFilterOption } from '@/components/GalleryGrid'
import { getSiteSections } from '@/lib/siteSections'
import { urlFor } from '@/lib/sanity/client'

const GALLERY_FILTERS = [
  'sofas',
  'dining-furniture',
  'chairs-recliners',
  'beds-mattresses',
  'office-furniture',
  'carpets-rugs',
  'wardrobes',
  'curtains-blinds',
]

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const gallery = await getGalleryPage()
  return metadataForPath(
    '/projects',
    gallery?.title || 'Gallery',
    gallery?.subtitle || 'A visual gallery of Fab Seating furniture, furnishings and completed projects.',
  )
}

export default async function GalleryPage() {
  const [gallery, images, products, sections] = await Promise.all([
    getGalleryPage(),
    getMainGalleryImages(),
    getGalleryProducts(),
    getSiteSections(),
  ])
  const filters: GalleryFilterOption[] = GALLERY_FILTERS.flatMap((slug) => {
    const category = sections.categories.find((item) => item.slug === slug)
    return category ? [{ id: category.slug, label: category.title }] : []
  })
  const labelFor = (ids: string[]) =>
    ids.map((id) => filters.find((filter) => filter.id === id)?.label || id).join(' · ')
  const groupsFor = (productSlug?: string) => {
    if (!productSlug) return []
    return filters.filter((filter) => {
      const category = sections.categories.find((item) => item.slug === filter.id)
      return category?.slug === productSlug || category?.productCategorySlugs.includes(productSlug)
    })
  }
  const chosen = (gallery?.photos || []).flatMap((photo) => {
    const src = photo.image ? urlFor(photo.image)?.width(1600).auto('format').url() : undefined
    if (!src) return []
    const categories = (photo.filters || []).filter((id) => filters.some((filter) => filter.id === id))
    const alt = photo.title?.trim() || 'Fab Seating gallery'
    return [{
      id: photo._key,
      src,
      alt,
      description: photo.text?.trim() || undefined,
      categories,
      categoryLabel: labelFor(categories),
    }]
  })
  const photos = [
    ...chosen,
    ...(gallery?.includeProducts === false ? [] : products.flatMap((product) => {
      if (!product.src) return []
      const groups = groupsFor(product.categorySlug)
      return [{
        id: product.id,
        src: product.src,
        alt: product.title,
        description: product.description,
        images: product.images,
        categories: groups.map((group) => group.id),
        categoryLabel: groups.map((group) => group.label).join(' · '),
      }]
    })),
    ...(chosen.length > 0 ? [] : images.flatMap((image, i) => {
      const src = urlFor(image)?.width(1600).auto('format').url()
      if (!src) return []
      const alt = image.alt || `Fab Seating gallery ${i + 1}`
      const groups = groupsFor(image.categorySlug)
      return [{
        id: image._key || `${image.asset?._ref}-${i}`,
        src,
        alt,
        description: image.caption || alt,
        categories: groups.map((group) => group.id),
        categoryLabel: groups.map((group) => group.label).join(' · ') || image.categoryTitle,
      }]
    })),
  ]
  const title = gallery?.title || 'Gallery'
  const intro = gallery?.subtitle || 'A visual collection of our work across homes and commercial spaces'

  return (
    <>
      <PageHero title={title} />
      <Section className="pt-3 md:pt-4">
        <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-relaxed text-primary-800 md:text-lg">{intro}</p>
        {photos.length > 0 ? (
          <GalleryGrid photos={photos} filters={filters} />
        ) : (
          <div className="text-center py-12"><p className="text-xl text-primary-600">Gallery coming soon.</p></div>
        )}
      </Section>
    </>
  )
}
