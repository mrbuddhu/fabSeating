import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { LegalDocument } from '@/components/LegalDocument'
import { legalBlocks } from '@/lib/legalCopy'
import { getLegalDocument } from '@/lib/sanity/queries'
import { metadataForPath } from '@/lib/pageMetadata'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDocument('legals')
  return metadataForPath(
    '/legals',
    'Legals',
    'Fab Seating privacy policy and website terms, last updated 1 November 2026.',
    doc?.seo,
  )
}

export default async function LegalsPage() {
  const doc = await getLegalDocument('legals')
  const blocks = doc?.blocks?.filter((block: { text?: string }) => block.text?.trim())?.length ? doc.blocks : legalBlocks
  return (
    <>
      <PageHero title="Legals" />
      <Section className="pt-3 md:pt-4">
        <LegalDocument blocks={blocks} />
      </Section>
    </>
  )
}
