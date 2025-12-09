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
    <section className={cn('bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-primary-50', className)}>
      <Container>
        <div className="py-16 md:py-24 text-center max-w-4xl mx-auto">
          {data.title && (
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-primary-50">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              {data.subtitle}
            </p>
          )}
          {data.buttonLink && (
            <Link
              href={data.buttonLink}
              className="inline-block px-10 py-4 bg-primary-50 text-primary-950 hover:bg-primary-100 transition-colors font-semibold rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
            >
              {data.buttonText || 'Get Started'}
            </Link>
          )}
        </div>
      </Container>
    </section>
  )
}

