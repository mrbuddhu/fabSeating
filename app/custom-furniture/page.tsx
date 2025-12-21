import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { EnquiryForm } from '@/components/EnquiryForm'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 21600

export const metadata: Metadata = generateSEOMetadata({
  title: 'Custom Furniture',
  description: 'Commission custom furniture tailored to your needs',
  path: '/custom-furniture',
})

export default async function CustomFurniturePage() {
  return (
    <>
      <PageHero
        title="Custom Furniture"
        subtitle="Tailored to your vision and space"
      />
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="font-serif text-2xl font-semibold mb-6">Create Your Perfect Piece</h2>
            <div className="prose prose-lg max-w-none text-primary-700 leading-relaxed space-y-4">
              <p>
                At FabSeating, we specialize in creating custom furniture that perfectly fits
                your space, style, and needs. Our team works closely with you throughout the
                entire process, from initial design concepts to final delivery.
              </p>
              <p>
                Whether you need a unique piece for a specific room or want to create a complete
                furniture collection, we have the expertise and craftsmanship to bring your
                vision to life.
              </p>
              <p>
                Fill out the form to get started, and we&apos;ll schedule a consultation to discuss
                your project in detail.
              </p>
            </div>
          </div>
          <div>
            <EnquiryForm originPage="/custom-furniture" />
          </div>
        </div>
      </Section>
    </>
  )
}

