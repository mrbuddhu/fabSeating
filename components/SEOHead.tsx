import type { Metadata } from 'next'
import type { SEO, SanityImage } from '@/types'
import { urlFor } from '@/lib/sanity/client'

interface SEOHeadProps {
  seo?: SEO
  title?: string
  description?: string
  image?: SanityImage
  path?: string
  noIndex?: boolean
}

export function generateSEOMetadata({
  seo,
  title,
  description,
  image,
  path = '',
  noIndex = false,
}: SEOHeadProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabseating.com'
  const fullUrl = `${siteUrl}${path}`
  
  const metaTitle = seo?.title || title || 'FabSeating | Premium Furniture'
  const metaDescription = seo?.description || description || 'Premium furniture crafted with excellence and attention to detail.'
  const metaImage = seo?.image || image
  const imageUrl = metaImage ? urlFor(metaImage)?.width(1200).height(630).url() : `${siteUrl}/logo.png`

  return {
    title: metaTitle,
    description: metaDescription,
    robots: noIndex || seo?.noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: fullUrl,
      siteName: 'FabSeating',
      images: [
        {
          url: imageUrl || '',
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl || ''],
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

