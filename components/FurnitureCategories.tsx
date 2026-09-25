import Link from 'next/link'
import Image from 'next/image'
import { waLink } from '@/lib/siteContent'
import { DEFAULT_SECTIONS, type SiteCategory } from '@/lib/siteSections'

export function FurnitureCategories({ categories = DEFAULT_SECTIONS.categories }: { categories?: SiteCategory[] }) {
  return (
    <section id="solutions" className="relative bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-700">What We Make</span>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-950 tracking-tight">Furniture &amp; Furnishing Solutions</h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent mx-auto my-4"></div>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover premium custom furniture and furnishing solutions in Chennai for homes, offices, hotels, restaurants, healthcare, retail, and commercial spaces.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm hover:shadow-2xl hover:border-primary-300 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-primary-50">
                {cat.cover ? (
                  <Image
                    src={cat.cover}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="grainy-gradient absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-xl md:text-2xl font-semibold text-white/90 tracking-wide text-center px-3 relative z-10">{cat.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-transparent to-transparent opacity-90"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h3 className="text-white font-serif text-lg md:text-xl font-semibold tracking-tight drop-shadow">{cat.title}</h3>
                <span className="inline-flex items-center gap-1 text-primary-100 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={waLink('Hi Fab Seating, I would like to know more about your furniture & furnishing solutions.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-white font-semibold text-sm shadow-lg hover:bg-[#1eb955] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2C6.485 2 2 6.486 2 12.005c0 2.103.691 4.055 1.872 5.64L3 22l4.5-1.856c1.53.84 3.287 1.325 5.004 1.325 5.519 0 10.004-4.486 10.004-10.004C22.508 6.486 17.523 2 12.004 2z"/></svg>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
