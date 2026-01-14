import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { generateSEOMetadata } from '@/components/SEOHead'
import Link from 'next/link'
import Image from 'next/image'
import { getSolutionPage } from '@/lib/sanity/queries'
import { ResponsiveImage } from '@/components/ResponsiveImage'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSolutionPage('office')
  const defaultTitle = 'Office Furniture and Furnishings'
  const defaultDescription = 'Professional furniture and furnishings solutions for office spaces'
  
  if (!page) {
    return generateSEOMetadata({
      title: defaultTitle,
      description: defaultDescription,
      path: '/solutions/office',
    })
  }
  return page.seo ? generateSEOMetadata({
    seo: page.seo,
    title: defaultTitle,
    description: defaultDescription,
    image: page.heroImage,
    path: '/solutions/office',
  }) : generateSEOMetadata({
    title: defaultTitle,
    description: defaultDescription,
    path: '/solutions/office',
  })
}

const furnitureIcons: Record<string, string> = {}
const furnishingsIcons: Record<string, string> = {}

export default async function OfficePage() {
  const page = await getSolutionPage('office')

  const content = {
    title: 'Office Furniture and Furnishings',
    subtitle: 'Designing productive and inspiring work environments',
    introText: 'Create efficient and professional office spaces with our comprehensive office furniture and furnishings solutions. We design work environments that enhance productivity, comfort, and employee well-being.',
    furnitureItems: ['Desks and workstations', 'Office chairs and seating', 'Conference room furniture', 'Reception area furniture', 'Storage and filing solutions', 'Modular office systems'],
    furnishingsItems: ['Window treatments', 'Office carpets and rugs', 'Partition screens', 'Decorative elements', 'Lighting solutions', 'Accessories and accents'],
    bestSuitedFor: 'Perfect for corporate offices, co-working spaces, startups, and professional service firms. Ideal for new office setups, expansions, or workspace renovations. Our solutions scale from small teams to large corporate environments.',
  }

  return (
    <>
      <PageHero
        title={content.title}
        subtitle={content.subtitle || 'Designing productive and inspiring work environments'}
        contentClassName="max-w-6xl"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] md:whitespace-nowrap"
      />
      <Section>
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero gallery: three office images from Sanity where available */}
          <div className="space-y-6">
            <div className="grid gap-4 md:gap-6 md:grid-cols-3">
              {[
                page?.galleryImages?.[0] || page?.heroImage,
                page?.galleryImages?.[1] || page?.secondaryImage || page?.heroImage,
                page?.galleryImages?.[2] || page?.heroImage || page?.secondaryImage,
              ].map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] md:aspect-[3/4] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:ring-primary-300/40"
                >
                  {image ? (
                    <ResponsiveImage
                      image={image}
                      alt={content.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <Image
                      src="https://images.unsplash.com/photo-1524758631624-e2822e304a36?auto=format&fit=crop&w=1200&q=80"
                      alt={content.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-lg text-primary-700 leading-relaxed">
              {content.introText}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary-50/50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-950 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-primary-950">Furniture Includes</h2>
              </div>
              <ul className="space-y-3">
                {content.furnitureItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-primary-700">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-50/50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-950 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-primary-950">Furnishings Includes</h2>
              </div>
              <ul className="space-y-3">
                {content.furnishingsItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-primary-700">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
              {page?.secondaryImage ? (
                <ResponsiveImage
                  image={page.secondaryImage}
                  alt={content.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009c2f1deba7?auto=format&fit=crop&w=1200&q=80"
                  alt={content.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-primary-950">Best Suited For</h2>
              </div>
              <p className="text-primary-700 leading-relaxed">
                {content.bestSuitedFor}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-950 text-white font-medium rounded-full hover:bg-primary-900 transition-all duration-300 hover:gap-3 shadow-lg hover:-translate-y-1 hover:shadow-2xl group"
            >
              <span className="text-sm tracking-wider uppercase">Talk to Us</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/projects?category=office"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary-950 text-primary-950 font-medium rounded-full hover:bg-primary-950 hover:text-white transition-all duration-300 hover:gap-3 group"
            >
              <span className="text-sm tracking-wider uppercase">Explore Gallery</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
