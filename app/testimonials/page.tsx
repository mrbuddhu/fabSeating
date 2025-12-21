import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { TestimonialCard } from '@/components/TestimonialCard'
import { getTestimonials } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 21600

export const metadata: Metadata = generateSEOMetadata({
  title: 'Testimonials',
  description: 'What our clients say about FabSeating',
  path: '/testimonials',
})

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <>
      <PageHero
        title="Testimonials"
        subtitle="Hear from our satisfied clients"
      />
      <Section>
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <p className="text-center text-primary-700 py-12">
            No testimonials available at the moment.
          </p>
        )}
      </Section>
    </>
  )
}

