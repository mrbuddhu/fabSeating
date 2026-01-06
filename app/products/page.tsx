import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { ProductCard } from '@/components/ProductCard'
import { getProducts, getProductCategories } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: 'Products',
  description: 'Browse our premium furniture collection',
  path: '/products',
})

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ])

  return (
    <>
      <PageHero
        title="Our Products"
        subtitle="Discover premium furniture crafted with excellence"
      />
      <Section>
        {/* View Gallery CTA */}
        <div className="mb-12 text-center">
          <a
            href="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-950 text-white font-medium rounded-full hover:bg-primary-900 transition-all duration-300 hover:gap-5 shadow-lg hover:-translate-y-1 hover:shadow-2xl group"
          >
            <span className="text-sm tracking-wider uppercase">View Gallery</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
        {categories.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-4">
            <a
              href="/products"
              className="px-6 py-2 border border-primary-300 hover:border-primary-950 hover:bg-primary-950 hover:text-primary-50 transition-colors"
            >
              All
            </a>
            {categories.map((category) => (
              <a
                key={category._id}
                href={`/products?category=${category.slug.current}`}
                className="px-6 py-2 border border-primary-300 hover:border-primary-950 hover:bg-primary-950 hover:text-primary-50 transition-colors"
              >
                {category.title}
              </a>
            ))}
          </div>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-primary-700 py-12">
            No products available at the moment.
          </p>
        )}
      </Section>
    </>
  )
}

