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
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297.839-1.457 1.54-2.03 1.64-.545.093-1.243.134-2.02-.124-.474-.153-1.085-.35-1.879-.828-3.307-1.977-5.463-5.577-5.627-5.842-.163-.264-1.348-1.795-1.348-3.424 0-1.63.859-2.429 1.164-2.763.306-.334.669-.418.892-.418.223 0 .446.003.641.012.206.01.48-.078.75.57.297.693 1 2.404 1.086 2.58.086.176.143.382.026.617-.116.235-.176.382-.345.588-.173.206-.363.461-.518.62-.173.176-.353.37-.152.735.202.364.9 1.48 1.937 2.392 1.334 1.154 2.452 1.51 2.816 1.671.364.161.577.147.787-.088.21-.235.904-1.056 1.148-1.418.244-.362.498-.304.83-.176.332.128 2.104.994 2.465 1.174.362.18.602.268.691.416.09.147.09.85-.207 1.689z"/>
            <path d="M12.004 2C6.485 2 2 6.486 2 12.005c0 2.103.691 4.055 1.872 5.64L3 22l4.5-1.856c1.53.84 3.287 1.325 5.004 1.325 5.519 0 10.004-4.486 10.004-10.004C22.508 6.486 17.523 2 12.004 2zm0 18.007c-1.52 0-3.018-.42-4.321-1.211l-.31-.185-2.554 1.053.547-2.63-.201-.322C4.267 15.532 3.996 13.8 3.996 12.005 3.996 7.586 7.585 3.997 12.004 3.997s8.008 3.589 8.008 8.008-3.59 8.002-8.008 8.002z"/>
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
