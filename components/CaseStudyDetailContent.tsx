import Link from 'next/link'
import { Container } from '@/components/Container'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { cn } from '@/lib/utils'
import { normalizeCaseStudyImage, resolveCaseStudyVisualImage } from '@/lib/caseStudy'

type Block = { children?: Array<{ _key?: string; text?: string }> }

type CaseStudyBase = {
  title: string
  subtitle?: string
  summary?: string
  comingSoon?: boolean
  client?: string
  location?: string
  year?: string
  industry?: string
  heroImage?: unknown
  /** Same source as cards when set; detail hero uses card first, then heroImage */
  cardImage?: unknown
  challengeImage?: unknown
  challenge?: Block[]
  solutionImage?: unknown
  solution?: Block[]
  resultImage?: unknown
  result?: Block[]
  stats?: Array<{ label?: string; value?: string }>
  testimonial?: { quote?: string; author?: string; role?: string }
  productsUsed?: Array<{ _id: string; title?: string; sku?: string }>
  showcase?: Array<{ type?: string; image?: unknown; videoUrl?: string }>
  gallery?: unknown[]
}

export type CaseStudyHighlight = {
  eyebrow: string
  title: string
  description: string
  image?: unknown
  imagePosition?: 'left' | 'right'
}

export type CaseStudyDetailContentProps = {
  caseStudy: CaseStudyBase
  /** Use 3-column narrative (Vision / Delivered / Result) like flagship static pages */
  narrativeStyle?: 'alternating' | 'columns'
  storyLabels?: {
    challenge?: string
    solution?: string
    result?: string
  }
  solutionBullets?: string[]
  highlights?: CaseStudyHighlight[]
}

function renderBlocks(blocks?: Block[]) {
  if (!blocks?.length) return null
  return blocks.map((block, index) => (
    <p key={index} className="mb-4 last:mb-0 text-primary-800 leading-relaxed">
      {block.children?.map((span: { _key?: string; text?: string }) => (
        <span key={span._key}>{span.text}</span>
      ))}
    </p>
  ))
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-primary-600 mb-3">
      {children}
    </p>
  )
}

export function CaseStudyDetailContent({
  caseStudy,
  narrativeStyle = 'alternating',
  storyLabels,
  solutionBullets,
  highlights,
}: CaseStudyDetailContentProps) {
  /** Card + hero use identical resolution as `CaseStudyCard` (card first; invalid empty Sanity images skipped) */
  const heroVisualImage = resolveCaseStudyVisualImage(caseStudy)
  const challengeImage = normalizeCaseStudyImage(caseStudy.challengeImage)
  const solutionImage = normalizeCaseStudyImage(caseStudy.solutionImage)
  const resultImage = normalizeCaseStudyImage(caseStudy.resultImage)

  const labelChallenge = storyLabels?.challenge ?? 'The challenge'
  const labelSolution = storyLabels?.solution ?? 'The solution'
  const labelResult = storyLabels?.result ?? 'The result'

  const hasGallery =
    (caseStudy.showcase && caseStudy.showcase.length > 0) ||
    (caseStudy.gallery && caseStudy.gallery.length > 0)

  const isComingSoon = Boolean(caseStudy.comingSoon)

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 via-white to-white">
      <div className="pt-24 md:pt-28 pb-16 md:pb-20">
        <Container>
          <nav className="text-sm text-primary-700 mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/case-studies" className="hover:text-primary-950 transition-colors">
                  Case studies
                </Link>
              </li>
              <li className="text-primary-400" aria-hidden>
                /
              </li>
              <li className="text-primary-950 font-medium line-clamp-2">{caseStudy.title}</li>
            </ol>
          </nav>

          {isComingSoon ? (
            <div
              className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-sm text-amber-950 md:px-5"
              role="status"
            >
              <span className="rounded-full bg-amber-200/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-900">
                Coming soon
              </span>
              <span className="text-amber-900/90">
                This case study is still in progress. Check back for the full story, or contact us for similar hospitality work.
              </span>
            </div>
          ) : null}

          {/* Hero: copy first / image below on mobile; copy left / image right on desktop */}
          <div className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-primary-200/60 bg-primary-950 shadow-[0_24px_80px_rgba(15,23,42,0.12)] md:flex-row md:items-stretch">
            <div className="order-1 flex flex-1 flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 md:order-1 md:min-w-0 md:px-10 md:py-12 lg:px-12">
              {caseStudy.industry ? (
                <span className="mb-4 inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-100 backdrop-blur-sm">
                  {caseStudy.industry}
                </span>
              ) : null}
              <h1 className="max-w-4xl font-serif text-3xl font-bold leading-[1.08] text-balance text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {caseStudy.title}
              </h1>
              {caseStudy.subtitle ? (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-100/95 md:text-lg">
                  {caseStudy.subtitle}
                </p>
              ) : null}
            </div>
            <div className="relative order-2 aspect-[4/5] w-full shrink-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 md:order-2 md:aspect-auto md:h-auto md:min-h-[280px] md:w-[min(46%,24rem)] md:max-w-xl lg:min-h-[320px] lg:w-[min(44%,28rem)]">
              {heroVisualImage ? (
                <div className="relative h-full min-h-[12rem] w-full overflow-hidden md:absolute md:inset-0 md:min-h-0">
                  <ResponsiveImage
                    image={heroVisualImage as any}
                    alt={caseStudy.title}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 767px) 100vw, (max-width: 1200px) 45vw, 560px"
                  />
                </div>
              ) : (
                <div className="h-full min-h-[12rem] w-full bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 md:min-h-full" />
              )}
            </div>
          </div>

          {/* Meta */}
          {(caseStudy.client || caseStudy.location || caseStudy.year) && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                caseStudy.client && { k: 'Client', v: caseStudy.client },
                caseStudy.location && { k: 'Location', v: caseStudy.location },
                caseStudy.year && { k: 'Year', v: caseStudy.year },
              ]
                .filter(Boolean)
                .map((item) => (
                  <div
                    key={(item as { k: string }).k}
                    className="rounded-2xl border border-primary-200/80 bg-white/90 px-5 py-4 shadow-sm backdrop-blur-sm"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-600 mb-1">
                      {(item as { k: string; v: string }).k}
                    </p>
                    <p className="font-serif text-lg text-primary-950 leading-snug">
                      {(item as { k: string; v: string }).v}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {caseStudy.summary ? (
            <p className="mt-12 max-w-3xl mx-auto text-center text-lg md:text-xl text-primary-800 leading-relaxed font-medium border-b border-primary-100 pb-12">
              {caseStudy.summary}
            </p>
          ) : null}
        </Container>

        {/* Stats */}
        {caseStudy.stats && caseStudy.stats.length > 0 ? (
          <Container className="mt-12 md:mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {caseStudy.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-primary-200/70 bg-gradient-to-br from-white to-primary-50/40 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-200/25" aria-hidden />
                  <p className="relative text-xs font-semibold uppercase tracking-[0.14em] text-primary-700 mb-2">
                    {stat.label}
                  </p>
                  <p className="relative font-serif text-2xl md:text-3xl text-primary-950">{stat.value}</p>
                </div>
              ))}
            </div>
          </Container>
        ) : null}

        <Container className="mt-16 md:mt-20">
          <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
            {narrativeStyle === 'columns' ? (
              <section aria-label="Project narrative" className="-mx-4 sm:mx-0">
                <div
                  className={cn(
                    'flex gap-4 sm:gap-6 md:gap-8 lg:gap-10',
                    'overflow-x-auto scroll-smooth pb-3 px-4 sm:px-0',
                    'snap-x snap-mandatory',
                    'no-scrollbar',
                    'md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:snap-none'
                  )}
                >
                  <article className="snap-center shrink-0 w-[min(100vw-2.5rem,22rem)] sm:w-[min(100vw-3rem,24rem)] md:w-auto md:min-w-0 flex flex-col rounded-2xl border border-primary-100 bg-white/80 p-6 md:p-8 shadow-sm">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-800">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-primary-950 mb-4">{labelChallenge}</h2>
                    <div className="text-[15px] md:text-base">{renderBlocks(caseStudy.challenge)}</div>
                  </article>
                  <article className="snap-center shrink-0 w-[min(100vw-2.5rem,22rem)] sm:w-[min(100vw-3rem,24rem)] md:w-auto md:min-w-0 flex flex-col rounded-2xl border border-primary-100 bg-white/80 p-6 md:p-8 shadow-sm">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-800">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-primary-950 mb-4">{labelSolution}</h2>
                    <div className="text-[15px] md:text-base">{renderBlocks(caseStudy.solution)}</div>
                    {solutionBullets && solutionBullets.length > 0 ? (
                      <ul className="mt-5 space-y-2.5 text-primary-800 text-[15px]">
                        {solutionBullets.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                  <article className="snap-center shrink-0 w-[min(100vw-2.5rem,22rem)] sm:w-[min(100vw-3rem,24rem)] md:w-auto md:min-w-0 flex flex-col rounded-2xl border border-primary-100 bg-white/80 p-6 md:p-8 shadow-sm">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-800">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-primary-950 mb-4">{labelResult}</h2>
                    <div className="text-[15px] md:text-base">{renderBlocks(caseStudy.result)}</div>
                  </article>
                </div>
              </section>
            ) : (
              <>
                {caseStudy.challenge && caseStudy.challenge.length > 0 ? (
                  <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <div className="lg:col-span-6">
                      <SectionLabel>01 — Challenge</SectionLabel>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-950 mb-6">{labelChallenge}</h2>
                      <div className="text-[15px] md:text-lg">{renderBlocks(caseStudy.challenge)}</div>
                    </div>
                    {challengeImage ? (
                      <div className="lg:col-span-6">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary-200/60 shadow-lg">
                          <ResponsiveImage
                            image={challengeImage as any}
                            alt={`${caseStudy.title} — challenge`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ) : null}
                  </section>
                ) : null}

                {caseStudy.solution && caseStudy.solution.length > 0 ? (
                  <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {solutionImage ? (
                      <div className="lg:col-span-6 order-2 lg:order-1">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary-200/60 shadow-lg">
                          <ResponsiveImage
                            image={solutionImage as any}
                            alt={`${caseStudy.title} — solution`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ) : null}
                    <div className={cn('lg:col-span-6', solutionImage ? 'order-1 lg:order-2' : 'lg:col-span-12')}>
                      <SectionLabel>02 — Approach</SectionLabel>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-950 mb-6">{labelSolution}</h2>
                      <div className="text-[15px] md:text-lg">{renderBlocks(caseStudy.solution)}</div>
                    </div>
                  </section>
                ) : null}

                {caseStudy.result && caseStudy.result.length > 0 ? (
                  <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <div className="lg:col-span-6">
                      <SectionLabel>03 — Outcome</SectionLabel>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-950 mb-6">{labelResult}</h2>
                      <div className="text-[15px] md:text-lg">{renderBlocks(caseStudy.result)}</div>
                    </div>
                    {resultImage ? (
                      <div className="lg:col-span-6">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary-200/60 shadow-lg">
                          <ResponsiveImage
                            image={resultImage as any}
                            alt={`${caseStudy.title} — result`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ) : null}
                  </section>
                ) : null}
              </>
            )}

            {/* Optional highlight bands */}
            {highlights?.map((h, i) => {
              const img = normalizeCaseStudyImage(h.image)
              const textFirst = h.imagePosition === 'left'
              return (
                <section
                  key={`${h.title}-${i}`}
                  className="rounded-3xl border border-primary-200/50 bg-gradient-to-br from-white via-primary-50/30 to-white p-8 md:p-12 shadow-sm"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    <div className={cn(textFirst ? 'lg:order-2' : 'lg:order-1')}>
                      <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-800">
                        {h.eyebrow}
                      </span>
                      <h3 className="mt-4 font-serif text-2xl md:text-3xl font-bold text-primary-950">{h.title}</h3>
                      {h.description.split(/\n\n+/).map((para, pi) => (
                        <p key={pi} className="mt-4 text-primary-800 leading-relaxed text-[15px] md:text-base">
                          {para}
                        </p>
                      ))}
                    </div>
                    {img ? (
                      <div
                        className={cn(
                          'relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary-200/60 shadow-md',
                          textFirst ? 'lg:order-1' : 'lg:order-2'
                        )}
                      >
                        <ResponsiveImage image={img as any} alt={h.title} fill className="object-cover" />
                      </div>
                    ) : null}
                  </div>
                </section>
              )
            })}

            {caseStudy.testimonial?.quote ? (
              <section className="relative overflow-hidden rounded-3xl border border-primary-200/60 bg-primary-950 px-8 py-12 md:px-14 md:py-16 text-center">
                <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,#fff_0,transparent_45%),radial-gradient(circle_at_80%_80%,#4fa2a2_0,transparent_40%)]" />
                <blockquote className="relative font-serif text-xl md:text-2xl lg:text-3xl text-white/95 leading-snug max-w-3xl mx-auto">
                  &ldquo;{caseStudy.testimonial.quote}&rdquo;
                </blockquote>
                <footer className="relative mt-8">
                  <p className="font-semibold text-primary-100">{caseStudy.testimonial.author}</p>
                  {caseStudy.testimonial.role ? (
                    <p className="text-sm text-primary-300/90 mt-1">{caseStudy.testimonial.role}</p>
                  ) : null}
                </footer>
              </section>
            ) : null}

            {caseStudy.productsUsed && caseStudy.productsUsed.length > 0 ? (
              <section>
                <SectionLabel>Products</SectionLabel>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-950 mb-8">Featured in this project</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {caseStudy.productsUsed.map((product) => (
                    <div
                      key={product._id}
                      className="rounded-2xl border border-primary-200/70 bg-white p-5 shadow-sm hover:border-primary-300 transition-colors"
                    >
                      <p className="font-serif font-semibold text-primary-950">{product.title}</p>
                      {product.sku ? <p className="text-sm text-primary-600 mt-1">SKU {product.sku}</p> : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {hasGallery ? (
              <section>
                <SectionLabel>Gallery</SectionLabel>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-950 mb-8">Project imagery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {caseStudy.showcase && caseStudy.showcase.length > 0
                    ? caseStudy.showcase.map((item, idx) => {
                        const showcaseImg = normalizeCaseStudyImage(item.image)
                        return (
                          <div
                            key={idx}
                            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary-200/60 bg-primary-100 shadow-sm"
                          >
                            {item.type === 'image' && showcaseImg ? (
                              <ResponsiveImage
                                image={showcaseImg as any}
                                alt={`${caseStudy.title} — ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                              />
                            ) : item.videoUrl ? (
                              <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                                <source src={item.videoUrl} type="video/mp4" />
                              </video>
                            ) : null}
                          </div>
                        )
                      })
                    : (caseStudy.gallery ?? []).map((image: unknown, idx: number) => {
                        const gImg = normalizeCaseStudyImage(image)
                        if (!gImg) return null
                        return (
                          <div
                            key={idx}
                            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary-200/60 bg-primary-100 shadow-sm"
                          >
                            <ResponsiveImage
                              image={gImg as any}
                              alt={`${caseStudy.title} — ${idx + 1}`}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                          </div>
                        )
                      })}
                </div>
              </section>
            ) : null}

            {/* CTA */}
            <section className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pb-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-primary-950 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-900 hover:shadow-xl"
              >
                Start a similar project
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary-300 bg-white px-8 py-3.5 text-sm font-semibold text-primary-950 transition hover:border-primary-500 hover:bg-primary-50"
              >
                More case studies
              </Link>
            </section>
          </div>
        </Container>
      </div>
    </div>
  )
}
