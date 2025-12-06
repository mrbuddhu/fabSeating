export function trackEvent(type: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return

  if (process.env.NEXT_PUBLIC_GA4_ID && (window as any).gtag) {
    ;(window as any).gtag('event', type, data)
  }

  if (process.env.NEXT_PUBLIC_META_PIXEL_ID && (window as any).fbq) {
    ;(window as any).fbq('track', type, data)
  }
}

export function trackConversion(type: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return

  trackEvent(type, data)

  if (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && (window as any).gtag) {
    ;(window as any).gtag('event', 'conversion', {
      send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
      event_category: type,
      ...data,
    })
  }
}

