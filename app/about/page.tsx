import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 21600

export const metadata: Metadata = generateSEOMetadata({
  title: 'About Us',
  description: 'Learn about FabSeating and our commitment to excellence',
  path: '/about',
})

export default async function AboutPage() {
  return (
    <>
      <PageHero
        title="About FabSeating"
        subtitle="Crafting excellence in every detail"
      />
      <Section>
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-primary-700 leading-relaxed mb-6">
            FabSeating is a premium furniture brand dedicated to creating exceptional pieces
            that combine timeless design with superior craftsmanship. With decades of experience
            in the industry, we have built a reputation for excellence and attention to detail.
          </p>
          <p className="text-primary-700 leading-relaxed mb-6">
            Our team of skilled artisans works with the finest materials to create furniture
            that not only looks beautiful but stands the test of time. We believe that great
            furniture should enhance your living space and reflect your personal style.
          </p>
          <p className="text-primary-700 leading-relaxed">
            From concept to completion, we are committed to delivering products that exceed
            expectations and create lasting value for our clients.
          </p>
        </div>
      </Section>
    </>
  )
}

