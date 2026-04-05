import type { Metadata } from 'next'
import Link from 'next/link'
import { generateSEOMetadata } from '@/components/SEOHead'
import { BLOG_POSTS } from '@/lib/blog/posts'
import { getBlogPosts, SANITY_FETCH_REVALIDATE_SECONDS } from '@/lib/sanity/queries'

export const revalidate = SANITY_FETCH_REVALIDATE_SECONDS

type BlogCard = {
  slug: string
  title: string
  description: string
  category: string
  readTime: string
  date: string
}

async function toBlogCards(): Promise<BlogCard[]> {
  const staticCards: BlogCard[] = BLOG_POSTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    readTime: p.readTime,
    date: p.date,
  }))
  try {
    const sanityPosts = await getBlogPosts()
    const sanityCards: BlogCard[] = sanityPosts.map((p) => ({
      slug: p.slug.current,
      title: p.title,
      description: p.excerpt ?? p.title,
      category: p.category ?? 'Journal',
      readTime: p.readTime ?? '5 min read',
      date: p.publishedAt
        ? new Date(p.publishedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
        : '',
    }))
    return [...staticCards, ...sanityCards]
  } catch {
    return staticCards
  }
}

export const metadata: Metadata = generateSEOMetadata({
  title: 'Journal & Guides',
  description:
    'Long-form guides, buying advice, and project thinking from the Fab Seating team — for homes, offices, and hospitality spaces across South India.',
  path: '/blog',
})

export default async function BlogIndexPage() {
  const blogs = await toBlogCards()

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-primary-50/40 to-white">
      <section className="relative pt-24 pb-14 md:pt-28 md:pb-16">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary-950/90 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <header className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-primary-500 mb-3">
              Fab Seating · Journal
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-primary-950">
              Articles, Guides &amp; Long-Form Thinking
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-700 font-medium max-w-2xl mx-auto">
              Deep-dive guides on furniture, interiors, and project execution — written from two decades of work across
              residential, office, and hospitality spaces in Chennai and South India.
            </p>
          </header>

          <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
            {blogs.map((blog, index) => {
              const imageFirst = index % 2 === 0

              return (
                <article
                  key={blog.slug}
                  className="group relative overflow-hidden rounded-3xl border border-primary-100/80 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] hover:shadow-[0_26px_70px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/[0.02] via-transparent to-primary-500/[0.03] pointer-events-none" />

                  <div className="relative grid gap-0 md:grid-cols-2">
                    {/* Image side (decorative, using CSS background to stay theme-consistent) */}
                    <div
                      className={`relative h-56 md:h-full overflow-hidden ${
                        imageFirst ? 'md:order-1' : 'md:order-2'
                      } bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500`}
                    >
                      <div className="absolute inset-0 opacity-20 mix-blend-soft-light bg-[radial-gradient(circle_at_0%_0%,white_0,transparent_55%),radial-gradient(circle_at_100%_100%,white_0,transparent_55%)]" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-primary-50/90 font-medium">
                        <span className="px-2 py-1 rounded-full bg-black/35 backdrop-blur">
                          {blog.category}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1">
                          Journal
                          <span className="h-px w-8 bg-primary-200/70" />
                        </span>
                      </div>
                    </div>

                    {/* Text side */}
                    <div
                      className={`relative flex flex-col justify-center p-6 sm:p-7 lg:p-8 ${
                        imageFirst ? 'md:order-2' : 'md:order-1'
                      }`}
                    >
                      <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-primary-700 mb-2">
                        {blog.date} &nbsp;·&nbsp; {blog.readTime}
                      </p>
                      <h2 className="text-lg md:text-xl lg:text-2xl font-serif font-semibold text-primary-950 mb-3 leading-snug">
                        {blog.title}
                      </h2>
                      <p className="text-sm md:text-[0.95rem] text-slate-700/90 mb-5 line-clamp-3">
                        {blog.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                        <span className="hidden sm:inline-flex items-center gap-2">
                          <span className="h-px w-8 bg-primary-300/70" />
                          <span className="tracking-[0.16em] uppercase text-primary-900/80 font-medium">
                            {blog.category}
                          </span>
                        </span>
                        <span className="ml-auto inline-flex items-center gap-1.5 text-primary-950 font-semibold tracking-[0.16em] uppercase">
                          Read article
                          <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                        </span>
                      </div>

                      <Link
                        href={`/blog/${blog.slug}`}
                        className="absolute inset-0"
                        aria-label={blog.title}
                        prefetch={false}
                      />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}


