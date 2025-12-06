'use client'

import { useEffect } from 'react'
import Script from 'next/script'

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

