import { Section } from './Section'

interface Metric {
  label: string
  value: string
}

interface MetricsStripProps {
  data?: Metric[]
}

const defaultMetrics: Metric[] = [
  { label: 'Years of Excellence', value: '21+' },
  { label: 'Projects Delivered', value: '1000+' },
  { label: 'Happy Clients', value: '1000+' },
  { label: 'Cities Served', value: '30+' },
]

export function MetricsStrip({ data }: MetricsStripProps = {}) {
  const metrics = data && data.length > 0 ? data : defaultMetrics

  if (metrics.length === 0) return null

  return (
    <Section className="bg-primary-50 py-10 md:py-12" containerSize="2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((item, idx) => (
          <div
            key={item.label || idx}
            className="rounded-2xl bg-white shadow-[0_14px_35px_rgba(0,0,0,0.08)] px-4 py-5 text-center"
          >
            <div className="font-serif text-3xl md:text-4xl font-bold text-primary-950 tracking-tight">
              {item.value}
            </div>
            <div className="text-primary-700 text-sm md:text-base mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

