import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { EnquiryForm } from '@/components/EnquiryForm'
import { generateSEOMetadata } from '@/components/SEOHead'

/** Short link from Google Maps “Share” — opens the saved place in Maps (not for iframe embed). */
const GOOGLE_MAPS_OPEN_LINK = 'https://share.google/BYpJogg5iF7lQ5LYI'

const MAP_ADDRESS_QUERY =
  '428 Kilpauk Garden Road, Aspiran Garden Colony, Kilpauk, Chennai, Tamil Nadu 600010, India'

export const revalidate = 86400

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Fab Seating',
  path: '/contact',
})

export default function ContactPage() {
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
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 lg:items-stretch">
            <div className="flex flex-col min-h-0 lg:h-full">
              <h2 className="font-serif text-2xl font-semibold mb-4 md:mb-5 shrink-0">Get in Touch</h2>
              <div className="space-y-3 text-sm sm:text-base text-primary-700 shrink-0">
                <p>
                  <strong className="text-primary-950">Email:</strong> info@fabseating.com
                </p>
                <p>
                  <strong className="text-primary-950">Phone:</strong> 098410 66135
                </p>
                <p>
                  <strong className="text-primary-950">Address:</strong>
                  <br />
                  428, Kilpauk Garden Road, Aspiran Garden Colony
                  <br />
                  Kilpauk, Chennai, Tamil Nadu 600010
                </p>
              </div>

              <div className="mt-6 flex flex-col flex-1 min-h-[240px] lg:min-h-0">
                <h3 className="font-serif text-lg font-semibold text-primary-950 mb-2 shrink-0">Find us</h3>
                <div className="rounded-xl overflow-hidden border border-primary-200 shadow-sm bg-primary-50/50 flex-1 min-h-[200px] w-full">
                  <iframe
                    title="Fab Seating on Google Maps"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_ADDRESS_QUERY)}&output=embed`}
                    className="w-full h-full min-h-[200px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <a
                  href={GOOGLE_MAPS_OPEN_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm font-medium text-primary-600 hover:text-primary-800 underline underline-offset-2 shrink-0"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
            <div className="flex flex-col min-h-0 lg:h-full">
              <h2 className="font-serif text-2xl font-semibold mb-4 md:mb-5 shrink-0">Send Us a Message</h2>
              <EnquiryForm originPage="/contact" layout="stretch" />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

