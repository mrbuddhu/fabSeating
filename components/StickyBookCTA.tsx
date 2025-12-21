import Link from 'next/link'

export function StickyBookCTA() {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-white/5 px-5 py-3 text-sm font-semibold text-primary-50 shadow-[0_18px_45px_rgba(0,0,0,0.3)] border border-white/30 backdrop-blur-xl transition transform hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(0,0,0,0.35)]"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-950 text-xs font-bold shadow-inner shadow-black/30">
          ✦
        </span>
        <span className="text-primary-900 font-semibold">Book a Design Visit</span>
      </Link>
    </div>
  )
}

