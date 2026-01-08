import { NextRequest, NextResponse } from 'next/server'
import { getProjects } from '@/lib/sanity/queries'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return NextResponse.json({ projects: [] })
  }

  try {
    const projects = await getProjects()

    const filteredProjects = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.location?.toLowerCase().includes(query)
    )

    return NextResponse.json({
      projects: filteredProjects,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}

