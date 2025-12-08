import { Section } from './Section'

interface BrandStripProps {
  title?: string
  brands: string[]
}

export function BrandStrip({ title = 'Brands we work with', brands }: BrandStripProps) {
  if (brands.length === 0) return null

  return (
    <Section className="bg-primary-50">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">
          {title}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-primary-900">
          {brands.map((brand) => (
            <span
              key={brand}
              className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-primary-500" />
              {brand}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}

