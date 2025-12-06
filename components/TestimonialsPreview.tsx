import Link from 'next/link'
import { Section } from './Section'
import { TestimonialCard } from './TestimonialCard'
import type { Testimonial } from '@/types'

interface TestimonialsPreviewProps {
  testimonials?: Testimonial[]
}

export function TestimonialsPreview({ testimonials = [] }: TestimonialsPreviewProps) {
  if (testimonials.length === 0) return null

  return (
    <Section>
      <div className="mb-12 text-center">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-primary-700 max-w-2xl mx-auto">
          Trusted by homeowners and designers worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial._id} testimonial={testimonial} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/testimonials"
          className="inline-block px-8 py-3 border-2 border-primary-950 text-primary-950 hover:bg-primary-950 hover:text-primary-50 transition-colors font-medium"
        >
          Read More Testimonials
        </Link>
      </div>
    </Section>
  )
}

