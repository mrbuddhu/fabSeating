'use client'

import { useRef } from 'react'
import { CONTACT } from '@/lib/siteContent'
import { useSiteContact } from '@/components/SiteContactProvider'

type Review = {
  text: string
  date: string
}

const REVIEWS: Review[] = [
  {
    date: '5 Oct 2025',
    text: 'We first met in 2004 in Chennai at a furniture fair and that led to my first purchase from them. I am still a happy customer as they maintain the same warmth, professionalism, quality and it\'s rare to find such high standards sustaining over decades. Though I do not live in Chennai I got my latest furniture shipped from them. That is the trust I place in them. Thanks Mr Gobind and Mr Harish.',
  },
  {
    date: '6 Sep 2025',
    text: 'Absolutely love my new furniture from this store! Not only do they have a fantastic variety of options, but their custom work is outstanding. The custom pieces I had made are exactly what I wanted and the quality is amazing. The service was top-notch; they really take the time to personally understand your needs. They offer a great variety of furniture and furnishings, and the delivery was quick and efficient.',
  },
  {
    date: '26 Aug 2025',
    text: 'Fab Seating makes stylish, premium-quality custom furniture with excellent finishing and durability. The designs are modern, elegant, and can be tailored to fit any space perfectly. The team is professional, friendly, and ensures timely delivery. A great choice for anyone looking for classy, high-quality designer furniture!',
  },
  {
    date: '26 Aug 2025',
    text: 'I got a dining set and an office chair from Fab Seating, and I’m so glad I chose them. Delivery was smooth and on time too. Way better quality than what I saw in bigger brands, and at a fair price. Totally recommend them!',
  },
  {
    date: '26 Aug 2025',
    text: 'Fab Seating delivers on its promise of premium, custom-made furniture. The quality is exceptional, and it\'s clear they are passionate about their work. Highly recommend them for anyone in Chennai looking for beautiful and long-lasting furniture.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.37 4.24a1 1 0 00.95.69h4.46c.97 0 1.37 1.24.59 1.81l-3.61 2.62a1 1 0 00-.36 1.12l1.38 4.24c.3.92-.76 1.69-1.54 1.12l-3.61-2.62a1 1 0 00-1.18 0l-3.61 2.62c-.78.57-1.84-.2-1.54-1.12l1.38-4.24a1 1 0 00-.36-1.12L2.04 9.67c-.78-.57-.38-1.81.59-1.81h4.46a1 1 0 00.95-.69l1.01-3.24z" />
        </svg>
      ))}
    </div>
  )
}

export function GoogleReviewsCta({
  reviewsUrl,
  reviews = REVIEWS,
  heading = 'Google reviews',
  summary = '4.8 from Google · five recent reviews',
}: {
  reviewsUrl?: string
  reviews?: Review[]
  heading?: string
  summary?: string
}) {
  const contact = useSiteContact()
  const listingUrl = reviewsUrl || contact.reviewsUrl || CONTACT.reviewsUrl
  const cards = reviews.filter((review) => review.text?.trim())
  const scroller = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: 1 | -1) => {
    const node = scroller.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('[data-review-card]')
    const amount = (card?.offsetWidth || 320) + 16
    node.scrollTo({ left: node.scrollLeft + direction * amount, behavior: 'auto' })
  }

  return (
    <section className="relative bg-gradient-to-b from-white via-primary-50/40 to-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <svg className="h-6 w-6" viewBox="0 0 48 48" aria-hidden>
                <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7A21.99 21.99 0 0 0 24 46z" />
                <path fill="#FBBC05" d="M11.69 28.18A13.2 13.2 0 0 1 11 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.94 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
              </svg>
              <h2 className="font-serif text-2xl font-semibold text-primary-950 md:text-3xl">{heading}</h2>
            </div>
            <p className="text-sm text-gray-600">{summary}</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button type="button" aria-label="Previous reviews" onClick={() => scrollByCard(-1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-200 text-primary-950 hover:bg-primary-50">
              ‹
            </button>
            <button type="button" aria-label="Next reviews" onClick={() => scrollByCard(1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-200 text-primary-950 hover:bg-primary-50">
              ›
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {cards.map((review) => (
            <article
              key={review.text.slice(0, 24)}
              data-review-card
              className="flex w-[min(85%,320px)] shrink-0 snap-start flex-col rounded-2xl border border-primary-100 bg-white p-5 shadow-sm sm:w-[340px]"
            >
              <Stars />
              <p className="mt-3 line-clamp-6 flex-1 text-sm leading-relaxed text-gray-700">{review.text}</p>
              <p className="mt-4 text-xs font-medium text-primary-700">Google review · {review.date}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary-950 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-900"
          >
            View more
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
