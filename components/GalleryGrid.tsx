'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { waLink } from '@/lib/siteContent'
import { useSiteContact } from '@/components/SiteContactProvider'
import { PhotoPopup } from '@/components/PhotoPopup'

export type GalleryPhoto = {
  id: string
  src: string
  alt: string
  description?: string
  category?: string
  categories?: string[]
  categoryLabel?: string
}

export type GalleryFilterOption = { id: string; label: string }

export function GalleryGrid({ photos, filters }: { photos: GalleryPhoto[]; filters?: GalleryFilterOption[] }) {
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState<GalleryPhoto | null>(null)
  const contact = useSiteContact()
  const categories = useMemo(() => {
    if (filters?.length) return filters
    const labels = new Map<string, string>()
    photos.forEach((photo) => {
      if (photo.category && photo.categoryLabel) labels.set(photo.category, photo.categoryLabel)
    })
    return [...labels.entries()].map(([id, label]) => ({ id, label }))
  }, [filters, photos])
  const visible = filter === 'all' ? photos : photos.filter((photo) => {
    const ids = photo.categories?.length ? photo.categories : photo.category ? [photo.category] : []
    return ids.includes(filter)
  })
  const enquire = waLink(
    open
      ? `Hi Fab Seating, I want to enquire about ${open.alt}.`
      : 'Hi Fab Seating, I want to enquire about a piece from your gallery.',
    contact.whatsapp,
  )

  return (
    <>
      {categories.length > 0 ? (
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="toolbar" aria-label="Filter gallery by category">
          {[{ id: 'all', label: 'All' }, ...categories].map((item) => {
            const active = filter === item.id
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'border-primary-950 bg-primary-950 text-white'
                    : 'border-primary-200 bg-white text-primary-900 hover:border-primary-950 hover:bg-primary-50'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      ) : null}

      {visible.length > 0 ? (
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {visible.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setOpen(photo)}
              className="relative aspect-[4/3] rounded-2xl bg-[#f4f1ea] p-2 text-left shadow-sm ring-1 ring-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 sm:p-3"
            >
              <span className="relative block h-full w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="33vw"
                  className="object-contain"
                />
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-primary-700">No photos in this category yet.</p>
      )}

      {open ? (
        <PhotoPopup
          title={open.alt}
          description={open.description}
          imageSrc={open.src}
          enquireHref={enquire}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  )
}
