import { Section } from './Section'
import { ResponsiveImage } from './ResponsiveImage'
import type { ProductCategory } from '@/types'

interface CategoriesSectionProps {
  categories?: ProductCategory[]
}

export function CategoriesSection({ categories = [] }: CategoriesSectionProps) {
  if (categories.length === 0) return null

  return (
    <Section>
      <div className="mb-12 text-center">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">Shop by Category</h2>
        <p className="text-primary-700 max-w-2xl mx-auto">
          Discover our curated collections designed for every space
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className="group block"
          >
            <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-primary-100">
              {category.image && (
                <ResponsiveImage
                  image={category.image}
                  alt={category.title}
                  fill
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <h3 className="font-serif text-xl font-semibold group-hover:text-primary-700 transition-colors">
              {category.title}
            </h3>
          </div>
        ))}
      </div>
    </Section>
  )
}

