import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { generateSEOMetadata } from '@/components/SEOHead'
import Link from 'next/link'
import Image from 'next/image'
import { getSolutionPage } from '@/lib/sanity/queries'
import { ResponsiveImage } from '@/components/ResponsiveImage'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSolutionPage('residential')
  if (!page) {
    return generateSEOMetadata({
      title: 'Residential Furniture and Furnishings',
      description: 'Premium furniture and furnishings solutions for residential spaces',
      path: '/solutions/residential',
    })
  }
  return page.seo ? generateSEOMetadata({
    seo: page.seo,
    title: page.title,
    description: page.subtitle || page.introText,
    image: page.heroImage,
    path: `/solutions/${page.type}`,
  }) : generateSEOMetadata({
    title: page.title,
    description: page.subtitle || page.introText,
    path: `/solutions/${page.type}`,
  })
}

const furnitureIcons: Record<string, string> = {}
const furnishingsIcons: Record<string, string> = {}

export default async function ResidentialPage() {
  const page = await getSolutionPage('residential')

  const defaultContent = {
    title: 'Residential Furniture and Furnishings',
    subtitle: 'Creating comfortable and elegant living spaces',
    introText: 'Transform your home with our comprehensive residential furniture and furnishings solutions. We design and curate pieces that combine comfort, style, and durability for every room in your home.',
    furnitureItems: ['Sofas and seating', 'Dining tables and chairs', 'Bedroom furniture', 'Storage solutions', 'Home office furniture', 'Custom built-ins'],
    furnishingsItems: ['Curtains and drapes', 'Rugs and carpets', 'Bedding and linens', 'Decorative cushions', 'Window treatments', 'Accessories and accents'],
    bestSuitedFor: 'Ideal for homeowners looking to create cohesive, well-designed living spaces. Perfect for new homes, renovations, or room-by-room updates. Our solutions work for apartments, villas, and independent houses.',
  }

  const content = page || defaultContent

  return (
    <>
      <PageHero
        title={content.title}
        subtitle={content.subtitle || 'Creating comfortable and elegant living spaces'}
      />
      <Section>
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-primary-700 leading-relaxed">
                {content.introText}
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              {page?.heroImage ? (
                <ResponsiveImage
                  image={page.heroImage}
                  alt={content.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src="https://images.unsplash.com/photo-1556911220-bff31c812d0c?auto=format&fit=crop&w=1200&q=80"
                  alt={content.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary-50/50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-950 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3v5c0 1.1.9 2 2 2h1c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2h1c1.1 0 2-.9 2-2v-5c0-1.66-1.34-3-3-3z" />
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
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
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
              href="/projects?category=residential"
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

