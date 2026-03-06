import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { CaseStudyCard } from '@/components/CaseStudyCard'
import { getCaseStudies } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'
import Link from 'next/link'
import { AnimatedCard } from '@/components/AnimatedCard'

import { SkeletonCard } from '@/components/SkeletonCard'

// Dummy data for preview when no Sanity data is available
const dummyCaseStudies = [
  {
    _id: 'dummy-1',
    _type: 'caseStudy',
    title: 'A Regal Home Transformation in Kilpauk',
    slug: { current: 'regal-home-kilpauk' },
    summary: 'Complete furniture and furnishings for a 3-storey residence featuring custom throne chairs and bespoke accent pieces.',
    industry: 'residential',
    client: 'Murugan',
    location: 'Kilpauk, Chennai',
    year: '2024',
    // This heroImage will be replaced with Sanity image when uploaded
    heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'dummy-2',
    _type: 'caseStudy',
    title: 'Luxury 4BHK Residence in Nungambakkam',
    slug: { current: 'luxury-4bhk-nungambakkam' },
    summary: 'Complete home furniture and furnishings featuring Italian marble dining table, home theatre recliners, and motorized curtains.',
    industry: 'residential',
    client: 'Mr. Rajesh Kothari',
    location: 'Nungambakkam, Chennai',
    year: '2024',
    // This heroImage will be replaced with Sanity image when uploaded
    heroImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304a36?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'dummy-3',
    _type: 'caseStudy',
    title: 'Boutique Hotel Lobby',
    slug: { current: 'boutique-hotel-lobby' },
    summary: 'Welcoming and elegant seating solutions for hospitality. Coming Soon.',
    industry: 'hospitality',
    // This heroImage will be replaced with Sanity image when uploaded
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    comingSoon: true
  }
]

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: 'Case Studies',
  description: 'In-depth stories behind our most significant projects',
  path: '/case-studies',
})

interface CaseStudiesPageProps {
  searchParams: { category?: string }
}

export default async function CaseStudiesPage({ searchParams }: CaseStudiesPageProps) {
  const category = searchParams?.category
  const projects = await getCaseStudies(category)

  const filteredDummyCaseStudies = category
    ? dummyCaseStudies.filter((study) => study.industry.toLowerCase() === category.toLowerCase())
    : dummyCaseStudies

  const categories = [
    { label: 'All', value: '', href: '/case-studies' },
    { label: 'Residential', value: 'residential', href: '/case-studies?category=residential' },
    { label: 'Office', value: 'office', href: '/case-studies?category=office' },
    { label: 'Hospitality', value: 'hospitality', href: '/case-studies?category=hospitality' },
    { label: 'Education', value: 'education', href: '/case-studies?category=education' },
    { label: 'Healthcare', value: 'healthcare', href: '/case-studies?category=healthcare' },
  ]

  return (
    <>
      <PageHero
        title="Case Studies"
        subtitle="In-depth stories behind our most significant projects"
      />
      <Section>
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={cat.href}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                (!category && cat.value === '') || category === cat.value
                  ? 'bg-primary-950 text-white shadow-lg'
                  : 'border-2 border-primary-300 text-primary-700 hover:border-primary-950 hover:bg-primary-50'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedCard key={project._id} index={index}>
                <CaseStudyCard project={project} index={index} />
              </AnimatedCard>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyCaseStudies.map((project, index) => (
              <AnimatedCard key={project._id} index={index}>
                <CaseStudyCard project={project as any} index={index} />
              </AnimatedCard>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
