import { CONTACT } from '@/lib/siteContent'

export function GoogleReviewsCta() {
  return (
    <section className="relative bg-gradient-to-b from-white via-primary-50/40 to-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center rounded-3xl border border-primary-100 bg-white p-8 md:p-12 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-7 h-7" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7A21.99 21.99 0 0 0 24 46z"/><path fill="#FBBC05" d="M11.69 28.18A13.2 13.2 0 0 1 11 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.94 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>
            <span className="font-serif text-xl md:text-2xl font-semibold text-primary-950">Loved on Google</span>
          </div>
          <div className="flex items-center justify-center gap-1 mb-3 text-amber-400" aria-label="5 star rating">
            {[0,1,2,3,4].map((i) => (
              <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.37 4.24a1 1 0 00.95.69h4.46c.97 0 1.37 1.24.59 1.81l-3.61 2.62a1 1 0 00-.36 1.12l1.38 4.24c.3.92-.76 1.69-1.54 1.12l-3.61-2.62a1 1 0 00-1.18 0l-3.61 2.62c-.78.57-1.84-.2-1.54-1.12l1.38-4.24a1 1 0 00-.36-1.12L2.04 9.67c-.78-.57-.38-1.81.59-1.81h4.46a1 1 0 00.95-.69l1.01-3.24z"/></svg>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our customers rate their Fab Seating experience on Google. Read what homeowners and businesses across Chennai say about working with us.
          </p>
          <a
            href={CONTACT.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-primary-950 px-8 py-4 text-white font-semibold text-sm shadow-lg hover:bg-primary-900 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            Read our reviews on Google
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
          <p className="mt-3 text-xs text-gray-400">Source: Google Business Profile</p>
        </div>
      </div>
    </section>
  )
}
