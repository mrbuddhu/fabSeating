import type { SanityImage } from '@/types'

/** Slug for the in-progress hospitality placeholder — always treated as coming soon in UI */
export const BOUTIQUE_HOTEL_LOBBY_SLUG = 'boutique-hotel-lobby'

export function caseStudyIsComingSoon(study: {
  slug?: { current?: string }
  comingSoon?: boolean
}): boolean {
  if (study.slug?.current === BOUTIQUE_HOTEL_LOBBY_SLUG) return true
  return Boolean(study.comingSoon)
}

export type CaseStudyVisualSource = SanityImage | { imageUrl: string; alt?: string }

/**
 * Turn Sanity / string / dummy shapes into something ResponsiveImage can use.
 * Returns null for empty fields or Sanity image objects without an asset ref (Studio placeholders).
 */
export function normalizeCaseStudyImage(image: unknown): CaseStudyVisualSource | null {
  if (image == null) return null
  if (typeof image === 'string') {
    const s = image.trim()
    return s ? { imageUrl: s } : null
  }
  if (typeof image !== 'object') return null
  const o = image as Record<string, unknown>
  if (typeof o.imageUrl === 'string') {
    const s = o.imageUrl.trim()
    return s ? (image as SanityImage) : null
  }
  const asset = o.asset
  if (asset != null && typeof asset === 'object') {
    const ref = (asset as { _ref?: string })._ref
    if (typeof ref === 'string' && ref.length > 0) return image as SanityImage
  }
  return null
}

/** Same rule everywhere: card image first, then hero — must match `CaseStudyCard` */
export function resolveCaseStudyVisualImage(study: {
  cardImage?: unknown
  heroImage?: unknown
}): CaseStudyVisualSource | null {
  return normalizeCaseStudyImage(study.cardImage) ?? normalizeCaseStudyImage(study.heroImage)
}
