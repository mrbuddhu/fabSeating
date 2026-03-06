import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { generateSEOMetadata } from '@/components/SEOHead'
import { AnimatedSection } from '@/components/AnimatedSection'
import { urlFor } from '@/lib/sanity/client'
import Image from 'next/image'

// Helper function to get image URL (works with both Sanity images and string URLs)
function getImageUrl(image: any) {
  if (!image) return null
  
  // If it's a Sanity image object
  if (image && typeof image === 'object' && image.asset) {
    return urlFor(image)?.width(1920).height(1080).url() || null
  }
  
  // If it's a string URL
  if (typeof image === 'string') {
    return image
  }
  
  return null
}

// Dummy case study data (ready for Sanity images)
const caseStudy = {
  _id: 'regal-home-kilpauk',
  title: 'A Regal Home Transformation in Kilpauk',
  subtitle: 'Complete Furniture & Furnishings for a 3-Storey Residence',
  client: 'Murugan',
  location: 'Kilpauk, Chennai',
  year: '2024',
  industry: 'residential',
  summary: 'Complete furniture and furnishings for a 3-storey residence featuring custom throne chairs and bespoke accent pieces.',
  // This will be replaced with Sanity image object when uploaded
  heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80',
  challenge: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: 'When Mr. Murugan approached us for his newly built three-storey home in Kilpauk, the goal was clear — create a space that felt grand, refined, and deeply personal. This wasn\'t just about filling rooms with furniture. It was about defining a lifestyle.' }]
    }
  ],
  solution: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: 'We executed end-to-end furniture and furnishing solutions across all three levels of the residence, including custom-designed sofas, one-seater lounge chairs, premium dining chairs, luxurious curtains and soft furnishings, statement throne chairs, and bespoke accent pieces.' }]
    }
  ],
  result: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: 'The final outcome was a beautifully layered home that blends comfort with grandeur. Each floor carries its own identity while maintaining a cohesive, luxurious feel throughout. From everyday seating to statement furniture, the residence now reflects sophistication, comfort, and timeless design.' }]
    }
  ],
  stats: [
    { label: 'Project Scope', value: '3-Storey Residence' },
    { label: 'Custom Pieces', value: '25+ Items' },
    { label: 'Completion', value: '2024' }
  ],
  // These will be replaced with Sanity image objects when uploaded
  gallery: [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366214047-2a8ba81e032e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  ],
  // Additional images for featured sections (ready for Sanity)
  throneChairImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
}

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: caseStudy.title,
  description: caseStudy.summary,
  path: `/case-studies/regal-home-kilpauk`,
})

export default function CaseStudyPage() {
  if (!caseStudy) {
    notFound()
  }

  return (
    <>
      <PageHero
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
      />
      
      <Section>
        {/* Hero Image with Animation */}
        <AnimatedSection delay={0.1}>
          <div className="mb-16">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              {getImageUrl(caseStudy.heroImage) ? (
                <Image
                  src={getImageUrl(caseStudy.heroImage)!}
                  alt={caseStudy.title}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Hero Image</span>
                </div>
              )}
            </div>
            
            {/* Project Details Card - Stacked Below Hero */}
            <div className="mt-8 lg:mt-0 lg:absolute lg:bottom-8 lg:left-8 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-4 lg:p-6 max-w-[320px] lg:max-w-sm">
              <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 lg:w-6 lg:h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Client</div>
                  <div className="font-bold text-gray-900 text-sm lg:text-base">{caseStudy.client}</div>
                </div>
              </div>
              
              {/* Mobile: All 3 details in one row */}
              <div className="grid grid-cols-3 gap-3 lg:hidden">
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Location</div>
                  <div className="font-semibold text-gray-900 text-sm">{caseStudy.location}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Year</div>
                  <div className="font-semibold text-gray-900 text-sm">{caseStudy.year}</div>
                </div>
              </div>
              
              {/* Desktop: 2-column layout */}
              <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Location</div>
                  <div className="font-semibold text-gray-900 text-sm">{caseStudy.location}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Year</div>
                  <div className="font-semibold text-gray-900 text-sm">{caseStudy.year}</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Cards */}
        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {caseStudy.stats.map((stat, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary-200/20 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-primary-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-primary-700 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Story Sections */}
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4 text-gray-900">The Vision</h3>
              </div>
              <div className="prose prose-lg text-gray-700">
                {caseStudy.challenge.map((block, index) => (
                  <p key={index}>{block.children[0].text}</p>
                ))}
              </div>
            </div>
            
            <div className="group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4 text-gray-900">What We Delivered</h3>
              </div>
              <div className="prose prose-lg text-gray-700">
                {caseStudy.solution.map((block, index) => (
                  <p key={index}>{block.children[0].text}</p>
                ))}
                <ul className="mt-4 space-y-2">
                  <li>• Custom-designed sofas</li>
                  <li>• One-seater lounge chairs</li>
                  <li>• Premium dining chairs</li>
                  <li>• Luxurious curtains and soft furnishings</li>
                  <li>• Statement throne chairs</li>
                  <li>• Bespoke accent pieces</li>
                </ul>
              </div>
            </div>
            
            <div className="group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4 text-gray-900">The Result</h3>
              </div>
              <div className="prose prose-lg text-gray-700">
                {caseStudy.result.map((block, index) => (
                  <p key={index}>{block.children[0].text}</p>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Standout Feature */}
        <AnimatedSection delay={0.4}>
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-600">Highlight</span>
              </div>
              <h3 className="font-serif text-4xl font-bold mb-4 text-gray-900">The Standout Feature</h3>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-600 to-transparent mx-auto"></div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Signature Piece
                  </div>
                  <h4 className="font-serif text-3xl font-bold text-gray-900">Custom Throne Chairs</h4>
                  <div className="space-y-4 text-lg text-gray-700">
                    <p>
                      The highlight of the project? Custom throne chairs — bold, sculptural, and unmistakably regal. 
                      These weren&apos;t just seating pieces; they became conversation starters and focal points of the home.
                    </p>
                    <p>
                      Crafted with intricate detailing and premium materials, they added a royal character that truly set the space apart.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    {getImageUrl(caseStudy.throneChairImage) ? (
                      <Image
                        src={getImageUrl(caseStudy.throneChairImage)!}
                        alt="Custom Throne Chairs"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Throne Chair Image</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-200/20 rounded-full"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-orange-200/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Gallery */}
        <AnimatedSection delay={0.5}>
          <div>
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-600">Gallery</span>
              </div>
              <h3 className="font-serif text-4xl font-bold mb-4 text-gray-900">Project Gallery</h3>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-600 to-transparent mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudy.gallery.map((image, index) => (
                <div key={index} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {getImageUrl(image) ? (
                    <Image
                      src={getImageUrl(image)!}
                      alt={`${caseStudy.title} - Image ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Gallery Image {index + 1}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </>
  )
}
