'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container } from './Container'
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
}

export function HomeHero({ data }: HomeHeroProps) {
  const defaultData = {
    title: 'Crafting Excellence in Every Detail',
    subtitle: 'Premium furniture designed to transform your space',
    ctaText: 'Explore Collection',
    ctaLink: '/products',
  }

  const heroData = { ...defaultData, ...data }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {heroData.image && (
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            image={heroData.image}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-950/40" />
        </div>
      )}

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-primary-50 max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
            {heroData.title}
          </h1>
          {heroData.subtitle && (
            <p className="text-xl md:text-2xl mb-10 text-primary-100 leading-relaxed">
              {heroData.subtitle}
            </p>
          )}
          {heroData.ctaLink && (
            <Link
              href={heroData.ctaLink}
              className="inline-block px-8 py-4 bg-primary-50 text-primary-950 hover:bg-primary-100 transition-colors font-medium"
            >
              {heroData.ctaText}
            </Link>
          )}
        </motion.div>
      </Container>
    </section>
  )
}

