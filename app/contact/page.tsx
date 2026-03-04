import { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { EnquiryForm } from '@/components/EnquiryForm'
import { generateSEOMetadata } from '@/components/SEOHead'
import { getContactPageContent } from '@/lib/sanity/queries'
import { ResponsiveImage } from '@/components/ResponsiveImage'

export const revalidate = 86400

const defaultStripImages = [
  { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80', alt: 'Carpenter working on wooden furniture' },
  { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80', alt: 'Upholstery and fabric detailing' },
  { url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80', alt: 'Finishing and paint work on site' },
]

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Fab Seating',
  path: '/contact',
})

export default async function ContactPage() {
  const content = await getContactPageContent()
  const stripImages = content?.stripImages?.length >= 3 ? content.stripImages : null

  return (
    <>
      <PageHero
        title="What's your requirement?"
        titleClassName="whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap"
      />
      {/* Compact explanation strip (replaces image strip) */}
      <section className="bg-primary-950 text-primary-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-5">
          <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2">
            What happens after you contact us
          </h2>
          <p className="text-sm md:text-base text-primary-100 leading-relaxed">
            Once you reach out, our team will get back to you within 24 hours. We&apos;ll schedule a consultation
            to understand your requirements, discuss your vision, and provide initial recommendations. From there,
            we&apos;ll guide you through our process, keeping you informed at every step until your space is complete.
          </p>
        </div>
      </section>
      <Section>
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-4 text-primary-700">
                <p>
                  <strong>Email:</strong> info@fabseating.com
                </p>
                <p>
                  <strong>Phone:</strong> 098410 66135
                </p>
                <p>
                  <strong>Address:</strong><br />
                  428, Kilpauk Garden Road, Aspiran Garden Colony<br />
                  Kilpauk, Chennai, Tamil Nadu 600010
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

