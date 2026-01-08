import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { EnquiryForm } from '@/components/EnquiryForm'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 86400

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us',
  description: 'Get in touch with FabSeating',
  path: '/contact',
})

export default async function ContactPage() {
  const processSteps = [
    {
      title: 'Consultation',
      description: 'We start by understanding your space, requirements, and vision through detailed discussions.',
    },
    {
      title: 'Design and Selection',
      description: 'Our team creates design proposals and helps you select furniture and furnishings that match your style and needs.',
    },
    {
      title: 'Manufacturing and Sourcing',
      description: 'We manufacture custom pieces in-house and source quality furnishings from trusted partners.',
    },
    {
      title: 'Quality Checks',
      description: 'Every piece undergoes rigorous quality checks to ensure it meets our high standards before delivery.',
    },
    {
      title: 'Delivery and Installation',
      description: 'We handle delivery and professional installation, ensuring everything is placed perfectly in your space.',
    },
    {
      title: 'After Sales Support',
      description: 'Our relationship continues after installation with ongoing support, maintenance, and care guidance.',
    },
  ]

  return (
    <>
      <PageHero
        title="Let's discuss your requirement"
        subtitle="Get in touch with our team to start your furniture and furnishings journey"
      />
      <Section>
        <div className="max-w-6xl mx-auto space-y-16">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-primary-950 text-center">
              How We Work
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="p-6 rounded-2xl bg-primary-50/50 border border-primary-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-950 text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-primary-950">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-primary-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

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

