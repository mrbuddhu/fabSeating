import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { ResponsiveImage } from '@/components/ResponsiveImage'

type CaseStudy = {
  title: string
  subtitle?: string
  heroImage?: any
  challengeImage?: any
  challenge?: Array<{ children?: Array<{ _key?: string; text?: string }> }>
  solutionImage?: any
  solution?: Array<{ children?: Array<{ _key?: string; text?: string }> }>
  resultImage?: any
  result?: Array<{ children?: Array<{ _key?: string; text?: string }> }>
  stats?: Array<{ label?: string; value?: string }>
  testimonial?: { quote?: string; author?: string; role?: string }
  productsUsed?: Array<{ _id: string; title?: string; sku?: string }>
  showcase?: Array<{ type?: string; image?: any; videoUrl?: string }>
  gallery?: any[]
}

function normalizeHeroImage(heroImage: any) {
  if (!heroImage) return null
  if (typeof heroImage === 'string') return { imageUrl: heroImage }
  if (heroImage?.imageUrl) return heroImage
  return heroImage
}

export function CaseStudyDetailContent({ caseStudy }: { caseStudy: CaseStudy }) {
  const heroImage = normalizeHeroImage(caseStudy.heroImage)
  const challengeImage = normalizeHeroImage(caseStudy.challengeImage)
  const solutionImage = normalizeHeroImage(caseStudy.solutionImage)
  const resultImage = normalizeHeroImage(caseStudy.resultImage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0">
            <ResponsiveImage
              image={heroImage}
              alt={caseStudy.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
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

      <div className="relative z-20 -mt-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            {caseStudy.challenge && caseStudy.challenge.length > 0 && (
              <Section>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6">
                    <div className="text-left max-w-xl mb-10">
                      <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-primary-900">
                        The Challenge
                      </h2>
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
                  </div>
                  {challengeImage && (
                    <div className="lg:col-span-6">
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                        <ResponsiveImage
                          image={challengeImage}
                          alt={`${caseStudy.title} – The Challenge`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {caseStudy.solution && caseStudy.solution.length > 0 && (
              <Section>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {solutionImage && (
                    <div className="lg:col-span-6 order-last lg:order-first">
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                        <ResponsiveImage
                          image={solutionImage}
                          alt={`${caseStudy.title} – The Solution`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className="lg:col-span-6">
                    <div className="text-left max-w-xl mb-10">
                      <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-primary-900">
                        The Solution
                      </h2>
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
                  </div>
                </div>
              </Section>
            )}

            {caseStudy.result && caseStudy.result.length > 0 && (
              <Section>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6">
                    <div className="text-left max-w-xl mb-10">
                      <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-primary-900">
                        The Result
                      </h2>
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
                  </div>
                  {resultImage && (
                    <div className="lg:col-span-6">
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                        <ResponsiveImage
                          image={resultImage}
                          alt={`${caseStudy.title} – The Result`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Section>
            )}

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

            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Gallery & Media</h2>
              <p className="text-primary-200 text-lg">A closer look at the details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudy.showcase ? (
                caseStudy.showcase.map((item, idx) => (
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
                ))
              ) : (
                <Section className="py-24">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    <div className="lg:col-span-8">
                      {(caseStudy.gallery?.length ?? 0) > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {(caseStudy.gallery ?? []).map((image: any, idx: number) => (
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
                          {heroImage && (
                            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-primary-900 shadow-2xl">
                              <ResponsiveImage
                                image={heroImage}
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
                        {(caseStudy.gallery?.length ?? 0) > 0 ? (
                          (caseStudy.gallery ?? []).map((image: any, idx: number) => (
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
                          heroImage && (
                            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-primary-900 shadow-2xl">
                              <ResponsiveImage
                                image={heroImage}
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
          </div>
        </Container>
      </div>
    </div>
  )
}
