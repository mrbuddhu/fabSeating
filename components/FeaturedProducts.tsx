import Link from 'next/link'
import { Section } from './Section'
import { ProductCard } from './ProductCard'
import { Reveal } from './Reveal'
import type { Product } from '@/types'

interface FeaturedProductsProps {
  products?: Product[]
}

export function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  if (products.length === 0) return null

  return (
    <Section className="bg-primary-100">
      <div className="mb-12 text-center">
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-primary-950 tracking-tight">Featured Products</h2>
        <p className="text-primary-700 max-w-2xl mx-auto text-lg md:text-xl">
          Handpicked selections from our premium collection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, 4).map((product) => (
          <Reveal key={product._id} delay={80}>
            <ProductCard product={product} />
          </Reveal>
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

