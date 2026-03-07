import { cn } from '@/lib/utils'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { urlFor } from '@/lib/sanity/client'
import { generateSEOMetadata } from '@/lib/seo'
import type { CaseStudy } from '@/types'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { ResponsiveImage } from '@/components/ResponsiveImage'

// Dummy data for preview when no Sanity data is available
const dummyCaseStudies: Record<string, any> = {
  'tech-hub-workspace': {
    _id: 'dummy-1',
    _type: 'caseStudy',
    title: 'Tech Hub Workspace',
    subtitle: 'A futuristic office space designed for collaboration and innovation',
    summary: 'Modern office setup with ergonomic furniture and collaborative workspaces.',
    client: 'TechCorp Solutions',
    location: 'Chennai, Tamil Nadu',
    year: '2024',
    industry: 'office',
    heroImage: 'https://images.unsplash.com/photo-1497366212-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    challenge: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Client needed a modern workspace that would foster innovation and team collaboration.'
          }
        ]
      }
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We created a tech hub with modular workstations, collaborative zones, and advanced meeting rooms.'
          }
        ]
      }
    ],
    result: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A transformed workspace that increased productivity and team satisfaction by 40%.'
          }
        ]
      }
    ],
    stats: [
      {
        _type: 'object',
        label: 'Project Duration',
        value: '3 months'
      },
      {
        _type: 'object',
        label: 'Square Footage',
        value: '2,500 sq ft'
      },
      {
        _type: 'object',
        label: 'Workstations',
        value: '15+'
      }
    ]
  },
  'luxury-villa-interiors': {
    _id: 'dummy-2',
    _type: 'caseStudy',
    title: 'Luxury Villa Interiors',
    subtitle: 'Bespoke furniture collection for a premium residential project',
    summary: 'High-end custom furniture and furnishings for a luxury villa with Italian marble and premium materials.',
    client: 'Mr. & Mrs. Sharma',
    location: 'Adyar, Chennai',
    year: '2024',
    industry: 'residential',
    heroImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304a36?auto=format&fit=crop&w=800&q=80',
    challenge: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Client wanted luxury interiors that would reflect their sophisticated taste while maintaining functionality.'
          }
        ]
      }
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We designed custom furniture pieces, sourced Italian marble, and created a cohesive luxury aesthetic.'
          }
        ]
      }
    ],
    result: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A stunning villa transformation that exceeded client expectations with premium materials and craftsmanship.'
          }
        ]
      }
    ],
    stats: [
      {
        _type: 'object',
        label: 'Project Duration',
        value: '6 months'
      },
      {
        _type: 'object',
        label: 'Budget',
        value: '₹45 Lakhs'
      },
      {
        _type: 'object',
        label: 'Custom Pieces',
        value: '25+ items'
      }
    ]
  },
  'boutique-hotel-lobby': {
    _id: 'dummy-3',
    _type: 'caseStudy',
    title: 'Boutique Hotel Lobby',
    subtitle: 'Welcoming and elegant seating solutions for hospitality',
    summary: 'Elegant lobby design with custom furniture pieces for a boutique hotel.',
    client: 'Grand Plaza Hotel',
    location: 'Chennai, Tamil Nadu',
    year: '2024',
    industry: 'hospitality',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    challenge: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Hotel needed a lobby that would create a welcoming first impression while reflecting their brand.'
          }
        ]
      }
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We designed custom seating solutions and elegant furniture pieces that balance comfort with style.'
          }
        ]
      }
    ],
    result: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A transformed lobby space that enhances guest experience and strengthens hotel brand identity.'
          }
        ]
      }
    ],
    stats: [
      {
        _type: 'object',
        label: 'Project Status',
        value: 'Coming Soon'
      },
      {
        _type: 'object',
        label: 'Seating Capacity',
        value: '25+ guests'
      }
    ]
  }
}

interface CaseStudyPageProps {
  params: { slug: string }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  let caseStudy = await getCaseStudyBySlug(params.slug)

  if (!caseStudy) {
    // Check for dummy data
    if (dummyCaseStudies[params.slug]) {
      caseStudy = dummyCaseStudies[params.slug] as any
    } else {
      return notFound()
    }
  }

  if (!caseStudy) {
    return notFound()
  }

  // Helper function to get image URL (works with both Sanity images and string URLs)
  function getImageUrl(image: any) {
    if (!image) return null
    
    try {
      // If it's a Sanity image object
      if (image && typeof image === 'object' && image.asset) {
        return urlFor(image)?.width(1200).height(800).url() || null
      }
      
      // If it's a string URL
      if (typeof image === 'string') {
        return image
      }
    } catch (error) {
      console.warn('Error getting case study image URL:', error);
      return null;
    }
  
    return null
  }

  return generateSEOMetadata({
    title: caseStudy.seo?.title || caseStudy.title,
    description: caseStudy.seo?.description || caseStudy.summary,
    image: caseStudy.seo?.image || caseStudy.heroImage,
    path: `/case-studies/${params.slug}`,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {caseStudy.heroImage && (
          <div className="absolute inset-0">
            <ResponsiveImage
              image={caseStudy.heroImage}
              alt={caseStudy.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
          </div>
        )}
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                {caseStudy.title}
              </h1>
              {caseStudy.subtitle && (
                <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl">
                  {caseStudy.subtitle}
                </p>
              )}
            </div>
          </Container>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-20 -mt-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Challenge Section */}
            {caseStudy.challenge && caseStudy.challenge.length > 0 && (
              <Section>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-primary-900">The Challenge</h2>
                  <p className="text-primary-200 text-lg">What we needed to overcome</p>
                </div>
                <div className="prose prose-lg text-primary-700 max-w-none">
                  {caseStudy.challenge.map((block, index) => (
                    <p key={index} className="mb-6">
                      {block.children?.map((span: any) => (
                        <span key={span._key}>{span.text}</span>
                      ))}
                    </p>
                  ))}
                </div>
              </Section>
            )}

            {/* Solution Section */}
            {caseStudy.solution && caseStudy.solution.length > 0 && (
              <Section>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-primary-900">The Solution</h2>
                  <p className="text-primary-200 text-lg">How we solved it</p>
                </div>
                <div className="prose prose-lg text-primary-700 max-w-none">
                  {caseStudy.solution.map((block, index) => (
                    <p key={index} className="mb-6">
                      {block.children?.map((span: any) => (
                        <span key={span._key}>{span.text}</span>
                      ))}
                    </p>
                  ))}
                </div>
              </Section>
            )}

            {/* Result Section */}
            {caseStudy.result && caseStudy.result.length > 0 && (
              <Section>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-primary-900">The Result</h2>
                  <p className="text-primary-200 text-lg">The outcome</p>
                </div>
                <div className="prose prose-lg text-primary-700 max-w-none">
                  {caseStudy.result.map((block, index) => (
                    <p key={index} className="mb-6">
                      {block.children?.map((span: any) => (
                        <span key={span._key}>{span.text}</span>
                      ))}
                    </p>
                  ))}
                </div>
              </Section>
            )}

            {/* Stats Section */}
            {caseStudy.stats && caseStudy.stats.length > 0 && (
              <Section className="py-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Project Statistics</h2>
                  <p className="text-primary-200 text-lg">Key metrics and achievements</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {caseStudy.stats.map((stat, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-lg">
                      <h3 className="font-bold text-primary-950 mb-2">{stat.label}</h3>
                      <p className="text-3xl font-serif text-primary-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Testimonial Section */}
            {caseStudy.testimonial && (
              <Section className="py-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Client Testimonial</h2>
                  <p className="text-primary-200 text-lg">What our clients say about their experience</p>
                </div>
                <blockquote className="text-2xl md:text-4xl font-serif leading-relaxed mb-8 text-primary-900">
                  &quot;{caseStudy.testimonial.quote}&quot;
                </blockquote>
                <cite className="not-italic">
                  <span className="block font-bold text-lg text-primary-950">{caseStudy.testimonial.author}</span>
                  <span className="block text-primary-600">{caseStudy.testimonial.role}</span>
                </cite>
              </Section>
            )}

            {/* Products Used */}
            {caseStudy.productsUsed && caseStudy.productsUsed.length > 0 && (
              <Section>
                <h2 className="font-serif text-3xl font-bold mb-12 text-center text-primary-900">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {caseStudy.productsUsed.map((product) => (
                    <div key={product._id} className="group block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-primary-300">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-primary-900 group-hover:text-primary-700">{product.title}</h3>
                        <span className="text-primary-600 text-sm">View Details</span>
                      </div>
                      <div className="text-primary-700 font-medium">Product #{product.sku}</div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Gallery & Media Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Gallery & Media</h2>
              <p className="text-primary-200 text-lg">A closer look at the details</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Prioritize new showcase field, fallback to old gallery */}
              {caseStudy.showcase ? caseStudy.showcase.map((item, idx) => (
                <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden bg-primary-900 shadow-2xl">
                  {item.type === 'image' ? (
                    <ResponsiveImage
                      image={item.image}
                      alt={`${caseStudy.title} - Gallery ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    >
                      <source src={item.videoUrl} type="video/mp4" />
                    </video>
                  )}
                </div>
              )) : (
                /* Legacy Content Fallback */
                <Section className="py-24">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    <div className="lg:col-span-8">
                      {caseStudy.gallery?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {caseStudy.gallery.map((image, idx) => (
                            <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden bg-primary-900 shadow-2xl">
                              <ResponsiveImage
                                image={image}
                                alt={`${caseStudy.title} - Gallery ${idx + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {caseStudy.heroImage && (
                            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-primary-900 shadow-2xl">
                              <ResponsiveImage
                                image={caseStudy.heroImage}
                                alt={`${caseStudy.title} - Hero Image`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="lg:col-span-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caseStudy.gallery?.length > 0 ? (
                          caseStudy.gallery.map((image, idx) => (
                            <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden bg-primary-900 shadow-2xl">
                              <ResponsiveImage
                                image={image}
                                alt={`${caseStudy.title} - Gallery ${idx + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          ))
                        ) : (
                          // Fallback to hero image if no gallery
                          caseStudy.heroImage && (
                            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-primary-900 shadow-2xl">
                              <ResponsiveImage
                                image={caseStudy.heroImage}
                                alt={`${caseStudy.title} - Hero Image`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </Section>
              )}
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}
