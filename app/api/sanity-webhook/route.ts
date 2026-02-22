import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('sanity-signature') || ''
    
    // Verify webhook signature (optional but recommended)
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET
    if (webhookSecret) {
      const hash = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex')
      
      if (hash !== signature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const data = JSON.parse(body)

    // Revalidate every path that shows Sanity content so the live site updates instantly
    const pathsToRevalidate = [
      '/',
      '/projects',
      '/catalog',
      '/contact',
      '/solutions/residential',
      '/solutions/office',
      '/solutions/hospitality',
    ]
    pathsToRevalidate.forEach((path) => revalidatePath(path))
    revalidatePath('/case-studies', 'layout')
    revalidatePath('/blog', 'layout')

    // Invalidate all Sanity-backed data so next request fetches fresh content
    revalidateTag('sanity')
    revalidateTag('sanity:teamMember')
    revalidateTag('sanity:homePage')
    revalidateTag('sanity:contactPage')
    revalidateTag('sanity:siteSettings')
    revalidateTag('sanity:project')
    revalidateTag('sanity:caseStudy')
    revalidateTag('sanity:catalog')
    revalidateTag('sanity:solutionPage')
    revalidateTag('sanity:blogPost')
    revalidateTag('sanity:testimonial')
    revalidateTag('sanity:productCategory')

    return NextResponse.json({ revalidated: true, paths: pathsToRevalidate })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
