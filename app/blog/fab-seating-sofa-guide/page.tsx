import type { Metadata } from 'next'
import { generateSEOMetadata } from '@/components/SEOHead'
import { BlogPostRenderer } from '@/app/blog/_components/BlogPostRenderer'

export const metadata: Metadata = generateSEOMetadata({
  title: 'How to Choose the Perfect Sofa for Your Living Room',
  description:
    'A practical, experience-backed sofa buying guide for Chennai homeowners — covering room sizing, frame quality, fabrics, cushions, and the most common mistakes to avoid.',
  path: '/blog/fab-seating-sofa-guide',
})

export default function SofaGuidePage() {
  return <BlogPostRenderer slug="fab-seating-sofa-guide" />
}

