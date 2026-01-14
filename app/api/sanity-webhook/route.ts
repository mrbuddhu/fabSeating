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
    
    // Revalidate all pages when content changes
    const pathsToRevalidate = [
      '/',
      '/projects',
      '/contact',
      '/solutions/residential',
      '/solutions/office',
      '/solutions/hospitality'
    ]

    // Revalidate specific paths
    pathsToRevalidate.forEach(path => {
      revalidatePath(path)
    })

    // Revalidate by tag for dynamic content
    revalidateTag('sanity')
    
    return NextResponse.json({ revalidated: true, paths: pathsToRevalidate })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
