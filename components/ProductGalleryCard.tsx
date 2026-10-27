'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { ProductImage } from '@/lib/sanity/queries'
import { waLink } from '@/lib/siteContent'

function WhatsAppIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.514-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

export function ProductGalleryCard({ product }: { product: ProductImage }) {
  const [open, setOpen] = useState(false)
  const enquire = waLink(`Hi Fab Seating, I want to enquire about ${product.title}.`)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setOpen(true)
          }
        }}
        className="group w-full cursor-pointer overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-primary-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,44,45,0.14)] hover:ring-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
      >
          <div className="relative aspect-square bg-[#f7f5f0]">
            <Image
              src={product.src}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-3 transition-transform duration-700 motion-safe:group-hover:scale-105"
            />
          </div>
          <div className="p-3 md:p-4">
            <h2 className="font-serif text-base font-semibold leading-snug text-primary-950 md:text-lg">{product.title}</h2>
            {product.description ? (
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-600">{product.description}</p>
            ) : null}
          </div>
      </article>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-primary-950/60"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`product-${product.id || product.title}`}
            className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >
            <a
              href={enquire}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${product.title} on WhatsApp`}
              className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#1eb955]"
            >
              <WhatsAppIcon />
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close product details"
              className="absolute left-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary-950 shadow-md"
            >
              <span aria-hidden className="text-2xl leading-none">×</span>
            </button>
            <div className="relative aspect-square w-full shrink-0 bg-[#f7f5f0]">
              <Image src={product.src} alt={product.title} fill sizes="(max-width: 640px) 100vw, 512px" className="object-contain p-6" />
            </div>
            <div className="overflow-y-auto px-5 py-5 md:px-6">
              <h2 id={`product-${product.id || product.title}`} className="pr-2 font-serif text-2xl font-semibold text-primary-950">
                {product.title}
              </h2>
              {product.description ? (
                <p className="mt-3 text-base leading-relaxed text-gray-700">{product.description}</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
