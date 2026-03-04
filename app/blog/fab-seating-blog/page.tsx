import type { Metadata } from 'next'
import { generateSEOMetadata } from '@/components/SEOHead'
import { BlogPostRenderer } from '@/app/blog/_components/BlogPostRenderer'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Top 10 Custom Furniture Trends in Chennai for 2026',
  description:
    'Discover the top 10 custom furniture trends shaping Chennai homes in 2026 — from breathable cane inserts and biophilic curves to climate-smart upholstery and heritage brass accents.',
  path: '/blog/fab-seating-blog',
})

export default function CustomFurnitureTrendsPage() {
  return <BlogPostRenderer slug="fab-seating-blog" />
}

