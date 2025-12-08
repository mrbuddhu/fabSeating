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
  heroVideos?: { src: string; title?: string }[]
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
  const slides = heroVideos.length > 0 ? heroVideos : videoUrl ? [{ src: videoUrl }] : []

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
                  <div className="absolute inset-0">
                    {slide.src ? (
                      <video
                        className="h-full w-full object-cover"
                        src={slide.src}
                        autoPlay
                        loop
                        muted
                        playsInline
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
                    <div className="absolute inset-0 bg-primary-950/60" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 pt-8 md:px-12 md:pb-14 md:pt-14 lg:px-16 lg:pb-16 lg:pt-16">
                    <div className="space-y-5 md:space-y-6">
                      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary-50 backdrop-blur">
                        Premium Since 2003
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <motion.h1
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          className="font-serif text-4xl leading-tight md:text-6xl lg:text-7xl"
                        >
                          {heroData.title}
                        </motion.h1>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="max-w-2xl text-lg text-primary-100 md:text-xl"
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

                      <div className="flex flex-wrap gap-3 text-sm text-primary-100">
                        {trustIndicators.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur"
                          >
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {slide.title && (
                      <div className="mt-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-primary-50 backdrop-blur">
                          {slide.title}
                        </div>
                      </div>
                    )}
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

