import Link from 'next/link'
import { Section } from './Section'
import { TestimonialCard } from './TestimonialCard'
import { Reveal } from './Reveal'
import { GoogleReviewsWidget } from './GoogleReviewsWidget'
import type { Testimonial } from '@/types'

interface TestimonialsPreviewProps {
  testimonials?: Testimonial[]
  showGoogleReviews?: boolean
}

export function TestimonialsPreview({ testimonials = [], showGoogleReviews = false }: TestimonialsPreviewProps) {
  const hasTestimonials = testimonials.length > 0
  const showSection = hasTestimonials || showGoogleReviews

  if (!showSection) return null

  return (
    <Section>
      <div className="mb-12 text-center">
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-primary-950 tracking-tight">What Our Clients Say</h2>
        <p className="text-primary-700 max-w-2xl mx-auto text-lg md:text-xl">
          Trusted by homeowners and designers worldwide
        </p>
      </div>

      {hasTestimonials && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {testimonials.slice(0, 4).map((testimonial, idx) => (
            <Reveal key={testimonial._id} delay={idx * 80}>
              <TestimonialCard testimonial={testimonial} className="rounded-3xl bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)] p-6" />
            </Reveal>
          ))}
        </div>
      )}

      {showGoogleReviews && (
        <div className="mb-8">
          <div className="mb-6 text-center">
            <h3 className="font-serif text-2xl font-semibold text-primary-950 mb-2">Google Reviews</h3>
            <p className="text-primary-600 text-sm">See what customers are saying on Google</p>
          </div>
          <GoogleReviewsWidget maxReviews={4} />
        </div>
      )}

    </Section>
  )
}

