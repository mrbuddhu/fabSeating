import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImage } from '@/types'
import { cn } from '@/lib/utils'

interface ResponsiveImageProps {
  image?: SanityImage
  alt?: string
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  width?: number
  height?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

export function ResponsiveImage({
  image,
  alt,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill,
  width,
  height,
  objectFit = 'cover',
}: ResponsiveImageProps) {
  if (!image) return null

  const imageUrl = urlFor(image)
  if (!imageUrl) return null

  const src = imageUrl.width(fill ? 1920 : width || 1200).height(fill ? 1080 : height || 800).url()

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt || image.alt || ''}
        fill
        className={cn('object-cover', className)}
        priority={priority}
        sizes={sizes}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt || image.alt || ''}
      width={width || 1200}
      height={height || 800}
      className={cn(
        objectFit === 'cover' && 'object-cover',
        objectFit === 'contain' && 'object-contain',
        objectFit === 'fill' && 'object-fill',
        objectFit === 'none' && 'object-none',
        objectFit === 'scale-down' && 'object-scale-down',
        className
      )}
      priority={priority}
      sizes={sizes}
    />
  )
}

