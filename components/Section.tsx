import { Container } from './Container'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export function Section({
  children,
  className,
  containerClassName,
  containerSize = '2xl',
}: SectionProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}

