import { ResponsiveImage } from './ResponsiveImage'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div
      className={cn(
        'group block rounded-3xl bg-white p-4 shadow-[0_15px_45px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.24)] hover:ring-1 hover:ring-primary-200/80 hover:ring-offset-1 hover:ring-offset-white',
        className
      )}
    >
      <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-2xl bg-primary-100">
        {product.images && product.images[0] && (
          <ResponsiveImage
            image={product.images[0]}
            alt={product.title}
            fill
            className="transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="space-y-2">
        <h3 className="font-serif text-2xl font-bold group-hover:text-primary-800 transition-colors">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-base text-primary-700 line-clamp-2">
            {product.description}
          </p>
        )}
        {product.price && (
          <p className="text-xl font-semibold text-primary-950">
            ${product.price.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}

