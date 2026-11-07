'use client'

import { useEffect, useId } from 'react'
import Image from 'next/image'

function WhatsAppIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.514-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

export function PhotoPopup({
  title,
  description,
  imageSrc,
  enquireHref,
  onClose,
}: {
  title: string
  description?: string
  imageSrc: string
  enquireHref: string
  onClose: () => void
}) {
  const titleId = useId()
  const text = description?.trim() && description.trim() !== title.trim() ? description.trim() : undefined

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6" role="presentation">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-primary-950/60" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:h-[min(820px,88vh)] md:max-w-5xl md:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute left-3 top-3 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary-950 shadow-md"
        >
          <span aria-hidden className="text-2xl leading-none">×</span>
        </button>
        <div className="relative h-[34vh] min-h-[168px] w-full shrink-0 bg-[#f7f5f0] md:h-full md:min-h-0 md:w-[54%]">
          <Image src={imageSrc} alt={title} fill sizes="(max-width: 768px) 100vw, 560px" className="object-contain p-4 md:p-8" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col px-5 pb-5 pt-4 md:px-8 md:py-8">
          <h2 id={titleId} className="shrink-0 break-words font-serif text-2xl font-semibold leading-snug text-primary-950 md:text-3xl">
            {title}
          </h2>
          {text ? (
            <div className="mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <p className="whitespace-pre-line break-words text-base leading-relaxed text-gray-700">{text}</p>
            </div>
          ) : (
            <div className="min-h-0 flex-1" />
          )}
          <a
            href={enquireHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1eb955]"
          >
            <WhatsAppIcon />
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
