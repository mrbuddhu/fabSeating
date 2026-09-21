'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { trackConversion } from '@/lib/analytics'

export function Analytics() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_META_PIXEL_ID) {
      ;(window as any).fbq = (window as any).fbq || function(...args: any[]) {
        ;((window as any).fbq.q = (window as any).fbq.q || []).push(args)
      }
      ;(window as any).fbq.l = +new Date()
      ;(window as any).fbq('init', process.env.NEXT_PUBLIC_META_PIXEL_ID)
      ;(window as any).fbq('track', 'PageView')
    }
    // Site-wide conversion tracking for WhatsApp & call CTAs
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (href.includes('wa.me') || href.includes('api.whatsapp')) trackConversion('whatsapp_click', { link_url: href })
      else if (href.startsWith('tel:')) trackConversion('call_click', { link_url: href })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      {process.env.NEXT_PUBLIC_GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
            `}
          </Script>
        </>
      )}
      {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  )
}

