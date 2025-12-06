import { ResponsiveImage } from './ResponsiveImage'
import type { Testimonial } from '@/types'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div className={cn('bg-primary-50 p-6 md:p-8', className)}>
      {testimonial.rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'text-lg',
                i < testimonial.rating! ? 'text-accent-500' : 'text-primary-300'
              )}
            >
              ★
            </span>
          ))}
        </div>
      )}
      <p className="text-primary-700 mb-6 leading-relaxed italic">
        &quot;{testimonial.content}&quot;
      </p>
      <div className="flex items-center gap-4">
        {testimonial.image && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <ResponsiveImage
              image={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-semibold text-primary-950">{testimonial.name}</p>
          {(testimonial.role || testimonial.company) && (
            <p className="text-sm text-primary-600">
              {[testimonial.role, testimonial.company].filter(Boolean).join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

