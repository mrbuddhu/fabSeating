import { DEFAULT_SECTIONS } from '@/lib/siteSections'

export function IndustriesServed({ industries = DEFAULT_SECTIONS.industries }: { industries?: string[] }) {
  return (
    <section className="relative bg-gradient-to-b from-white via-primary-50/30 to-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-700">Who We Work With</span>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-950 tracking-tight">Industries We Serve</h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent mx-auto my-4"></div>
          <p className="text-base md:text-lg text-gray-700 italic max-w-3xl mx-auto leading-relaxed">
            From luxury residences to large-scale commercial projects, we design, manufacture, and install custom furniture and furnishing solutions tailored to every industry.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {industries.map((industry) => (
            <div
              key={industry}
              className="flex items-center gap-2 rounded-xl border border-primary-100 bg-white px-4 py-3.5 shadow-sm hover:shadow-md hover:border-primary-300/70 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0"></span>
              <span className="text-sm md:text-base font-medium text-primary-900">{industry}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
