import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { generateSEOMetadata } from '@/components/SEOHead'
import { waLink } from '@/lib/siteContent'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Custom & Bespoke Furniture',
  description: 'Tailored furniture solutions designed specifically for your space and style. From one-of-a-kind sofas to fully bespoke dining, bedroom, and statement pieces.',
  path: '/custom-bespoke',
})

export default function CustomBespokePage() {
  return (
    <>
      <PageHero
        title="Custom & Bespoke Solutions"
        subtitle="Tailored furniture solutions designed specifically for your space and style."
      />
      <Section className="pt-0">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-700">Bespoke Craftsmanship</span>
          </div>
          <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed text-center">
            <p>At Fabseating, furniture doesn&apos;t start with a template. It starts with your space.</p>
            <p>Dimensions, comfort, upholstery, wood, finishes &mdash; every detail is designed, refined, and crafted specifically for you.</p>
            <p>From one-of-a-kind sofas to fully bespoke dining, bedroom, and statement pieces, we build furniture that fits perfectly, looks intentional, and lasts for years.</p>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { t: 'Made to your space', d: 'Every dimension planned around your room and layout.' },
              { t: 'Your materials', d: 'Choose upholstery, wood, finishes and colours.' },
              { t: 'Built to last', d: 'Premium construction designed for years of use.' },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm text-center">
                <h3 className="font-serif text-lg font-semibold text-primary-950 mb-2">{f.t}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href={waLink('Hi Fab Seating, I would like a custom quote for a bespoke piece.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-primary-950 px-8 py-4 text-white font-semibold text-sm shadow-lg hover:bg-primary-900 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              <span className="tracking-wider uppercase">Get a Custom Quote</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
