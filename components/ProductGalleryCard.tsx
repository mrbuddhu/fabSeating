'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProductImage } from '@/lib/sanity/queries'
import { waLink } from '@/lib/siteContent'
import { useSiteContact } from '@/components/SiteContactProvider'
import { PhotoPopup } from '@/components/PhotoPopup'

export function ProductGalleryCard({ product, variant = 'card' }: { product: ProductImage; variant?: 'card' | 'photo' | 'frame' }) {
  const [open, setOpen] = useState(false)
  const contact = useSiteContact()
  const enquire = waLink(`Hi Fab Seating, I want to enquire about ${product.title}.`, contact.whatsapp)

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
        className={variant === 'card'
          ? 'group w-full cursor-pointer overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-primary-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,44,45,0.14)] hover:ring-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700'
          : 'group w-full cursor-pointer overflow-hidden rounded-2xl bg-[#f3efe8] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c3f38]'}
      >
          <div className={variant === 'card' ? 'relative aspect-square bg-[#f7f5f0]' : 'relative aspect-[16/10] bg-[#f3efe8]'}>
            <Image
              src={product.src}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 40vw"
              className={variant === 'frame' ? 'object-cover transition-transform duration-700 motion-safe:group-hover:scale-105' : 'object-contain p-3 transition-transform duration-700 motion-safe:group-hover:scale-105'}
            />
          </div>
          {variant === 'frame' ? null : (
            <div className={variant === 'photo' ? 'px-1 py-3 text-center' : 'p-3 md:p-4'}>
              <h2 className="break-words font-serif text-base font-semibold leading-snug text-primary-950 md:text-lg">{product.title}</h2>
              {product.description ? (
                <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-gray-600">{product.description}</p>
              ) : null}
            </div>
          )}
      </article>

      {open ? (
        <PhotoPopup
          title={product.title}
          description={product.description}
          imageSrc={product.src}
          enquireHref={enquire}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  )
}
