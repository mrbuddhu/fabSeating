'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyVideoProps {
  src: string
  poster?: string
  className?: string
}

/**
 * Autoplaying muted loop that only fetches its video once it scrolls near the
 * viewport. Avoids downloading every reel on page load (and stops download
 * managers from grabbing all of them at once).
 */
export function LazyVideo({ src, poster, className }: LazyVideoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="h-full w-full">
      {active ? (
        <video
          className={className}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disableRemotePlayback
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        poster ? <img src={poster} alt="" className={className} loading="lazy" /> : <div className={className} />
      )}
    </div>
  )
}
