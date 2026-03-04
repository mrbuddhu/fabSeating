import type { Metadata } from 'next'
import { generateSEOMetadata } from '@/components/SEOHead'
import { BlogPostRenderer } from '@/app/blog/_components/BlogPostRenderer'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Why Large Projects Require Integrated Furniture & Furnishing Solutions',
  description:
    'Why villas, offices, hotels, and institutions need integrated furniture and furnishing solutions — and what fragmented sourcing really costs at scale.',
  path: '/blog/fab-seating-integrated-solutions',
})

export default function IntegratedSolutionsPage() {
  return <BlogPostRenderer slug="fab-seating-integrated-solutions" />
}

