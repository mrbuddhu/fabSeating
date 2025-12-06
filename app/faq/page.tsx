import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { FAQAccordion } from '@/components/FAQAccordion'
import { getFAQs } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 3600

export const metadata: Metadata = generateSEOMetadata({
  title: 'FAQ',
  description: 'Frequently asked questions about FabSeating',
  path: '/faq',
})

export default async function FAQPage() {
  const faqs = await getFAQs()

  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions"
      />
      <Section>
        <div className="max-w-3xl mx-auto">
          {faqs.length > 0 ? (
            <FAQAccordion faqs={faqs} />
          ) : (
            <p className="text-center text-primary-700 py-12">
              No FAQs available at the moment.
            </p>
          )}
        </div>
      </Section>
    </>
  )
}

