'use client'

import Image from 'next/image'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'
import { defaultCatalogueCopy, type CataloguePageCopy } from '@/lib/cataloguePageCopy'

export type CatalogueCard = {
  id: string
  title: string
  eyebrow?: string
  description?: string
  coverUrl?: string
  alt: string
  fileUrl?: string
  downloadName: string
}

function downloadHref(fileUrl: string, name: string) {
  const join = fileUrl.includes('?') ? '&' : '?'
  return `${fileUrl}${join}dl=${encodeURIComponent(name)}`
}

export function CataloguesView({ catalogues, copy = defaultCatalogueCopy }: { catalogues: CatalogueCard[]; copy?: CataloguePageCopy }) {
  return (
    <>
      <section className="grainy-gradient text-white pt-28 pb-4 md:pt-36 md:pb-6">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-200">{copy.eyebrow}</p>
          <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-primary-50 md:text-5xl">{copy.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-100 md:text-base">
            {copy.description}
          </p>
          <a
            href="#available-catalogues"
            className="mt-6 inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-primary-950"
          >
            {copy.exploreLabel}
          </a>
        </div>
      </section>

      <section id="available-catalogues" className="scroll-mt-36 bg-white pb-14 pt-4 md:scroll-mt-40 md:pb-20 md:pt-6">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-950 md:text-4xl">{copy.sectionTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
              {copy.sectionDescription}
            </p>
          </div>

          {catalogues.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {catalogues.map((item) => (
                <article key={item.id} className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-primary-100 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(26,44,45,0.08)]">
                  <div className="relative aspect-[4/3] bg-primary-50">
                    {item.coverUrl ? (
                      <Image src={item.coverUrl} alt={item.alt} fill sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw" className="object-cover" />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {item.eyebrow ? (
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-600">{item.eyebrow}</p>
                    ) : null}
                    <h3 className="mt-1 font-serif text-xl font-semibold text-primary-950">{item.title}</h3>
                    {item.description ? (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{item.description}</p>
                    ) : (
                      <div className="flex-1" />
                    )}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.fileUrl ? (
                        <>
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('view_catalogue', { catalogue_name: item.title })}
                            className="inline-flex items-center rounded-full bg-primary-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-primary-800"
                          >
                            View Catalogue
                          </a>
                          <a
                            href={downloadHref(item.fileUrl, item.downloadName)}
                            download={item.downloadName}
                            onClick={() => trackEvent('download_catalogue', { catalogue_name: item.title })}
                            className="inline-flex items-center rounded-full border border-primary-200 px-4 py-2.5 text-xs font-semibold text-primary-900 transition hover:bg-primary-50"
                          >
                            Download Catalogue
                          </a>
                        </>
                      ) : (
                        <span className="text-xs font-semibold text-primary-600">Catalogue coming soon</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-600">Catalogues will appear here once they are published.</p>
          )}
        </div>
      </section>

      <section className="bg-white pb-6 md:pb-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grainy-gradient flex flex-col items-start justify-between gap-6 rounded-3xl px-6 py-8 text-primary-50 shadow-[0_18px_50px_rgba(0,0,0,0.12)] md:flex-row md:items-center md:px-10">
            <div className="max-w-xl">
              <h2 className="font-serif text-2xl font-bold text-primary-50 md:text-3xl">{copy.helpTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-primary-100 md:text-base">
                {copy.helpBody}
              </p>
            </div>
            <a
              href={copy.enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-950 transition hover:bg-primary-50"
            >
              <svg className="h-5 w-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.514-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              {copy.helpButton}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary-950 md:text-4xl">{copy.visitTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
            {copy.visitBody}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={copy.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-primary-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-800">
              {copy.directionsLabel}
            </a>
            <Link href="/contact" className="inline-flex items-center rounded-full border border-primary-300 px-6 py-3 text-sm font-semibold text-primary-900 transition hover:bg-primary-50">
              {copy.contactLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
