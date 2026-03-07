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
  const page = await getSolutionPage('residential')
  const defaultTitle = 'Residential Furniture and Furnishings'
  const defaultDescription = 'Premium furniture and furnishings solutions for residential spaces'
  
  if (!page) {
    return generateSEOMetadata({
      title: defaultTitle,
      description: defaultDescription,
      path: '/solutions/residential',
    })
  }
  return page.seo ? generateSEOMetadata({
    seo: page.seo,
    title: defaultTitle,
    description: defaultDescription,
    image: page.heroImage,
    path: '/solutions/residential',
  }) : generateSEOMetadata({
    title: defaultTitle,
    description: defaultDescription,
    path: '/solutions/residential',
  })
}

const furnitureIcons: Record<string, string> = {}
const furnishingsIcons: Record<string, string> = {}

export default async function ResidentialPage() {
  const page = await getSolutionPage('residential')

  // Fallback content if no Sanity data exists
  const fallbackContent = {
    emoji: '🏠',
    title: 'RESIDENTIAL',
    subtitle: 'Designed around how your family lives, gathers, rests, and grows.',
    tagline: 'A home isn\'t built with furniture. It\'s shaped by how every piece works together.',
    introText: 'At Fab Seating, we create integrated residential environments — where sofas, storage, fabrics, lighting, and finishes are thoughtfully curated to function beautifully and last for years.',
    imageOptions: [
      'https://images.unsplash.com/photo-1556911220-bff31c812d0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    whatWeDesign: [
      'Living spaces that invite conversation',
      'Bedrooms built for comfort and quiet',
      'Dining areas that bring families together',
      'Smart storage that keeps spaces uncluttered',
      'Home offices that feel focused yet warm',
      'Custom-built solutions tailored to your layout'
    ],
    whyChooseUs: [
      '20+ years of craftsmanship',
      'Made-to-measure customization',
      'Premium materials built for Indian conditions',
      'Complete furniture + furnishing integration',
      'End-to-end guidance from concept to installation'
    ],
    approach: [
      'Understand your space and usage',
      'Concept development and layout planning',
      'Material selection and customization',
      'Production and quality control',
      'Installation and final styling'
    ],
    bestSuitedFor: 'Perfect for homeowners seeking cohesive, well-designed living spaces. Ideal for new homes, renovations, or room-by-room updates across apartments, villas, and independent houses.',
  }

  // Use Sanity data if available, otherwise use fallback
  const content = {
    title: `${page?.emoji || fallbackContent.emoji} ${page?.title || fallbackContent.title}`,
    subtitle: page?.subtitle || fallbackContent.subtitle,
    tagline: page?.tagline || fallbackContent.tagline,
    introText: page?.introText || fallbackContent.introText,
    imageOptions: (page?.galleryImages && page.galleryImages.length > 0) ? [] : fallbackContent.imageOptions,
    whatWeDesign: page?.whatWeDesign || fallbackContent.whatWeDesign,
    whyChooseUs: page?.whyChooseUs || fallbackContent.whyChooseUs,
    approach: page?.approach || fallbackContent.approach,
    bestSuitedFor: page?.bestSuitedFor || fallbackContent.bestSuitedFor,
  }

  return (
    <>
      <PageHero
        title={content.title}
        subtitle={content.subtitle}
        contentClassName="max-w-6xl"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
      />
      <Section>
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero gallery */}
          <div className="space-y-8">
            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              {[
                page?.galleryImages?.[0] || page?.heroImage || content.imageOptions[0],
                page?.galleryImages?.[1] || page?.secondaryImage || page?.heroImage || content.imageOptions[1],
                page?.galleryImages?.[2] || page?.heroImage || page?.secondaryImage || content.imageOptions[2],
              ].map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] md:aspect-[3/4] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:ring-primary-300/40"
                >
                  {typeof image === 'string' ? (
                    <Image
                      src={image}
                      alt={`${content.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <ResponsiveImage
                      image={image}
                      alt={`${content.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center space-y-4">
              <p className="text-xl text-primary-700 leading-relaxed max-w-4xl mx-auto">
                {content.tagline}
              </p>
              <p className="text-lg text-primary-600 leading-relaxed max-w-4xl mx-auto">
                {content.introText}
              </p>
            </div>
          </div>

          {/* What We Design */}
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-primary-950 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h2 className="font-serif text-3xl font-bold text-primary-950">What We Design For Homes</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {content.whatWeDesign.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-primary-950"></div>
                  <span className="text-primary-800 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-br from-primary-950 to-primary-900 rounded-3xl p-8 md:p-12 shadow-xl text-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="font-serif text-3xl font-bold">Why Homeowners Choose Fab Seating</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {content.whyChooseUs.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Our Approach */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
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
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="font-serif text-3xl font-bold text-primary-950">Our Approach</h2>
              </div>
              <div className="space-y-3">
                {content.approach.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-950 text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-primary-700 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary-100 to-primary-50 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-950 mb-4">
              Ready to Transform Your Home?
            </h2>
            <p className="text-lg text-primary-700 mb-8 max-w-2xl mx-auto">
              {content.bestSuitedFor}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-950 text-white font-medium rounded-full hover:bg-primary-900 transition-all duration-300 hover:gap-3 shadow-lg hover:-translate-y-1 hover:shadow-2xl group"
              >
                <span className="text-sm tracking-wider uppercase">Start Your Project</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/projects?category=residential"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary-950 text-primary-950 font-medium rounded-full hover:bg-primary-950 hover:text-white transition-all duration-300 hover:gap-3 group"
              >
                <span className="text-sm tracking-wider uppercase">View Homes</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

