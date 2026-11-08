import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { CONTACT } from '@/lib/siteContent'

export const dynamic = 'force-dynamic'

const enquirySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().min(1).max(40),
  message: z.string().min(1).max(5000),
  productId: z.string().max(200).optional(),
  projectId: z.string().max(200).optional(),
  originPage: z.string().max(300).optional(),
  company: z.string().max(200).optional(),
})

function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

function enquiryText(data: z.infer<typeof enquirySchema>) {
  return `
New enquiry from the Fab Seating website

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
${data.productId ? `Product: ${data.productId}` : ''}
${data.projectId ? `Project: ${data.projectId}` : ''}
${data.originPage ? `Page: ${data.originPage}` : ''}

Message:
${data.message}
  `.trim()
}

async function sendWithResend(data: z.infer<typeof enquirySchema>) {
  const resend = getResend()
  if (!resend) return false
  const from = process.env.ENQUIRY_FROM_EMAIL || 'Fab Seating <noreply@fabseating.com>'
  const { error } = await resend.emails.send({
    from,
    to: CONTACT.email,
    subject: `New enquiry from ${data.name}`,
    text: enquiryText(data),
    replyTo: data.email,
  })
  if (error) {
    console.error('Enquiry delivery failed:', error.name)
    return false
  }
  return true
}

async function sendWithFormSubmit(data: z.infer<typeof enquirySchema>) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT.email)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: 'https://www.fabseating.com',
      Referer: 'https://www.fabseating.com/contact',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: enquiryText(data),
      _subject: `New enquiry from ${data.name}`,
      _replyto: data.email,
      _captcha: 'false',
      _template: 'box',
    }),
  })
  const payload = (await response.json().catch(() => null)) as { success?: boolean | string; message?: string } | null
  const ok = payload?.success === true || payload?.success === 'true'
  if (!ok) console.error('Enquiry delivery failed:', payload?.message || response.status)
  return ok
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = enquirySchema.parse(body)
    if (data.company?.trim()) return NextResponse.json({ success: true })

    const sent = (await sendWithResend(data)) || (await sendWithFormSubmit(data))
    if (!sent) {
      return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    console.error('Enquiry error:', error instanceof Error ? error.name : 'unknown')
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
