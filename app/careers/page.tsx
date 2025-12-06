import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { generateSEOMetadata } from '@/components/SEOHead'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Careers',
  description: 'Join the FabSeating team',
  path: '/careers',
})

export default async function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers"
        subtitle="Join our team of passionate craftspeople"
      />
      <Section>
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-primary-700 leading-relaxed mb-6">
            At FabSeating, we are always looking for talented individuals who share our passion
            for excellence and craftsmanship. We offer opportunities in design, manufacturing,
            sales, and customer service.
          </p>
          <p className="text-primary-700 leading-relaxed mb-6">
            If you are interested in joining our team, please send your resume and cover letter
            to careers@fabseating.com. We look forward to hearing from you.
          </p>
          <div className="mt-8">
            <h3 className="font-serif text-xl font-semibold mb-4">Current Openings</h3>
            <p className="text-primary-700">
              We are currently accepting applications for all positions. Please check back
              regularly for specific job postings.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}

