import { motion } from 'framer-motion';

interface MediaCardProps {
  media: {
    type: 'image' | 'video';
    src: string;
    alt: string;
    title: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  className?: string;
}

export function MediaCard({ media, className = '' }: MediaCardProps) {
  return (
    <motion.div 
      className={`group relative overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-500 hover:shadow-3xl ${className}`}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {media.type === 'video' ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          >
            <source src={media.src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={media.src}
            alt={media.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      
      <div className="p-6">
        <h3 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
          {media.title}
        </h3>
        {media.description && (
          <p className="mt-2 text-lg text-gray-600">{media.description}</p>
        )}
        {media.ctaText && media.ctaLink && (
          <a
            href={media.ctaLink}
            className="mt-4 inline-block text-lg font-semibold text-primary-600 hover:text-primary-700"
          >
            {media.ctaText} →
          </a>
        )}
      </div>
    </motion.div>
  );
}
