'use client'

import Link from 'next/link'
import { ResponsiveImage } from './ResponsiveImage'
import { AnimatedCard } from './AnimatedCard'
import type { SanityImage } from '@/types'

interface GalleryItemProps {
  id: string
  image: SanityImage
  title: string
  category: 'product' | 'project'
  link: string
  index: number
}

export function GalleryItem({ image, title, category, link, index }: GalleryItemProps) {
  return (
    <AnimatedCard index={index}>
      <Link
        href={link}
        className="group relative block aspect-square overflow-hidden rounded-2xl bg-primary-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1"
      >
        <ResponsiveImage
          image={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-white text-sm font-medium mb-1">{title}</p>
            <span className="text-xs text-white/80 uppercase tracking-wider">
              {category === 'product' ? 'Product' : 'Project'}
            </span>
          </div>
        </div>
      </Link>
    </AnimatedCard>
  )
}

