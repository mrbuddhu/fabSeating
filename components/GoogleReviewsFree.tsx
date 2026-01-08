'use client'

import { useEffect } from 'react'

interface GoogleReviewsFreeProps {
  placeId: string
  height?: number
}

export function GoogleReviewsFree({ placeId, height = 600 }: GoogleReviewsFreeProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://static.elfsight.com/platform/platform.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="w-full">
      <div
        className="elfsight-app"
        data-elfsight-app-id="google-reviews-widget"
        data-elfsight-google-place-id={placeId}
        style={{ minHeight: `${height}px` }}
      />
    </div>
  )
}

