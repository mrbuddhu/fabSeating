import Link from 'next/link'
import { Container } from './Container'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('py-4 border-b border-primary-200', className)} aria-label="Breadcrumb">
      <Container>
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-primary-400">/</span>}
              {item.href && index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="text-primary-600 hover:text-primary-950 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(index === items.length - 1 ? 'text-primary-950 font-medium' : 'text-primary-600')}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  )
}

