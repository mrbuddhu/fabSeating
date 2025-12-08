import { Section } from './Section'
import { VideoCard } from './VideoCard'

interface VideoItem {
  src: string
  title: string
}

interface VideoReelSectionProps {
  title: string
  subtitle?: string
  items: VideoItem[]
}

export function VideoReelSection({ title, subtitle, items }: VideoReelSectionProps) {
  if (items.length === 0) return null

  return (
    <Section>
      <div className="mb-8">
        <h2 className="font-serif text-2xl md:text-4xl font-bold text-primary-950">{title}</h2>
        {subtitle && <p className="text-primary-600 mt-2">{subtitle}</p>}
      </div>
      <div className="flex gap-5 overflow-x-auto pb-3 no-scrollbar">
        {items.map((item, idx) => (
          <div key={item.src + idx} className="w-56 flex-shrink-0 sm:w-64 md:w-72 lg:w-80">
            <VideoCard src={item.src} title={item.title} rounded="lg" aspect="aspect-[2/3]" />
          </div>
        ))}
      </div>
    </Section>
  )
}

