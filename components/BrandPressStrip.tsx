import { Section } from './Section'

const logos = [
  'Molteni',
  'Herman Miller',
  'Fenix',
  'Formica',
  'Hettich',
  'Daikin',
]

export function BrandPressStrip() {
  return (
    <Section className="bg-primary-950 text-primary-50" containerSize="2xl">
      <div className="text-center mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-200">Trusted by leading brands</h3>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {logos.map((logo) => (
          <span
            key={logo}
            className="inline-flex items-center justify-center rounded-full border border-primary-800 bg-primary-900 px-4 py-2 text-sm font-semibold text-primary-100 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            {logo}
          </span>
        ))}
      </div>
    </Section>
  )
}

