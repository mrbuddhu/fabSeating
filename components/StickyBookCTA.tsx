import Link from 'next/link'

export function StickyBookCTA() {
  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-2 sm:gap-3">
      <a
        href="https://wa.me/15551234567?text=Hi%20Fab%20Seating%2C%20I%E2%80%99d%20like%20to%20book%20a%20design%20visit."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat"
        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-white/5 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-50 shadow-[0_18px_45px_rgba(0,0,0,0.3)] border border-white/30 backdrop-blur-xl transition transform hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(0,0,0,0.35)]"
      >
        <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md ring-1 ring-white/40 text-[#25D366] transition-all duration-300 group-hover:animate-bounce group-hover:scale-110">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="#25D366">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.514-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </span>
        <span className="text-primary-900 font-semibold">WhatsApp</span>
      </a>

      <a
        href="tel:+15551234567"
        aria-label="Call Fab Seating"
        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-white/5 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-50 shadow-[0_18px_45px_rgba(0,0,0,0.3)] border border-white/30 backdrop-blur-xl transition transform hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(0,0,0,0.35)]"
      >
        <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md ring-1 ring-white/40 text-primary-950 transition-all duration-300 group-hover:animate-bounce group-hover:scale-110">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.07 15.07 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.12.37 2.33.57 3.54.57a1 1 0 011 1v3.5a1 1 0 01-1 1C11.51 20.02 3.98 12.49 3.99 3.5a1 1 0 011-1H8.5a1 1 0 011 1c0 1.21.2 2.42.57 3.54a1 1 0 01-.25 1.05l-2.2 2.2z"/>
          </svg>
        </span>
        <span className="text-primary-900 font-semibold">Call Us</span>
      </a>
    </div>
  )
}
