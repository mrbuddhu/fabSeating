import Link from 'next/link'
import { ResponsiveImage } from './ResponsiveImage'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug.current}`}
      className={cn('group block', className)}
    >
      <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-primary-100">
        {product.images && product.images[0] && (
          <ResponsiveImage
            image={product.images[0]}
            alt={product.title}
            fill
            className="transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div>
        <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary-700 transition-colors">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-sm text-primary-600 line-clamp-2 mb-2">
            {product.description}
          </p>
        )}
        {product.price && (
          <p className="text-lg font-medium text-primary-950">
            ${product.price.toLocaleString()}
          </p>
        )}
      </div>
    </Link>
  )
}

