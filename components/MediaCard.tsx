'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MediaCardProps {
  media: {
    type: 'image' | 'video';
    src: string;
    alt: string;
    title: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    download?: boolean;
    /** When set (e.g. catalog covers), image sizes to intrinsic aspect — no forced crop or huge empty frame */
    intrinsicWidth?: number;
    intrinsicHeight?: number;
  };
  className?: string;
  variant?: 'default' | 'catalog';
}

export function MediaCard({ media, className = '', variant = 'default' }: MediaCardProps) {
  const isCatalog = variant === 'catalog'
  const iw = media.intrinsicWidth && media.intrinsicWidth > 0 ? media.intrinsicWidth : 800
  const ih = media.intrinsicHeight && media.intrinsicHeight > 0 ? media.intrinsicHeight : 1067

  return (
    <motion.div 
      className={cn(
        'group relative overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-500 hover:shadow-3xl',
        className
      )}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden',
          isCatalog
            ? 'flex min-h-[200px] items-center justify-center bg-neutral-100 px-2 py-3 sm:px-3 sm:py-4'
            : 'aspect-video'
        )}
      >
        {media.type === 'video' ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className={cn(
              'h-full w-full transition-transform duration-700 group-hover:scale-110',
              isCatalog ? 'max-h-[min(70vw,560px)] w-full object-contain object-center' : 'object-cover'
            )}
          >
            <source src={media.src} type="video/mp4" />
          </video>
        ) : isCatalog ? (
          <Image
            src={media.src}
            alt={media.alt}
            width={iw}
            height={ih}
            className="h-auto w-full max-h-[min(72vw,560px)] object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            isCatalog && 'from-black/40 via-transparent to-transparent'
          )}
        />
      </div>
      
      <div className={cn(isCatalog ? 'p-4 sm:p-5' : 'p-6')}>
        <h3
          className={cn(
            'font-serif font-bold text-gray-900',
            isCatalog ? 'text-xl sm:text-2xl leading-snug' : 'text-2xl md:text-3xl'
          )}
        >
          {media.title}
        </h3>
        {media.description && (
          <p
            className={cn(
              'text-gray-600',
              isCatalog ? 'mt-1.5 text-sm leading-relaxed line-clamp-2' : 'mt-2 text-lg'
            )}
          >
            {media.description}
          </p>
        )}
        {media.ctaText && media.ctaLink && (
          <a
            href={media.ctaLink}
            download={media.download ? '' : undefined}
            className={cn(
              'inline-block font-semibold text-primary-600 hover:text-primary-700',
              isCatalog ? 'mt-2.5 text-sm' : 'mt-4 text-lg'
            )}
          >
            {media.ctaText} →
          </a>
        )}
      </div>
    </motion.div>
  );
}
