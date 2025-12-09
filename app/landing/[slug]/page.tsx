import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLandingPageBySlug } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'
import { HomeHero } from '@/components/HomeHero'
import { Section } from '@/components/Section'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { TestimonialCard } from '@/components/TestimonialCard'
import { FAQAccordion } from '@/components/FAQAccordion'
import { CTA } from '@/components/CTA'
import type { LandingPageSection } from '@/types'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = await getLandingPageBySlug(params.slug)
  if (!page) return {}

  return generateSEOMetadata({
    seo: page.seo,
    title: page.title,
    path: `/landing/${params.slug}`,
  })
}

function renderSection(section: LandingPageSection) {
  switch (section._type) {
    case 'hero':
      return (
        <HomeHero
          data={section}
          headline={section.title || 'Crafting Comfort, Elevating Spaces'}
          subheadline={section.subtitle || 'Premium furniture, custom crafted for your space.'}
          trustIndicators={[
            '21+ Years Experience',
            '1000+ Projects',
            '1000+ Happy Clients',
          ]}
          brands={['Molteni', 'Herman Miller', 'Fenix']}
          heroVideos={[]}
        />
      )
    
    case 'features':
      return (
        <Section>
          <div className="mb-12 text-center">
            {section.title && (
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">{section.title}</h2>
            )}
          </div>
          {section.items && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {section.items.map((item, index) => (
                <div key={index} className="text-center">
                  <h3 className="font-serif text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-primary-700 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </Section>
      )
    
    case 'textWithImage':
      return (
        <Section>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            section.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
          }`}>
            <div className={section.imagePosition === 'right' ? 'lg:order-2' : ''}>
              {section.title && (
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">{section.title}</h2>
              )}
              {section.content && (
                <div className="prose prose-lg max-w-none text-primary-700 leading-relaxed">
                  <p>{section.content}</p>
                </div>
              )}
            </div>
            {section.image && (
              <div className={`relative aspect-[4/3] bg-primary-100 ${
                section.imagePosition === 'right' ? 'lg:order-1' : ''
              }`}>
                <ResponsiveImage image={section.image} alt={section.title || ''} fill />
              </div>
            )}
          </div>
        </Section>
      )
    
    case 'testimonials':
      return (
        <Section>
          {section.title && (
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">{section.title}</h2>
            </div>
          )}
          {section.testimonials && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {section.testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial._id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </Section>
      )
    
    case 'faq':
      return (
        <Section>
          {section.title && (
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">{section.title}</h2>
            </div>
          )}
          {section.faqs && (
            <div className="max-w-3xl mx-auto">
              <FAQAccordion faqs={section.faqs} />
            </div>
          )}
        </Section>
      )
    
    case 'cta':
      return <CTA data={section} />
    
    default:
      return null
  }
}

export default async function LandingPage({ params }: { params: { slug: string } }) {
  const page = await getLandingPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <>
      {page.sections?.map((section, index) => (
        <div key={index}>{renderSection(section)}</div>
      ))}
    </>
  )
}

