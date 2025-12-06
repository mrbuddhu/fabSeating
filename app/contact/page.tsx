import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { EnquiryForm } from '@/components/EnquiryForm'
import { generateSEOMetadata } from '@/components/SEOHead'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us',
  description: 'Get in touch with FabSeating',
  path: '/contact',
})

export default async function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you"
      />
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="font-serif text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-4 text-primary-700">
              <p>
                <strong>Email:</strong> info@fabseating.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong><br />
                123 Furniture Street<br />
                Design District, NY 10001
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold mb-6">Send Us a Message</h2>
            <EnquiryForm originPage="/contact" />
          </div>
        </div>
      </Section>
    </>
  )
}

