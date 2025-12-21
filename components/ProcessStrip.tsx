import { Section } from './Section'
import { Reveal } from './Reveal'

interface ProcessStep {
  title: string
  description: string
}

interface ProcessStripProps {
  data?: {
    title?: string
    subtitle?: string
    steps?: ProcessStep[]
  }
}

const defaultSteps: ProcessStep[] = [
  {
    title: 'Consult & Discover',
    description: 'We listen to your space, vision, and timelines to set the brief.',
  },
  {
    title: 'Design & Materiality',
    description: 'Moodboards, finishes, and mockups curated for your home or hospitality space.',
  },
  {
    title: 'Craft & Quality',
    description: 'Artisan-made pieces with premium woods, metals, and upholstery.',
  },
  {
    title: 'Deliver & Style',
    description: 'White-glove delivery, installation, and styling to perfection.',
  },
]

export function ProcessStrip({ data }: ProcessStripProps = {}) {
  const steps = data?.steps && data.steps.length > 0 ? data.steps : defaultSteps
  const title = data?.title || 'Our Process'
  const subtitle = data?.subtitle || 'Concierge service from idea to installation'

  if (steps.length === 0) return null

  return (
    <Section className="bg-primary-50" containerSize="2xl">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-primary-950 tracking-tight">{title}</h2>
        {subtitle && <p className="text-primary-700 text-lg md:text-xl mt-3">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <Reveal key={step.title || idx} delay={idx * 80} className="h-full">
            <div className="rounded-3xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] p-6 flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(0,0,0,0.2)] h-full">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary-500">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-900 text-primary-50 font-semibold">
                  {idx + 1}
                </span>
                Step {idx + 1}
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary-950">{step.title}</h3>
              <p className="text-primary-700 leading-relaxed">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

