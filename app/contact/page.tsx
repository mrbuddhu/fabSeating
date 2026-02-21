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
      {/* Craft & execution strip (from Sanity Contact Page or fallback) */}
      <section className="bg-primary-950 text-primary-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex-1 grid grid-cols-3 gap-3">
            {stripImages ? (
              stripImages.slice(0, 3).map((img: any, i: number) => (
                <div key={i} className="relative h-20 md:h-24 rounded-xl overflow-hidden bg-primary-900/40">
                  <ResponsiveImage image={img} alt={img.alt || `Strip image ${i + 1}`} fill className="object-cover" />
                </div>
              ))
            ) : (
              defaultStripImages.map((img, i) => (
                <div key={i} className="relative h-20 md:h-24 rounded-xl overflow-hidden bg-primary-900/40">
                  <Image src={img.url} alt={img.alt} fill className="object-cover" />
                </div>
              ))
            )}
          </div>
          <p className="flex-1 text-sm md:text-base text-primary-100 leading-relaxed">
            From carpentry and upholstery to on-site painting and finishing, our team handles every stage of execution with the same care and detail you see in the final space.
          </p>
        </div>
      </section>
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

