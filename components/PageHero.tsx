import { Container } from './Container'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
  contentClassName?: string
}

export function PageHero({
  title,
  subtitle,
  className,
  titleClassName,
  contentClassName,
}: PageHeroProps) {
  return (
    <section className={cn('pt-32 pb-16 md:pt-40 md:pb-24', className)}>
      <Container>
        <div className={cn('max-w-3xl', contentClassName)}>
          <h1
            className={cn(
              'font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-balance break-words',
              titleClassName,
            )}
            style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
          >
            {title}
          </h1>
        </div>
      </Container>
    </section>
  )
}

