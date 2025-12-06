import { Section } from './Section'

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
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">{title}</h2>
        {subtitle && (
          <p className="text-primary-700 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-primary-700 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

