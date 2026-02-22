import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

/**
 * GET /api/debug-catalogs
 * Returns what the site receives from Sanity for catalogs (project, dataset, count, items).
 * Use this to verify why catalogs might not show on /catalog.
 */
export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const configured = !!projectId

  if (!configured) {
    return NextResponse.json({
      ok: false,
      reason: 'Sanity not configured',
      hint: 'Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local',
      projectId: '',
      dataset,
      count: 0,
      catalogs: [],
    })
  }

  try {
    const catalogs = await client.fetch<
      { _id: string; _type: string; title: string | null }[]
    >(
      `*[_type == "catalog"] | order(_createdAt desc) {
        _id,
        _type,
        title
      }`,
      {},
      { cache: 'no-store' },
    )
    const count = Array.isArray(catalogs) ? catalogs.length : 0

    return NextResponse.json({
      ok: true,
      projectId,
      dataset,
      count,
      catalogs: catalogs || [],
      hint:
        count === 0
          ? 'No catalogs returned. Check: (1) Document is Published in Studio, (2) Studio project/dataset matches (n59kaaxb / production), (3) Document type is "catalog".'
          : undefined,
    })
  } catch (err) {
    return NextResponse.json({
      ok: false,
      reason: 'Fetch failed',
      error: err instanceof Error ? err.message : String(err),
      projectId,
      dataset,
      count: 0,
      catalogs: [],
    })
  }
}
