import Link from 'next/link'
import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <Container className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-6xl md:text-8xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8 text-primary-700">Page not found</p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-primary-950 text-primary-50 hover:bg-primary-900 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </Container>
  )
}

