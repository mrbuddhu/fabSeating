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
    <section className={cn('pb-0 pt-28 md:pb-0 md:pt-36', className)}>
      <Container>
        <div className={cn('max-w-3xl', contentClassName)}>
          <h1
            className={cn(
              'font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-balance break-words',
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

