import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { EnquiryForm } from '@/components/EnquiryForm'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 86400

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Fab Seating',
  path: '/contact',
})

export default async function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's discuss your requirement"
        subtitle="Get in touch with our team to start your furniture and furnishings journey"
        titleClassName="whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap"
      />
      <Section>
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="bg-primary-50/30 rounded-2xl p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4 text-primary-950">
              What happens after you contact us
            </h2>
            <p className="text-primary-700 leading-relaxed mb-6">
              Once you reach out, our team will get back to you within 24 hours. We&apos;ll schedule a consultation 
              to understand your requirements, discuss your vision, and provide initial recommendations. From there, 
              we&apos;ll guide you through our process, keeping you informed at every step until your space is complete.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
        </div>
      </Section>
    </>
  )
}

