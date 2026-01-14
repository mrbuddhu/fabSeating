import { Section } from './Section'
import { VideoCard } from './VideoCard'
import { Reveal } from './Reveal'

interface VideoItem {
  src: string
  title: string
  poster?: string
}

interface VideoReelSectionProps {
  title?: string
  subtitle?: string
  items?: VideoItem[]
  data?: {
    title?: string
    subtitle?: string
    videos?: VideoItem[]
  }
}

export function VideoReelSection({ title, subtitle, items, data }: VideoReelSectionProps) {
  const sectionTitle = title || data?.title || 'Experience with Fab Seating'
  const sectionSubtitle = subtitle || data?.subtitle
  const videos = items || data?.videos || []

  if (videos.length === 0) return null

  return (
    <Section className="px-0 md:px-4 lg:px-6">
      <div className="mb-8">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-950">{sectionTitle}</h2>
        {sectionSubtitle && <p className="text-primary-600 mt-3 text-lg md:text-xl">{sectionSubtitle}</p>}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {videos.slice(0, 4).map((item, idx) => (
          <Reveal key={item.src + idx} delay={0} className="w-full">
            <VideoCard src={item.src} poster={item.poster} title={item.title} rounded="lg" aspect="aspect-[2/3]" />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

