import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    // Revalidate all Sanity blog post queries (listing + detail pages)
    revalidateTag('sanity:blogPost')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    return NextResponse.json({ revalidated: false, message: 'Error revalidating' }, { status: 500 })
  }
}

import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: 'Missing SANITY_REVALIDATE_SECRET on server' },
      { status: 500 },
    )
  }

  const auth = req.headers.get('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : ''
  if (token !== secret) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  // Revalidate everything driven by Sanity documents.
  // We keep it coarse so every publish updates quickly without needing per-doc routing.
  revalidateTag('sanity')
  revalidateTag('sanity:solutionPage')
  revalidateTag('sanity:project')
  revalidateTag('sanity:blogPost')
  revalidateTag('sanity:testimonial')
  revalidateTag('sanity:productCategory')
  revalidateTag('sanity:catalog')

  return NextResponse.json({ ok: true })
}

