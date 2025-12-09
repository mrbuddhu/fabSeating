import Link from 'next/link'

export function StickyBookCTA() {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-primary-950 px-5 py-3 text-sm font-semibold text-primary-50 shadow-[0_18px_45px_rgba(0,0,0,0.25)] transition transform hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(0,0,0,0.3)]"
      >
        Book a Design Visit
      </Link>
    </div>
  )
}

