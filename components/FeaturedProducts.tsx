import Link from 'next/link'
import { Section } from './Section'
import { ProductCard } from './ProductCard'
import type { Product } from '@/types'

interface FeaturedProductsProps {
  products?: Product[]
}

export function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  if (products.length === 0) return null

  return (
    <Section className="bg-primary-100">
      <div className="mb-12 text-center">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">Featured Products</h2>
        <p className="text-primary-700 max-w-2xl mx-auto">
          Handpicked selections from our premium collection
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-block px-8 py-3 border-2 border-primary-950 text-primary-950 hover:bg-primary-950 hover:text-primary-50 transition-colors font-medium"
        >
          View All Products
        </Link>
      </div>
    </Section>
  )
}

