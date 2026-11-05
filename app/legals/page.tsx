import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { LegalDocument } from '@/components/LegalDocument'
import { generateSEOMetadata } from '@/components/SEOHead'
import { legalBlocks } from '@/lib/legalCopy'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Legals',
  description: 'Fab Seating privacy policy and website terms, last updated 1 November 2026.',
  path: '/legals',
})

export default function LegalsPage() {
  return (
    <>
      <PageHero title="Legals" />
      <Section className="pt-3 md:pt-4">
        <LegalDocument blocks={legalBlocks} />
      </Section>
    </>
  )
}
