interface GoogleReview {
  author_name: string
  author_url?: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface GooglePlaceDetails {
  place_id: string
  name: string
  rating: number
  user_ratings_total: number
  reviews: GoogleReview[]
}

export async function getGoogleReviews(placeId?: string): Promise<GoogleReview[]> {
  if (!placeId && !process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID) {
    return []
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    console.warn('Google Places API key not configured')
    return []
  }

  const targetPlaceId = placeId || process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${targetPlaceId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Google Reviews')
    }

    const data = await response.json()

    if (data.status !== 'OK' || !data.result?.reviews) {
      return []
    }

    return data.result.reviews.slice(0, 10)
  } catch (error) {
    console.error('Error fetching Google Reviews:', error)
    return []
  }
}

export function formatGoogleReviewForTestimonial(review: GoogleReview) {
  return {
    _id: `google-${review.time}`,
    _type: 'testimonial' as const,
    name: review.author_name,
    content: review.text,
    rating: review.rating,
    image: review.profile_photo_url
      ? {
          _type: 'image' as const,
          asset: {
            _ref: review.profile_photo_url,
            _type: 'reference' as const,
          },
          alt: review.author_name,
        }
      : undefined,
    featured: review.rating >= 4,
    source: 'google' as const,
    date: new Date(review.time * 1000).toISOString(),
  }
}

