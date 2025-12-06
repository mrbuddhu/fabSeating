import { Container } from '@/components/Container'

export default function Loading() {
  return (
    <Container className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-950 rounded-full animate-spin" />
        <p className="mt-4 text-primary-700">Loading...</p>
      </div>
    </Container>
  )
}

