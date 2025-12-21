import { Section } from './Section'
import { Reveal } from './Reveal'

interface WhyChooseUsProps {
  data?: {
    title?: string
    subtitle?: string
    features?: Array<{
      title: string
      description: string
    }>
  }
}

const defaultFeatures = [
  {
    title: 'Premium Materials',
    description: 'We source only the finest materials to ensure lasting quality and beauty.',
  },
  {
    title: 'Expert Craftsmanship',
    description: 'Every piece is handcrafted by skilled artisans with decades of experience.',
  },
  {
    title: 'Custom Solutions',
    description: 'We work with you to create furniture that perfectly fits your space and style.',
  },
  {
    title: 'Sustainable Practices',
    description: 'Committed to environmentally responsible manufacturing and sourcing.',
  },
]

export function WhyChooseUs({ data }: WhyChooseUsProps) {
  const features = data?.features || defaultFeatures
  const title = data?.title || 'Why Choose FabSeating'
  const subtitle = data?.subtitle || 'Excellence in every detail'

  return (
    <Section className="bg-primary-100">
      <div className="mb-12 text-center">
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-primary-950">{title}</h2>
        {subtitle && (
          <p className="text-primary-700 max-w-2xl mx-auto text-lg md:text-xl">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Reveal key={index} delay={index * 80} className="h-full">
            <div className="text-center rounded-3xl bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)] p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(0,0,0,0.24)] hover:ring-1 hover:ring-primary-200/80 hover:ring-offset-1 hover:ring-offset-white h-full">
              <h3 className="font-serif text-2xl font-semibold mb-3 text-primary-950">{feature.title}</h3>
              <p className="text-primary-700 leading-relaxed text-base md:text-lg">{feature.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

