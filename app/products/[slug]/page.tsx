import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { EnquiryForm } from '@/components/EnquiryForm'
import { getProductBySlug, getProducts } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 3600

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug.current,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return {}

  return generateSEOMetadata({
    seo: product.seo,
    title: product.title,
    description: product.description,
    image: product.images?.[0],
    path: `/products/${params.slug}`,
  })
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.title },
        ]}
      />
      <PageHero title={product.title} subtitle={product.description} />
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            {product.images && product.images.length > 0 && (
              <div className="space-y-4">
                <div className="relative aspect-[4/3] bg-primary-100">
                  <ResponsiveImage
                    image={product.images[0]}
                    alt={product.title}
                    fill
                    priority
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="relative aspect-square bg-primary-100">
                        <ResponsiveImage image={image} alt={`${product.title} ${index + 2}`} fill />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            {product.category && (
              <p className="text-sm text-primary-600 uppercase tracking-wider mb-4">
                {product.category.title}
              </p>
            )}
            {product.price && (
              <p className="text-3xl font-bold mb-6">${product.price.toLocaleString()}</p>
            )}
            {product.description && (
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-primary-700 leading-relaxed">{product.description}</p>
              </div>
            )}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-8">
                <h3 className="font-serif text-xl font-semibold mb-4">Specifications</h3>
                <dl className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex border-b border-primary-200 pb-2">
                      <dt className="font-medium w-1/3">{spec.label}</dt>
                      <dd className="text-primary-700">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <EnquiryForm productId={product._id} originPage={`/products/${params.slug}`} />
          </div>
        </div>
      </Section>
    </>
  )
}

