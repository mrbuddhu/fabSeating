import { Section } from './Section'
import { ResponsiveImage } from './ResponsiveImage'
import type { ProductCategory } from '@/types'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Sofas': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2H4m16 0v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4" />
    </svg>
  ),
  'Chairs': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 13a3.5 3.5 0 00-3.5-3.5h-4a3.5 3.5 0 00-3.5 3.5v6a1.5 1.5 0 001.5 1.5h10a1.5 1.5 0 001.5-1.5v-6zM7 13V5a1 1 0 011-1h4a1 1 0 011 1v8" />
    </svg>
  ),
  'Tables': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M5 10v10m14-10v10M8 10V6a2 2 0 012-2h4a2 2 0 012 2v4" />
    </svg>
  ),
  'Beds': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 9.5V19m14-9.5V19m-14-6h14m-14 0V5a1 1 0 011-1h12a1 1 0 011 1v8.5" />
    </svg>
  ),
  'Storage': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  ),
  'Outdoor': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  'Office': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  'Lighting': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548 5.478a1 1 0 01-.994.9h-4.345a1 1 0 01-.994-.9L8.828 15.571z" />
    </svg>
  ),
}

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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {categories.map((category) => {
          const icon = CATEGORY_ICONS[category.title]
          
          return (
            <div
              key={category._id}
              className="group flex flex-col items-center text-center p-6 rounded-2xl bg-primary-50/50 hover:bg-primary-100 transition-all duration-300"
            >
              <div className="mb-4 text-primary-600 group-hover:text-primary-800 transition-colors duration-300 transform group-hover:scale-110">
                {icon ? (
                  icon
                ) : (
                  <div className="relative w-12 h-12 overflow-hidden rounded-full bg-primary-200">
                    {category.image && (
                      <ResponsiveImage
                        image={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                )}
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                {category.title}
              </h3>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

