import { Section } from './Section'
import { VideoCard } from './VideoCard'

interface VideoCategoryChipsProps {
  title: string
  items: { src: string; label: string }[]
}

export function VideoCategoryChips({ title, items }: VideoCategoryChipsProps) {
  if (items.length === 0) return null

  return (
    <Section className="bg-primary-50">
      <div className="mb-8">
        <h2 className="font-serif text-2xl md:text-4xl font-bold text-primary-950">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((item, idx) => (
          <div key={item.src + idx} className="flex flex-col items-center gap-3">
            <div className="w-full">
              <VideoCard src={item.src} rounded="full" aspect="aspect-square" />
            </div>
            <span className="text-sm font-semibold text-primary-900">{item.label}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

