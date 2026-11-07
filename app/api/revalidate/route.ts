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
  revalidateTag('sanity:product')
  revalidateTag('sanity:categoryLanding')
  revalidateTag('sanity:articleMedia')
  revalidateTag('sanity:homePage')
  revalidateTag('sanity:contactPage')
  revalidateTag('sanity:siteSettings')
  revalidateTag('sanity:teamMember')
  revalidateTag('sanity:caseStudy')
  revalidateTag('sanity:legalDocument')
  revalidateTag('sanity:galleryPage')
  revalidateTag('sanity:footerBanner')

  return NextResponse.json({ ok: true })
}

