import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { LegalDocument } from '@/components/LegalDocument'
import { policyBlocks } from '@/lib/legalCopy'
import { getLegalDocument } from '@/lib/sanity/queries'
import { metadataForPath } from '@/lib/pageMetadata'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDocument('policies')
  return metadataForPath(
    '/policies',
    'Policies',
    'Fab Seating policies for product enquiries, shipping, delivery, cancellations, returns, refunds and warranties.',
    doc?.seo,
  )
}

export default async function PoliciesPage() {
  const doc = await getLegalDocument('policies')
  const blocks = doc?.blocks?.filter((block: { text?: string }) => block.text?.trim())?.length ? doc.blocks : policyBlocks
  return (
    <>
      <PageHero title="Policies" />
      <Section className="pt-3 md:pt-4">
        <LegalDocument blocks={blocks} />
      </Section>
    </>
  )
}
