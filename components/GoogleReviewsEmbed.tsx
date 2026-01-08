'use client'

import { useEffect } from 'react'

interface GoogleReviewsEmbedProps {
  placeId?: string
  height?: number
}

export function GoogleReviewsEmbed({ placeId, height = 600 }: GoogleReviewsEmbedProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://static.elfsight.com/platform/platform.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const targetPlaceId = placeId || process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID

  if (!targetPlaceId) {
    return (
      <div className="text-center py-12 text-primary-700">
        <p>Google Place ID not configured. Please add NEXT_PUBLIC_GOOGLE_PLACE_ID to your environment variables.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div
        className="elfsight-app"
        data-elfsight-app-id="google-reviews-widget"
        data-elfsight-google-place-id={targetPlaceId}
        style={{ minHeight: `${height}px` }}
      />
    </div>
  )
}

