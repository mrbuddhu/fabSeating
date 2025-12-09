import { Section } from './Section'
import { VideoCard } from './VideoCard'
import { Reveal } from './Reveal'

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
    <Section className="px-0 md:px-4 lg:px-6">
      <div className="mb-8">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-950">{title}</h2>
        {subtitle && <p className="text-primary-600 mt-3 text-lg md:text-xl">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((item, idx) => (
          <Reveal key={item.src + idx} delay={idx * 80} className="w-full">
            <VideoCard src={item.src} poster={(item as any).poster} title={item.title} rounded="lg" aspect="aspect-[2/3]" />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

