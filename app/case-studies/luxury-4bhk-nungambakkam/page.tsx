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
  _id: 'luxury-4bhk-nungambakkam',
  title: 'Luxury 4BHK Residence in Nungambakkam',
  subtitle: 'Complete Home Furniture & Furnishings',
  client: 'Mr. Rajesh Kothari',
  location: 'Nungambakkam, Chennai',
  year: '2024',
  industry: 'residential',
  summary: 'Complete home furniture and furnishings featuring Italian marble dining table, home theatre recliners, and motorized curtains.',
  // This will be replaced with Sanity image object when uploaded
  heroImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304a36?auto=format&fit=crop&w=1920&q=80',
  challenge: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: 'For Mr. Rajesh Kothari\'s 4BHK residence in Nungambakkam, the goal was clear — create a home that feels luxurious, modern, and seamlessly integrated with comfort. Every space needed to feel intentional. Nothing generic. Nothing off-the-shelf.' }]
    }
  ],
  solution: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: 'This was a full-home execution covering major living and private spaces including custom-designed living room sofa, full home theatre recliner setup, grand Italian marble dining table with designer chairs, motorized curtains for the main hall, premium curtains across all bedrooms, and custom-made cots tailored to each room.' }]
    }
  ],
  result: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: 'The final outcome is a refined, high-end 4BHK residence that blends technology, comfort, and luxury seamlessly. Every room feels complete. Every detail feels intentional. This project reflects what happens when design, craftsmanship, and customization come together the right way.' }]
    }
  ],
  stats: [
    { label: 'Project Type', value: '4BHK Residence' },
    { label: 'Scope', value: 'Full Home Execution' },
    { label: 'Completion', value: '2024' }
  ],
  // These will be replaced with Sanity image objects when uploaded
  gallery: [
    'https://images.unsplash.com/photo-1524758631624-e2822e304a36?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366214047-2a8ba81e032e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  ],
  // Additional images for featured sections (ready for Sanity)
  homeTheatreImage: 'https://images.unsplash.com/photo-1598928424272-9e66e0c2972b?auto=format&fit=crop&w=800&q=80',
  diningTableImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
  livingRoomImage: 'https://images.unsplash.com/photo-1497366214047-2a8ba81e032e?auto=format&fit=crop&w=800&q=80'
}

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: caseStudy.title,
  description: caseStudy.summary,
  path: `/case-studies/luxury-4bhk-nungambakkam`,
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
                  <li>• Custom-designed living room sofa</li>
                  <li>• Full home theatre recliner setup</li>
                  <li>• Grand Italian marble dining table with designer chairs</li>
                  <li>• Motorized curtains for the main hall</li>
                  <li>• Premium curtains across all bedrooms</li>
                  <li>• Custom-made cots tailored to each room</li>
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

        {/* Featured Spaces */}
        <AnimatedSection delay={0.4}>
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-600">Spaces</span>
              </div>
              <h3 className="font-serif text-4xl font-bold mb-4 text-gray-900">Featured Spaces</h3>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-600 to-transparent mx-auto"></div>
            </div>
            
            <div className="space-y-8">
              {/* Home Theatre */}
              <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-3xl p-12 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Entertainment
                    </div>
                    <h4 className="font-serif text-3xl font-bold text-gray-900">Home Theatre Experience</h4>
                    <p className="text-lg text-gray-700">
                      A dedicated home theatre with plush recliners was designed to deliver cinema-level comfort within the home. Deep cushioning, ergonomic support, and a premium finish transformed the entertainment space into a private luxury lounge.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                      {getImageUrl(caseStudy.homeTheatreImage) ? (
                        <Image
                          src={getImageUrl(caseStudy.homeTheatreImage)!}
                          alt="Home Theatre Setup"
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Home Theatre Image</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-200/20 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Dining */}
              <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl p-12 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1 relative">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                      {getImageUrl(caseStudy.diningTableImage) ? (
                        <Image
                          src={getImageUrl(caseStudy.diningTableImage)!}
                          alt="Italian Marble Dining Table"
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Dining Table Image</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-200/20 rounded-full"></div>
                  </div>
                  <div className="order-1 lg:order-2 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Dining
                    </div>
                    <h4 className="font-serif text-3xl font-bold text-gray-900">The Dining Statement</h4>
                    <p className="text-lg text-gray-700">
                      The centerpiece of the dining area was a massive Italian marble table paired with elegant chairs — bold, refined, and unmistakably premium. It anchors the space and immediately commands attention.
                    </p>
                  </div>
                </div>
              </div>

              {/* Living & Bedrooms */}
              <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 rounded-3xl p-12 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Living Spaces
                    </div>
                    <h4 className="font-serif text-3xl font-bold text-gray-900">Living & Bedrooms</h4>
                    <p className="text-lg text-gray-700">
                      The living room sofa was designed to balance visual elegance with everyday comfort. Motorized curtains in the hall add both sophistication and convenience, while custom-made cots and curated curtains across all bedrooms ensure continuity in design and quality.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                      {getImageUrl(caseStudy.livingRoomImage) ? (
                        <Image
                          src={getImageUrl(caseStudy.livingRoomImage)!}
                          alt="Living Room Setup"
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Living Room Image</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-rose-200/20 rounded-full"></div>
                  </div>
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
