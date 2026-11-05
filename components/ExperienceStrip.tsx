'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
  {
    title: '25+ Years of Experience',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M16 34c-6-2-9-8-8-14 4 1 7 5 8 9" strokeLinecap="round" />
        <path d="M32 34c6-2 9-8 8-14-4 1-7 5-8 9" strokeLinecap="round" />
        <path d="M24 12v20" strokeLinecap="round" />
        <path d="M18 16c2-3 4-4 6-4s4 1 6 4" strokeLinecap="round" />
        <circle cx="24" cy="34" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Quality Craftsmanship',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M8 28h32v6a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-6z" />
        <path d="M12 28V18a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v10" />
        <path d="M8 28c2-4 4-6 6-6M40 28c-2-4-4-6-6-6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Customisation Available',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M14 34 32 16" strokeLinecap="round" />
        <path d="M18 14 34 30" strokeLinecap="round" />
        <path d="M12 36l4-1 1-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 12l4 1-1 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Furniture & Furnishings Under One Roof',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M8 22 24 10l16 12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 20v16h24V20" />
        <path d="M20 36V26h8v10" />
      </svg>
    ),
  },
]

export function ExperienceStrip() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin') || pathname.startsWith('/studio')) return null

  return (
    <section className="mx-4 mb-2 overflow-hidden rounded-3xl bg-[#f6f1e8] shadow-[0_12px_40px_rgba(26,44,45,0.08)] md:mx-6 lg:mx-8">
      <div className="relative h-36 w-full sm:h-44 md:h-52">
        <Image
          src="/images/experience-showroom.jpg"
          alt="Fab Seating showroom with a beige sectional and round wood coffee table"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <ul className="grid grid-cols-2 gap-4 px-4 py-5 text-[#1a2c2d] md:grid-cols-4 md:gap-6 md:px-8 md:py-6">
        {items.map((item) => (
          <li key={item.title} className="flex items-center gap-3">
            <span className="shrink-0 text-[#1a2c2d]">{item.icon}</span>
            <span className="font-serif text-sm font-semibold leading-snug md:text-base">{item.title}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
