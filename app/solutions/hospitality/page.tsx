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
  const page = await getSolutionPage('hospitality')
  if (!page) {
    return generateSEOMetadata({
      title: 'Hospitality Furniture and Furnishings',
      description: 'Durable and stylish furniture and furnishings solutions for hospitality spaces',
      path: '/solutions/hospitality',
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

export default async function HospitalityPage() {
  const page = await getSolutionPage('hospitality')

  const defaultContent = {
    title: 'Hospitality Furniture and Furnishings',
    subtitle: 'Creating memorable guest experiences through thoughtful design',
    introText: 'Elevate your hospitality space with our comprehensive furniture and furnishings solutions. We design durable, stylish, and guest-friendly environments for hotels, restaurants, cafes, and other hospitality venues.',
    furnitureItems: ['Hotel room furniture', 'Restaurant seating and tables', 'Lobby and reception furniture', 'Outdoor furniture', 'Bar and lounge furniture', 'Custom hospitality solutions'],
    furnishingsItems: ['Curtains and window treatments', 'Hospitality-grade carpets', 'Bedding and linens', 'Decorative accessories', 'Lighting solutions', 'Branded elements'],
    bestSuitedFor: 'Ideal for hotels, resorts, restaurants, cafes, bars, and event venues. Perfect for new hospitality projects, renovations, or brand refreshes. Our solutions are designed to withstand high traffic while maintaining aesthetic appeal and guest comfort.',
  }

  const content = page || defaultContent

  return (
    <>
      <PageHero
        title={content.title}
        subtitle={content.subtitle || 'Creating memorable guest experiences through thoughtful design'}
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
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
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
              href="/projects?category=hospitality"
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
