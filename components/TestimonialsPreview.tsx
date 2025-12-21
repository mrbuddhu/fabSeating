import Link from 'next/link'
import { Section } from './Section'
import { TestimonialCard } from './TestimonialCard'
import { Reveal } from './Reveal'
import type { Testimonial } from '@/types'

interface TestimonialsPreviewProps {
  testimonials?: Testimonial[]
}

export function TestimonialsPreview({ testimonials = [] }: TestimonialsPreviewProps) {
  if (testimonials.length === 0) return null

  return (
    <Section>
      <div className="mb-12 text-center">
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-primary-950 tracking-tight">What Our Clients Say</h2>
        <p className="text-primary-700 max-w-2xl mx-auto text-lg md:text-xl">
          Trusted by homeowners and designers worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.slice(0, 4).map((testimonial, idx) => (
          <Reveal key={testimonial._id} delay={idx * 80}>
            <TestimonialCard testimonial={testimonial} className="rounded-3xl bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)] p-6" />
          </Reveal>
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

