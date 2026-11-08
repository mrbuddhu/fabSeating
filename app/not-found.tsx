import Link from 'next/link'
import { getSiteSettings } from '@/lib/sanity/queries'

export default async function NotFound() {
  const settings = await getSiteSettings()
  const labels = settings.labels
  const waysIn = [
    { href: '/', label: labels.menuHome },
    { href: '/#solutions', label: labels.menuExplore },
    { href: '/projects', label: labels.menuGallery },
    { href: '/catalogues', label: labels.menuCatalogues },
    { href: '/contact', label: labels.menuContact },
  ]

  return (
    <section className="px-4 pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="mx-auto max-w-3xl rounded-3xl bg-[#f6f1e8] px-6 py-14 text-center shadow-[0_12px_40px_rgba(26,44,45,0.08)] md:px-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-700">{labels.notFoundEyebrow}</p>
        <h1 className="mt-4 font-serif text-7xl font-bold leading-none text-primary-950 md:text-8xl">404</h1>
        <p className="mt-5 font-serif text-3xl font-semibold text-primary-950 md:text-4xl">{labels.notFoundTitle}</p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-800">
          {labels.notFoundBody}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-primary-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-800"
          >
            {labels.notFoundHome}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-primary-300 bg-white px-6 py-3 text-sm font-semibold text-primary-950 transition hover:bg-primary-50"
          >
            {labels.notFoundContact}
          </Link>
        </div>
        <nav aria-label="Find your way" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-primary-800">
          {waysIn.map((item) => (
            <Link key={item.href} href={item.href} className="underline-offset-4 hover:text-primary-950 hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
