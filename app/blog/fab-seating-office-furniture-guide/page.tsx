import type { Metadata } from 'next'
import { generateSEOMetadata } from '@/components/SEOHead'
import { BlogPostRenderer } from '@/app/blog/_components/BlogPostRenderer'

export const metadata: Metadata = generateSEOMetadata({
  title: 'How to Choose Office Furniture for Growing Teams',
  description:
    'A practical, detailed guide to choosing office furniture that scales with your team — from ergonomics and modular layouts to storage, collaboration zones, and budget strategy.',
  path: '/blog/fab-seating-office-furniture-guide',
})

export default function OfficeFurnitureGuidePage() {
  return <BlogPostRenderer slug="fab-seating-office-furniture-guide" />
}

