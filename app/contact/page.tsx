import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { EnquiryForm } from '@/components/EnquiryForm'
import { getContactPageContent, getSiteSettings } from '@/lib/sanity/queries'
import { filled } from '@/lib/siteContent'
import { metadataForPath } from '@/lib/pageMetadata'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactPageContent()
  return metadataForPath('/contact', 'Contact Us', 'Get in touch with Fab Seating', content?.seo)
}

export default async function ContactPage() {
  const [content, settings] = await Promise.all([getContactPageContent(), getSiteSettings()])
  const address = settings.contact.addressLine

  return (
    <>
      <PageHero
        title={filled(content?.title, "What's your requirement?")}
        titleClassName="whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap"
        className="pb-10 md:pb-14"
      />
      {/* Compact explanation strip (replaces image strip) */}
      <section className="bg-primary-950 text-primary-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-5">
          <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2">
            {filled(content?.afterTitle, 'What happens after you contact us')}
          </h2>
          <p className="text-sm md:text-base text-primary-100 leading-relaxed">
            {filled(content?.afterBody, "Once you reach out, our team will get back to you within 24 hours. We'll schedule a consultation to understand your requirements, discuss your vision, and provide initial recommendations. From there, we'll guide you through our process, keeping you informed at every step until your space is complete.")}
          </p>
        </div>
      </section>
      <Section className="pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-4 text-primary-700">
                <p>
                  <strong>Email:</strong> {settings.contact.email}
                </p>
                <p>
                  <strong>Phone:</strong> {settings.contact.phoneDisplay}
                </p>
                <p>
                  <strong>Address:</strong><br />
                  {address}
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

