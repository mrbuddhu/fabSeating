import Link from 'next/link'
import { Container } from './Container'
import { cn } from '@/lib/utils'

interface CTAProps {
  data?: {
    title?: string
    subtitle?: string
    buttonText?: string
    buttonLink?: string
  }
  className?: string
}

export function CTA({ data, className }: CTAProps) {
  if (!data) {
    data = {
      title: 'Ready to Transform Your Space?',
      subtitle: 'Get in touch with us to discuss your furniture needs.',
      buttonText: 'Contact Us',
      buttonLink: '/contact',
    }
  }

  return (
    <section className={cn('bg-primary-950 text-primary-50', className)}>
      <Container>
        <div className="py-16 md:py-24 text-center max-w-3xl mx-auto">
          {data.title && (
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-lg md:text-xl text-primary-200 mb-8 leading-relaxed">
              {data.subtitle}
            </p>
          )}
          {data.buttonLink && (
            <Link
              href={data.buttonLink}
              className="inline-block px-8 py-4 bg-primary-50 text-primary-950 hover:bg-primary-100 transition-colors font-medium"
            >
              {data.buttonText || 'Get Started'}
            </Link>
          )}
        </div>
      </Container>
    </section>
  )
}

