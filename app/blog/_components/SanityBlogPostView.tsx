/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { PortableText, type PortableTextReactComponents } from '@portabletext/react'

import type { BlogPost } from '@/types'
import { urlFor } from '@/lib/sanity/client'

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-primary-800 mb-4 last:mb-0 leading-relaxed">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-serif text-xl font-semibold text-primary-950 mt-6 mb-2">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-lg font-semibold text-primary-950 mt-4 mb-2">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-5 space-y-2 text-primary-800 mb-4">{children}</ul>
    ),
  },
  listItem: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  types: {
    image: ({ value }: any) => {
      const src = value ? urlFor(value)?.width(1800).url() ?? null : null
      if (!src) return null
      return <img src={src} alt={value?.alt ?? ''} className="w-full h-auto rounded-2xl my-6" />
    },
  },
}

export function SanityBlogPostView({ post }: { post: BlogPost }) {
  const heroImageUrl = post.featuredImage
    ? urlFor(post.featuredImage)?.width(2000).height(1200).url() ?? null
    : null
  const useJournal = post.useJournalLayout !== false && (post.sections?.length ?? 0) > 0

  if (!useJournal) {
    return (
      <main className="min-h-screen bg-cream-50 pt-24 md:pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          {post.title && (
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-950 mb-4">
              {post.title}
            </h1>
          )}
          {post.excerpt && (
            <p className="text-primary-700 text-lg mb-8">{post.excerpt}</p>
          )}
          {post.content && (
            <div className="prose prose-primary max-w-none">
              <PortableText value={post.content} components={portableTextComponents} />
            </div>
          )}
        </article>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream-50 pt-24 md:pt-28">
      {/* Hero */}
      <header className="bg-primary-950 text-white text-center px-4 sm:px-6 py-16 md:py-20">
        {post.heroTag && (
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary-400 border border-primary-500/40 rounded px-4 py-1.5 mb-6">
            {post.heroTag}
          </span>
        )}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
          {post.title}
        </h1>
        {post.byline && (
          <p className="mt-5 text-sm text-white/60 tracking-wide">{post.byline}</p>
        )}
      </header>

      {/* Hero image */}
      {heroImageUrl && (
        <div className="w-full h-[70vh] md:h-[80vh] lg:h-[90vh] max-h-[980px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImageUrl}
            alt=""
            className="w-full h-full object-cover block"
          />
        </div>
      )}

      {/* Article */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-[900px] mx-auto">
          {/* Intro */}
          {post.intro && post.intro.length > 0 && (
            <section className="mb-12 pb-12 border-b border-primary-200">
              <div className="prose prose-primary max-w-none text-primary-800">
                <PortableText value={post.intro} components={portableTextComponents} />
              </div>
            </section>
          )}

          {/* Numbered sections */}
          {post.sections && post.sections.length > 0 && (
            <section className="space-y-14">
              {post.sections.map((section, index) => (
                <article
                  key={section._key ?? index}
                  className="pb-14 border-b border-primary-200 last:border-0"
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    {section.number && (
                      <span
                        className="font-serif text-4xl font-bold text-primary-200 flex-shrink-0"
                        aria-hidden
                      >
                        {String(section.number).padStart(2, '0')}
                      </span>
                    )}
                    {section.title && (
                      <h2 className="font-serif text-2xl font-semibold text-primary-950">
                        {section.title}
                      </h2>
                    )}
                  </div>
                  {section.tags && section.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {section.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium uppercase tracking-wide text-primary-800 bg-primary-200/50 px-3 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {section.body && section.body.length > 0 && (
                    <div className="prose prose-primary max-w-none text-primary-800 mb-4">
                      <PortableText value={section.body} components={portableTextComponents} />
                    </div>
                  )}
                  {section.highlight && (
                    <div className="bg-primary-100/80 border-l-4 border-primary-500 pl-5 py-4 my-4 rounded-r text-primary-800 italic text-[0.95rem]">
                      {section.highlight}
                    </div>
                  )}
                </article>
              ))}
            </section>
          )}

          {/* Summary box */}
          {(post.summaryTitle || post.summaryBody || (post.summaryBullets?.length ?? 0) > 0) && (
            <section className="bg-primary-950 text-white p-8 md:p-10 rounded-lg my-16">
              {post.summaryTitle && (
                <h2 className="font-serif text-2xl md:text-3xl text-primary-400 mb-5">
                  {post.summaryTitle}
                </h2>
              )}
              {post.summaryBody && post.summaryBody.length > 0 && (
                <div className="text-white/85 text-[0.97rem] mb-4 [&>p]:mb-3">
                  <PortableText value={post.summaryBody} components={portableTextComponents} />
                </div>
              )}
              {post.summaryBullets && post.summaryBullets.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/90 list-none p-0 m-0">
                  {post.summaryBullets.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Author */}
          <aside className="flex gap-5 items-start bg-primary-100/60 border border-primary-200 rounded-lg p-6 mb-12">
            <div className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center font-serif text-xl text-white flex-shrink-0">
              FS
            </div>
            <div>
              <h3 className="text-sm font-medium text-primary-950 mb-1">
                Fab Seating — Design &amp; Craftsmanship Team
              </h3>
              <p className="text-sm text-primary-700 leading-relaxed">
                Founded in 2003, Fab Seating has spent over two decades designing and crafting
                custom furniture for residential and commercial spaces across South India.
              </p>
            </div>
          </aside>

          {/* CTA */}
          <section className="text-center bg-primary-100/50 border border-primary-200 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary-600 mb-3">
              Fab Seating · Journal
            </p>
            {post.ctaHeading && (
              <h2 className="font-serif text-2xl md:text-3xl text-primary-950 mb-3">
                {post.ctaHeading}
              </h2>
            )}
            {post.ctaDescription && (
              <p className="text-primary-800 text-[0.97rem] max-w-md mx-auto mb-8">
                {post.ctaDescription}
              </p>
            )}
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="inline-block px-6 py-3.5 text-sm font-medium uppercase tracking-wide border border-primary-800 text-primary-800 rounded hover:bg-primary-800 hover:text-white transition-colors"
              >
                Schedule a Consultation
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
