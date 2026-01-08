import { Section } from './Section'
import { VideoCard } from './VideoCard'
import { Reveal } from './Reveal'

interface VideoCategoryChipsProps {
  title?: string
  items?: { src: string; label: string; poster?: string }[]
  data?: {
    title?: string
    categories?: { src: string; label: string; poster?: string }[]
  }
}

export function VideoCategoryChips({ title, items, data }: VideoCategoryChipsProps) {
  const sectionTitle = title || data?.title || 'Our Products'
  const categories = items || data?.categories || []

  if (categories.length === 0) return null

  return (
    <Section className="bg-primary-50">
      <div className="mb-8">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-950">{sectionTitle}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        {categories.slice(0, 4).map((item, idx) => (
          <Reveal key={item.src + idx} delay={idx * 80} className="flex flex-col items-center gap-3">
            <div className="w-full">
              <VideoCard src={item.src} poster={item.poster} rounded="full" aspect="aspect-square" />
            </div>
            <span className="text-sm font-semibold text-primary-900">{item.label}</span>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

