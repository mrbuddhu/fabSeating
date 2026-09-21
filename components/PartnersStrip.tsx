import Image from 'next/image'
import { BRAND_PARTNERS } from '@/lib/siteContent'

export function PartnersStrip() {
  return (
    <section className="relative bg-white py-12 md:py-16 border-y border-primary-100/60">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-700">Our Trusted Brand Partners</span>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We source premium fabrics, furnishings, wallpapers, and interior materials from some of the industry&apos;s most trusted brands&mdash;ensuring exceptional quality, durability, and timeless design in every project.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4 max-w-6xl mx-auto">
          {BRAND_PARTNERS.map((brand) => (
            <div
              key={brand.name}
              className="group flex items-center justify-center rounded-2xl border border-primary-100 bg-white p-4 md:p-5 h-24 shadow-sm hover:shadow-md hover:border-primary-300/70 transition-all duration-300"
              title={brand.name}
            >
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={140}
                height={56}
                className="max-h-12 w-auto object-contain opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
