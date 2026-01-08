import { NextResponse } from 'next/server'
import { getGoogleReviews } from '@/lib/google-reviews'

export const revalidate = 3600

export async function GET() {
  try {
    const reviews = await getGoogleReviews()
    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('Error fetching Google Reviews:', error)
    return NextResponse.json({ reviews: [] }, { status: 500 })
  }
}

