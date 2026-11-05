import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { LegalDocument } from '@/components/LegalDocument'
import { generateSEOMetadata } from '@/components/SEOHead'
import { policyBlocks } from '@/lib/legalCopy'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Policies',
  description: 'Fab Seating policies for product enquiries, shipping, delivery, cancellations, returns, refunds and warranties.',
  path: '/policies',
})

export default function PoliciesPage() {
  return (
    <>
      <PageHero title="Policies" />
      <Section className="pt-3 md:pt-4">
        <LegalDocument blocks={policyBlocks} />
      </Section>
    </>
  )
}
