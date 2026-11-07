'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductGalleryCard } from './ProductGalleryCard'
import type { CategoryLandingModel, LandingImage } from '@/lib/categoryLandingContent'

function Photo({ image, className, sizes }: { image: LandingImage; className?: string; sizes: string }) {
  return (
    <Image src={image.src} alt={image.alt} fill sizes={sizes} className={className || (image.fit === 'contain' ? 'object-contain p-8' : 'object-cover')} />
  )
}

function Arrow() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

const lifestyleIcons = [
  <svg key="seat" viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 28h32v5a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3v-5z" /><path d="M12 28V18a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v10" /><path d="M8 28c2-4 5-6 8-6M40 28c-2-4-5-6-8-6" strokeLinecap="round" /></svg>,
  <svg key="design" viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M24 8 28 18l10 2-7 7 2 10-9-5-9 5 2-10-7-7 10-2z" strokeLinejoin="round" /></svg>,
  <svg key="space" viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="10" width="32" height="28" rx="2" /><path d="M8 22h32M24 22v16" /></svg>,
  <svg key="styles" viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="8" width="12" height="12" rx="2" /><rect x="28" y="8" width="12" height="12" rx="2" /><rect x="8" y="28" width="12" height="12" rx="2" /><rect x="28" y="28" width="12" height="12" rx="2" /></svg>,
]

const tipIcons = [
  <svg key="size" viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="24" cy="24" r="12" /><path d="M24 12v12l8 4" strokeLinecap="round" /></svg>,
  <svg key="comfort" viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 28h28v4a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3v-4z" /><path d="M14 28v-7a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v7" /></svg>,
  <svg key="style" viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 34V16l10-6 10 6v18" /><path d="M20 34v-8h8v8" /></svg>,
  <svg key="options" viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="10" y="14" width="28" height="20" rx="2" /><path d="M10 20h28" /></svg>,
]

function Collection({ model }: { model: CategoryLandingModel['collection'] }) {
  const [open, setOpen] = useState(false)
  const photos = model.photos
  const usingPhotos = photos.length > 0
  const previewCount = 8
  const extraPhotos = usingPhotos ? photos.slice(previewCount) : []
  const extraProducts = usingPhotos ? model.products : model.products.slice(previewCount)
  const hasMore = extraPhotos.length + extraProducts.length > 0

  return (
    <section id="collection" className="scroll-mt-28 px-4 py-14 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1c3f38]/70">{model.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#1c3f38] md:text-5xl">{model.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#1c3f38]/80 md:text-base">{model.description}</p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
          {usingPhotos
            ? photos.slice(0, previewCount).map((photo) => (
                <ProductGalleryCard key={photo.src} product={{ src: photo.src, title: photo.alt }} variant="frame" />
              ))
            : model.products.slice(0, previewCount).map((product) => (
                <ProductGalleryCard key={product.id || product.src} product={product} variant="photo" />
              ))}
        </div>
        {open ? (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-5">
            {extraPhotos.map((photo) => (
              <ProductGalleryCard key={photo.src} product={{ src: photo.src, title: photo.alt }} variant="frame" />
            ))}
            {extraProducts.map((product) => (
              <ProductGalleryCard key={product.id || product.src} product={product} />
            ))}
          </div>
        ) : null}
        {hasMore ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1c3f38] px-6 py-3 text-sm font-semibold leading-none text-white"
          >
            {open ? 'Show less' : model.moreLabel}
            <Arrow />
          </button>
        ) : null}
      </div>
    </section>
  )
}

function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="divide-y divide-[#1c3f38]/15">
      {items.map((item, index) => {
        const expanded = open === index
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium leading-snug text-[#1c3f38] md:text-base"
            >
              {item.question}
              <span aria-hidden className="text-xl leading-none">{expanded ? '–' : '+'}</span>
            </button>
            {expanded ? <p className="pb-4 text-sm leading-relaxed text-[#1c3f38]/80">{item.answer}</p> : null}
          </div>
        )
      })}
    </div>
  )
}

export function CategoryLandingView({ model }: { model: CategoryLandingModel }) {
  return (
    <div className="bg-[#f7f4ef] text-[#1c3f38]">
      <section className="px-4 pb-6 pt-28 md:px-6 md:pt-32">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] bg-[#1c3f38] text-white lg:grid-cols-[0.86fr_1.14fr]">
          <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{model.hero.eyebrow}</p>
            <h1 className="mt-4 max-w-md font-serif text-4xl font-semibold leading-[1.05] text-white md:text-5xl">{model.hero.title}</h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80 md:text-base">{model.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#collection" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold leading-none text-[#1c3f38]">
                {model.hero.exploreLabel}
                <Arrow />
              </a>
              <a href={model.hero.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-semibold leading-none text-white">
                {model.hero.whatsappLabel}
              </a>
            </div>
          </div>
          <div className="relative min-h-[280px] md:min-h-[460px]">
            {model.hero.image ? <Photo image={model.hero.image} sizes="(max-width: 1024px) 100vw, 55vw" /> : null}
          </div>
        </div>
      </section>

      <Collection model={model.collection} />

      <section className="bg-[#e7f0ea] px-4 py-10 md:py-12">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[0.8fr_1.6fr]">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-[#1c3f38] md:text-4xl">{model.lifestyle.title}</h2>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {model.lifestyle.points.slice(0, 4).map((point, index) => (
              <li key={point} className="flex flex-col items-center gap-3 text-center">
                <span className="text-[#1c3f38]">{lifestyleIcons[index] || lifestyleIcons[0]}</span>
                <span className="text-sm font-medium leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] bg-[#efeae3] md:min-h-[460px]">
            {model.guide.image ? <Photo image={model.guide.image} sizes="(max-width: 1024px) 100vw, 50vw" /> : null}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1c3f38]/70">{model.guide.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight md:text-4xl">{model.guide.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#1c3f38]/80 md:text-base">{model.guide.description}</p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {model.guide.tips.slice(0, 4).map((tip, index) => (
                <li key={tip.title}>
                  <span className="text-[#1c3f38]">{tipIcons[index] || tipIcons[0]}</span>
                  <h3 className="mt-3 font-serif text-lg font-semibold md:text-xl">{tip.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1c3f38]/75">{tip.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 md:pb-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1c3f38]/70">{model.spaces.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold md:text-5xl">{model.spaces.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#1c3f38]/80 md:text-base">{model.spaces.description}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {model.spaces.items.slice(0, 3).map((item) => (
              <figure key={item.title}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#efeae3]">
                  {item.image ? <Photo image={item.image} sizes="(max-width: 768px) 100vw, 33vw" /> : null}
                </div>
                <figcaption className="mt-3 text-sm font-medium">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {model.related.items.length > 0 ? (
        <section className="px-4 pb-14 md:pb-20">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1c3f38]/70">{model.related.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold md:text-5xl">{model.related.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#1c3f38]/80 md:text-base">{model.related.description}</p>
            <ul className="no-scrollbar mt-10 flex gap-6 overflow-x-auto pb-2 md:justify-center">
              {model.related.items.map((item) => (
                <li key={item.href} className="w-28 shrink-0">
                  <Link href={item.href} className="group block text-center">
                    <span className="relative mx-auto block h-24 w-24 overflow-hidden rounded-full bg-[#efeae3] ring-1 ring-[#1c3f38]/10">
                      {item.image ? <Photo image={item.image} sizes="96px" className="object-cover transition duration-500 group-hover:scale-105" /> : null}
                    </span>
                    <span className="mt-3 block text-xs font-medium leading-snug md:text-sm">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-14 md:pb-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] bg-[#d7e6dc] p-6 md:grid-cols-[0.7fr_1.3fr] md:p-10">
          <div>
            <h2 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">{model.faq.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#1c3f38]/80 md:text-base">{model.faq.intro}</p>
          </div>
          <FaqList items={model.faq.items} />
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] bg-[#1c3f38] text-white lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[220px]">
            {model.showroom.image ? <Photo image={model.showroom.image} sizes="(max-width: 1024px) 100vw, 40vw" /> : null}
          </div>
          <div className="px-6 py-8 md:px-10 md:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{model.showroom.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white md:text-4xl">{model.showroom.title}</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">{model.showroom.description}</p>
            <p className="mt-5 flex items-start gap-2 text-sm font-medium text-white">
              <span aria-hidden>📍</span>
              {model.showroom.address}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={model.showroom.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold leading-none text-[#1c3f38]">
                Get Directions
                <Arrow />
              </a>
              <a href={model.showroom.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-semibold leading-none text-white">
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border-t border-[#1c3f38]/15 pt-8 md:flex-row md:items-center">
          <h2 className="max-w-xs font-serif text-3xl font-semibold leading-tight md:text-4xl">{model.closing.title}</h2>
          <p className="max-w-sm text-sm leading-relaxed text-[#1c3f38]/80">{model.closing.description}</p>
          <div className="flex flex-wrap gap-3">
            <a href={model.closing.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1c3f38] px-5 py-3 text-sm font-semibold leading-none text-white">
              {model.closing.whatsappLabel}
            </a>
            <a href="#collection" className="inline-flex items-center gap-2 rounded-full border border-[#1c3f38] px-5 py-3 text-sm font-semibold leading-none text-[#1c3f38]">
              {model.closing.exploreLabel}
              <Arrow />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
