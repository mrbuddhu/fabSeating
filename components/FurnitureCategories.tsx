'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { SiteCategory } from '@/lib/siteSections'

export function FurnitureCategories({ categories }: { categories: SiteCategory[] }) {
  const collection = useRef<HTMLDivElement>(null)
  const move = (direction: number) => collection.current?.scrollBy({ left: direction * collection.current.clientWidth * 0.8, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  return (
    <section id="solutions" className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">What We Make</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-primary-950 md:text-4xl">Explore by Furniture</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">Custom furniture and furnishings for homes, offices and hospitality spaces.</p>
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex justify-end gap-2">
            <button type="button" onClick={() => move(-1)} aria-label="Previous furniture categories" aria-controls="furniture-collection" className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-200 text-xl text-primary-950 hover:bg-primary-50">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Next furniture categories" aria-controls="furniture-collection" className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-200 text-xl text-primary-950 hover:bg-primary-50">→</button>
          </div>
          <div ref={collection} id="furniture-collection" className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto overflow-y-hidden py-2 md:gap-12" aria-label="Furniture categories">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className="group w-48 shrink-0 snap-start text-center md:w-60">
                <div className="relative aspect-square rounded-full border-[3px] border-primary-400">
                  <div className="absolute inset-3 overflow-hidden rounded-full bg-white transition-all duration-500 ease-out group-hover:inset-[3px] motion-reduce:transition-none">
                    {category.cover ? (
                      <Image src={category.cover} alt={category.title} fill sizes="(max-width:768px) 192px, 240px" className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center p-6 font-serif text-xl text-primary-800">{category.title}</div>
                    )}
                  </div>
                </div>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary-950 transition-colors duration-300 group-hover:text-primary-600">{category.title}</h3>
                <span aria-hidden className="mx-auto mt-2 block h-0.5 w-8 origin-center scale-x-0 rounded-full bg-primary-400 transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
