'use client'

import { useState } from 'react'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { ProductCard } from '@/components/ProductCard'
import { ProjectCard } from '@/components/ProjectCard'
import { BlogCard } from '@/components/BlogCard'
import type { Product, Project, BlogPost } from '@/types'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{
    products: Product[]
    projects: Project[]
    posts: BlogPost[]
  }>({ products: [], projects: [], posts: [] })
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const hasResults = results.products.length > 0 || results.projects.length > 0 || results.posts.length > 0

  return (
    <>
      <PageHero
        title="Search"
        subtitle="Find products, projects, and articles"
      />
      <Section>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 px-4 py-3 border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-950 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-8 py-3 bg-primary-950 text-primary-50 hover:bg-primary-900 transition-colors font-medium disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {hasResults ? (
          <div className="space-y-12">
            {results.products.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {results.projects.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {results.posts.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">Blog Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.posts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : query ? (
          <p className="text-center text-primary-700 py-12">
            No results found for &quot;{query}&quot;.
          </p>
        ) : null}
      </Section>
    </>
  )
}

