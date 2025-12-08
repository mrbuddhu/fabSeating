interface VideoCardProps {
  src: string
  title?: string
  rounded?: 'md' | 'lg' | 'full'
  aspect?: string
}

export function VideoCard({ src, title, rounded = 'lg', aspect = 'aspect-[4/5]' }: VideoCardProps) {
  return (
    <div className="group relative w-full overflow-hidden bg-primary-100 shadow-sm">
      <div className={`${aspect} w-full overflow-hidden`}>
        <video
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={src}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      {title && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 py-3 text-sm font-semibold text-white">
          {title}
        </div>
      )}
      <div
        className={`absolute inset-0 rounded-${rounded} ring-1 ring-inset ring-white/10 transition duration-500 group-hover:ring-white/40`}
        aria-hidden
      />
    </div>
  )
}

