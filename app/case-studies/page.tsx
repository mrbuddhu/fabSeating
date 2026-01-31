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
    title: 'Tech Hub Workspace',
    slug: { current: 'tech-hub-workspace' },
    summary: 'A futuristic office space designed for collaboration and innovation.',
    industry: 'Office',
    thumbnail: 'https://images.unsplash.com/photo-1497366214047-2a8ba81e032e?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'dummy-2',
    _type: 'caseStudy',
    title: 'Luxury Villa Interiors',
    slug: { current: 'luxury-villa-interiors' },
    summary: 'Bespoke furniture collection for a premium residential project.',
    industry: 'Residential',
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'dummy-3',
    _type: 'caseStudy',
    title: 'Boutique Hotel Lobby',
    slug: { current: 'boutique-hotel-lobby' },
    summary: 'Welcoming and elegant seating solutions for hospitality.',
    industry: 'Hospitality',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
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
