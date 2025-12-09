'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ResponsiveImage } from './ResponsiveImage'
import type { SanityImage } from '@/types'

interface HomeHeroProps {
  data?: {
    title?: string
    subtitle?: string
    image?: SanityImage
    ctaText?: string
    ctaLink?: string
  }
  headline: string
  subheadline: string
  trustIndicators: string[]
  brands: string[]
  videoUrl?: string
  heroVideos?: { src: string; title?: string; poster?: string }[]
}

export function HomeHero({
  data,
  headline,
  subheadline,
  trustIndicators,
  brands,
  videoUrl,
  heroVideos = [],
}: HomeHeroProps) {
  const defaultData = {
    title: headline,
    subtitle: subheadline,
    ctaText: 'View Our Collection',
    ctaLink: '/products',
  }

  const heroData = { ...defaultData, ...data }
  const fallbackPoster =
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80'
  const slides =
    heroVideos.length > 0
      ? heroVideos
      : videoUrl
      ? [{ src: videoUrl, poster: fallbackPoster }]
      : []

  return (
    <section className="relative pt-[7.5rem] md:pt-[8.5rem] pb-12 md:pb-16">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="relative mx-auto max-w-screen-2xl overflow-hidden rounded-[28px] md:rounded-[32px] bg-primary-950 text-primary-50 shadow-[0_30px_90px_rgba(0,0,0,0.2)]">
          <div className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth no-scrollbar">
            {(slides.length ? slides : [{}]).map((slide, idx) => (
              <div
                key={slide.src ?? `fallback-${idx}`}
                className="relative min-w-full snap-start"
              >
                <div className="relative h-[88vh] md:h-[92vh] min-h-[560px] overflow-hidden rounded-[28px] md:rounded-[32px]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${(slide as any).poster || fallbackPoster})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {slide.src ? (
                      <video
                        className="h-full w-full object-cover"
                        src={slide.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        crossOrigin="anonymous"
                        poster={(slide as any).poster || fallbackPoster}
                      />
                    ) : heroData.image ? (
                      <ResponsiveImage
                        image={heroData.image}
                        alt=""
                        fill
                        priority
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600" />
                    )}
                    <div className="absolute inset-0 bg-primary-950/35" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 pt-8 md:px-12 md:pb-14 md:pt-14 lg:px-16 lg:pb-16 lg:pt-16">
                    <div className="space-y-4 rounded-2xl bg-black/25 p-4 md:p-6 backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                      <div className="space-y-3 md:space-y-4">
                        <motion.h1
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          className="font-serif text-4xl leading-tight md:text-6xl lg:text-7xl font-black drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)]"
                        >
                          {heroData.title}
                        </motion.h1>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="max-w-2xl text-lg md:text-xl font-semibold text-primary-50 drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
                        >
                          {heroData.subtitle}
                        </motion.p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {heroData.ctaLink && (
                          <Link
                            href={heroData.ctaLink}
                            className="inline-flex items-center justify-center rounded-full bg-primary-50 px-6 py-3 text-sm font-semibold text-primary-900 shadow-lg shadow-primary-900/30 transition hover:-translate-y-0.5 hover:shadow-xl"
                          >
                            {heroData.ctaText}
                          </Link>
                        )}
                        <Link
                          href="/projects"
                          className="inline-flex items-center justify-center rounded-full border border-primary-200/40 bg-white/10 px-6 py-3 text-sm font-semibold text-primary-50 backdrop-blur transition hover:bg-white/20"
                        >
                          View Our Work
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {slides.length > 1 && (
            <div className="pointer-events-none absolute inset-x-4 bottom-6 flex justify-center gap-2 md:inset-x-10">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className="h-2 w-2 rounded-full bg-white/40"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

