import type { Metadata } from 'next'
import { generateSEOMetadata } from '@/components/SEOHead'
import { BlogPostRenderer } from '@/app/blog/_components/BlogPostRenderer'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Made-to-Order vs. Ready-Made Furniture: Which Is Better for Your Home?',
  description:
    'A clear, honest comparison of made-to-order and ready-made furniture — covering cost, durability, space fit, climate suitability, and who each option genuinely suits.',
  path: '/blog/fab-seating-custom-vs-readymade',
})

export default function CustomVsReadyMadePage() {
  return <BlogPostRenderer slug="fab-seating-custom-vs-readymade" />
}

