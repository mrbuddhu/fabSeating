import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCaseStudyBySlug } from '@/lib/sanity/queries'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { generateSEOMetadata } from '@/components/SEOHead'
import { PortableText } from '@portabletext/react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// Dummy data for preview when no Sanity data is available
const dummyCaseStudies: Record<string, any> = {
  'tech-hub-workspace': {
    _id: 'dummy-1',
    _type: 'caseStudy',
    title: 'Tech Hub Workspace',
    subtitle: 'A futuristic office space designed for collaboration and innovation',
    summary: 'A futuristic office space designed for collaboration and innovation.',
    client: 'TechCorp Inc.',
    location: 'Bangalore, India',
    year: '2023',
    industry: 'Office',
    heroImage: null, // Will use a placeholder
    heroImageUrl: 'https://images.unsplash.com/photo-1497366214047-2a8ba81e032e?auto=format&fit=crop&w=1600&q=80',
    story: [
      {
        heading: 'The Challenge',
        content: [{ _type: 'block', children: [{ _type: 'span', text: 'Creating a workspace that balances open collaboration with private focus areas was the primary challenge. The client needed a flexible environment that could adapt to their rapidly growing team while maintaining a cohesive aesthetic.' }] }],
        image: null,
        imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
      },
      {
        heading: 'The Solution',
        content: [{ _type: 'block', children: [{ _type: 'span', text: 'We implemented a modular furniture system that allows for easy reconfiguration. Sound-dampening pods were strategically placed for quiet work, while open lounges encourage spontaneous brainstorming sessions.' }] }],
        image: null,
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c54be3855092?auto=format&fit=crop&w=800&q=80'
      }
    ],
    showcase: [
      { type: 'image', imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80' }
    ],
    testimonial: {
      quote: "The transformation has been incredible. Our team productivity has soared, and clients are always impressed when they visit.",
      author: "Sarah Johnson",
      role: "Operations Director"
    }
  },
  'luxury-villa-interiors': {
    _id: 'dummy-2',
    _type: 'caseStudy',
    title: 'Luxury Villa Interiors',
    subtitle: 'Bespoke furniture collection for a premium residential project',
    summary: 'Bespoke furniture collection for a premium residential project.',
    client: 'Private Client',
    location: 'Chennai, India',
    year: '2024',
    industry: 'Residential',
    heroImage: null,
    heroImageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    story: [
      {
        heading: 'Design Vision',
        content: [{ _type: 'block', children: [{ _type: 'span', text: 'The goal was to create a sanctuary of comfort and elegance. Every piece of furniture was custom-designed to complement the architectural details of the villa, using premium fabrics and sustainable woods.' }] }],
        image: null,
        imageUrl: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=800&q=80'
      }
    ],
    showcase: [
      { type: 'image', imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', imageUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80' }
    ],
    testimonial: {
      quote: "Fab Seating understood exactly what we wanted. The craftsmanship is world-class.",
      author: "Mr. & Mrs. Reddy",
      role: "Homeowners"
    }
  },
  'boutique-hotel-lobby': {
    _id: 'dummy-3',
    _type: 'caseStudy',
    title: 'Boutique Hotel Lobby',
    subtitle: 'Welcoming and elegant seating solutions for hospitality',
    summary: 'Welcoming and elegant seating solutions for hospitality.',
    client: 'The Grand Heritage',
    location: 'Hyderabad, India',
    year: '2024',
    industry: 'Hospitality',
    heroImage: null,
    heroImageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    story: [
      {
        heading: 'Concept',
        content: [{ _type: 'block', children: [{ _type: 'span', text: 'We wanted to create a first impression that lasts. The lobby furniture needed to be durable enough for high traffic yet stylish enough to set the tone for the entire hotel experience.' }] }],
        image: null,
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
      }
    ],
    showcase: [
      { type: 'image', imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', imageUrl: 'https://images.unsplash.com/photo-1590430344266-2064f5e18c04?auto=format&fit=crop&w=800&q=80' }
    ],
    testimonial: {
      quote: "Our guests constantly compliment the lobby design. It's the perfect blend of style and comfort.",
      author: "Rajesh Kumar",
      role: "General Manager"
    }
  }
}

interface CaseStudyPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  let caseStudy = await getCaseStudyBySlug(params.slug)
  
  if (!caseStudy) {
    // Check for dummy data
    if (dummyCaseStudies[params.slug]) {
      caseStudy = dummyCaseStudies[params.slug] as any
    } else {
      return {}
    }
  }

  if (!caseStudy) {
    return {}
  }

  return generateSEOMetadata({
    title: caseStudy.seo?.title || caseStudy.title,
    description: caseStudy.seo?.description || caseStudy.summary,
    image: caseStudy.seo?.image || caseStudy.heroImage,
    path: `/case-studies/${params.slug}`,
  })
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  let caseStudy = await getCaseStudyBySlug(params.slug)

  if (!caseStudy) {
    // Check for dummy data
    if (dummyCaseStudies[params.slug]) {
      caseStudy = dummyCaseStudies[params.slug] as any
    } else {
      notFound()
    }
  }

  // Use subtitle if available, otherwise summary
  const subtitle = caseStudy.subtitle || caseStudy.summary

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-primary-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-900 transition-colors uppercase tracking-wider mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Case Studies
            </Link>
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary-950">
              {caseStudy.title}
            </h1>
            
            {subtitle && (
              <p className="text-xl md:text-2xl text-primary-800 font-light max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 border-t border-b border-primary-200 py-6 text-left md:text-center">
              {[
                { label: 'Client', value: caseStudy.client },
                { label: 'Location', value: caseStudy.location },
                { label: 'Year', value: caseStudy.year },
                { label: 'Industry', value: caseStudy.industry },
              ].map((item) => item.value && (
                <div key={item.label} className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-primary-500 mb-1">{item.label}</span>
                  <span className="font-medium text-primary-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Hero Image */}
      {caseStudy.heroImage ? (
        <div className="relative w-full aspect-[21/9] md:aspect-[2.4/1] overflow-hidden">
          <ResponsiveImage
            image={caseStudy.heroImage}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (caseStudy as any).heroImageUrl && (
        <div className="relative w-full aspect-[21/9] md:aspect-[2.4/1] overflow-hidden">
          <Image
            src={(caseStudy as any).heroImageUrl}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Story Sections - Alternating Layout */}
      {caseStudy.story && caseStudy.story.length > 0 ? (
        <section className="py-24 space-y-24">
          {caseStudy.story.map((section, idx) => (
            <Container key={idx}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Text Content */}
                <div className={cn(
                  "flex flex-col justify-center",
                  idx % 2 !== 0 ? "lg:order-2" : "lg:order-1"
                )}>
                  {section.heading && (
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-primary-900">
                      {section.heading}
                    </h2>
                  )}
                  {section.content && (
                    <div className="prose prose-lg prose-primary text-primary-800/80 leading-relaxed">
                      <PortableText value={section.content} />
                    </div>
                  )}
                </div>

                {/* Image */}
                <div className={cn(
                  "relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl",
                  idx % 2 !== 0 ? "lg:order-1" : "lg:order-2"
                )}>
                  {section.image ? (
                    <ResponsiveImage
                      image={section.image}
                      alt={section.heading || `Story image ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  ) : (section as any).imageUrl ? (
                    <Image
                      src={(section as any).imageUrl}
                      alt={section.heading || `Story image ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-300 font-serif text-xl">Image Placeholder</span>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          ))}
        </section>
      ) : (
        /* Legacy Content Fallback */
        <Section className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-8">
              {caseStudy.challenge && (
                <div className="mb-16">
                  <h2 className="font-serif text-3xl font-bold mb-6 text-primary-900">The Challenge</h2>
                  <div className="prose prose-lg prose-primary text-primary-800/80 leading-relaxed">
                    <PortableText value={caseStudy.challenge} />
                  </div>
                </div>
              )}
              {caseStudy.solution && (
                <div className="mb-16">
                  <h2 className="font-serif text-3xl font-bold mb-6 text-primary-900">The Solution</h2>
                  <div className="prose prose-lg prose-primary text-primary-800/80 leading-relaxed">
                    <PortableText value={caseStudy.solution} />
                  </div>
                </div>
              )}
              {caseStudy.result && (
                <div className="mb-16">
                  <h2 className="font-serif text-3xl font-bold mb-6 text-primary-900">The Result</h2>
                  <div className="prose prose-lg prose-primary text-primary-800/80 leading-relaxed">
                    <PortableText value={caseStudy.result} />
                  </div>
                </div>
              )}
            </div>
            {/* Sidebar / Stats */}
            <div className="lg:col-span-4 space-y-12">
               {/* Keep stats sidebar if using legacy layout */}
               {caseStudy.stats && caseStudy.stats.length > 0 && (
                  <div className="bg-primary-50 rounded-2xl p-8">
                    <h3 className="font-serif text-xl font-bold mb-6 text-primary-900">Project Stats</h3>
                    <div className="space-y-6">
                      {caseStudy.stats.map((stat) => (
                        <div key={stat.label} className="flex justify-between items-baseline border-b border-primary-200 pb-3 last:border-0 last:pb-0">
                          <span className="text-sm font-medium text-primary-600">{stat.label}</span>
                          <span className="text-lg font-bold text-primary-900">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
               )}
            </div>
          </div>
        </Section>
      )}

      {/* Showcase Media Grid (Bottom) */}
      {(caseStudy.showcase && caseStudy.showcase.length > 0) || (caseStudy.gallery && caseStudy.gallery.length > 0) ? (
        <section className="py-24 bg-primary-950 text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Gallery & Media</h2>
              <p className="text-primary-200 text-lg">A closer look at the details</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Prioritize new showcase field, fallback to old gallery */}
              {caseStudy.showcase ? caseStudy.showcase.map((item, idx) => (
                <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden bg-primary-900 shadow-2xl">
                  {item.type === 'video' && item.videoUrl ? (
                    <div className="w-full h-full relative">
                         <video 
                           controls 
                           className="w-full h-full object-cover"
                           poster={item.image?.asset?._ref /* Need proper url builder if possible, or omit */}
                         >
                           <source src={item.videoUrl} />
                           Your browser does not support the video tag.
                         </video>
                         <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider text-white">
                           Video
                         </div>
                    </div>
                  ) : item.image ? (
                    <div className="w-full h-full relative">
                       <ResponsiveImage
                         image={item.image}
                         alt={`Gallery image ${idx + 1}`}
                         fill
                         className="object-cover transition-transform duration-700 group-hover:scale-110"
                       />
                    </div>
                  ) : (item as any).imageUrl ? (
                    <div className="w-full h-full relative">
                       <Image
                         src={(item as any).imageUrl}
                         alt={`Gallery image ${idx + 1}`}
                         fill
                         className="object-cover transition-transform duration-700 group-hover:scale-110"
                       />
                    </div>
                  ) : null}
                </div>
              )) : caseStudy.gallery?.map((image, idx) => (
                <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden bg-primary-900 shadow-2xl">
                   <ResponsiveImage
                     image={image}
                     alt={`Gallery image ${idx + 1}`}
                     fill
                     className="object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <Section className="bg-primary-50">
          <div className="max-w-4xl mx-auto text-center">
            <svg className="w-12 h-12 text-primary-300 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.896 14.325 15.923 14.941 15.08C15.557 14.238 16.634 13.243 18.173 12.094C19.712 10.945 20.482 9.508 20.482 7.781C20.482 6.055 19.962 4.603 18.922 3.427C17.882 2.251 16.516 1.663 14.825 1.663C13.134 1.663 11.758 2.251 10.698 3.427C9.638 4.603 9.108 6.055 9.108 7.781C9.108 9.073 9.468 10.228 10.188 11.246L10.188 11.246C10.908 12.264 12.185 13.433 14.017 14.752L14.017 21ZM4.908 21L4.908 18C4.908 16.896 5.216 15.923 5.832 15.08C6.448 14.238 7.525 13.243 9.064 12.094C10.603 10.945 11.373 9.508 11.373 7.781C11.373 6.055 10.853 4.603 9.813 3.427C8.773 2.251 7.407 1.663 5.716 1.663C4.025 1.663 2.649 2.251 1.589 3.427C0.529 4.603 0 6.055 0 7.781C0 9.073 0.36 10.228 1.08 11.246L1.08 11.246C1.8 12.264 3.077 13.433 4.908 14.752L4.908 21Z" />
            </svg>
            <blockquote className="text-2xl md:text-4xl font-serif leading-relaxed mb-8 text-primary-900">
              &quot;{caseStudy.testimonial.quote}&quot;
            </blockquote>
            <cite className="not-italic">
              <span className="block font-bold text-lg text-primary-950">{caseStudy.testimonial.author}</span>
              <span className="block text-primary-600">{caseStudy.testimonial.role}</span>
            </cite>
          </div>
        </Section>
      )}

      {/* Products Used */}
      {caseStudy.productsUsed && caseStudy.productsUsed.length > 0 && (
         <Section>
            <h2 className="font-serif text-3xl font-bold mb-12 text-center text-primary-900">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {caseStudy.productsUsed.map((product) => (
                    <Link 
                        key={product._id}
                        href={`/catalog/${product.slug?.current}`}
                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                        {product.images && product.images[0] && (
                          <div className="relative aspect-square overflow-hidden bg-gray-100">
                            <ResponsiveImage
                              image={product.images[0]}
                              alt={product.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-4">
                           <h3 className="font-medium text-primary-900 group-hover:text-primary-700">{product.title}</h3>
                           <span className="text-xs text-primary-500 uppercase tracking-wider mt-1 block">View Product</span>
                        </div>
                    </Link>
                ))}
            </div>
         </Section>
      )}
    </>
  )
}
