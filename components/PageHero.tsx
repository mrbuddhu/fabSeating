import { Container } from './Container'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
}

export function PageHero({ title, subtitle, className }: PageHeroProps) {
  return (
    <section className={cn('pt-32 pb-16 md:pt-40 md:pb-24', className)}>
      <Container>
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-primary-700 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}

