import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getSiteSections } from '@/lib/siteSections'
import { generateSEOMetadata } from '@/components/SEOHead'
import { getCategoryLanding, getProductImagesByCategory } from '@/lib/sanity/queries'
import { buildCategoryLanding } from '@/lib/categoryLandingContent'
import { CategoryLandingView } from '@/components/CategoryLandingView'

export const revalidate = 300

export async function generateStaticParams() {
  const { categories } = await getSiteSections()
  return categories.map((category) => ({ slug: category.slug }))
}

async function loadCategory(slug: string) {
  const { categories } = await getSiteSections()
  const category = categories.find((item) => item.slug === slug)
  if (!category) return null
  const [doc, products] = await Promise.all([
    getCategoryLanding(category.slug),
    getProductImagesByCategory(category.productCategorySlugs),
  ])
  return buildCategoryLanding({
    slug: category.slug,
    title: category.title,
    blurb: category.blurb,
    cover: category.cover,
    doc,
    products,
    others: categories
      .filter((item) => item.slug !== category.slug)
      .map((item) => ({ slug: item.slug, title: item.title, cover: item.cover })),
  })
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { categories } = await getSiteSections()
  const category = categories.find((item) => item.slug === params.slug)
  if (!category) return {}
  const doc = await getCategoryLanding(category.slug)
  const model = buildCategoryLanding({
    slug: category.slug,
    title: category.title,
    blurb: category.blurb,
    cover: category.cover,
    doc,
    products: [],
    others: [],
  })
  return generateSEOMetadata({
    seo: model.seo,
    title: model.seoTitle,
    description: model.seoDescription,
    path: `/category/${category.slug}`,
  })
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const model = await loadCategory(params.slug)
  if (!model) notFound()
  return <CategoryLandingView model={model} />
}
