import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getProjects, getBlogPosts } from '@/lib/sanity/queries'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return NextResponse.json({ products: [], projects: [], posts: [] })
  }

  try {
    const [products, projects, posts] = await Promise.all([
      getProducts(),
      getProjects(),
      getBlogPosts(),
    ])

    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
    )

    const filteredProjects = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.location?.toLowerCase().includes(query)
    )

    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query)
    )

    return NextResponse.json({
      products: filteredProducts,
      projects: filteredProjects,
      posts: filteredPosts,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}

