import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { ProjectCard } from '@/components/ProjectCard'
import { getProjects } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'
import Link from 'next/link'

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: 'Projects',
  description: 'Explore our portfolio of completed projects',
  path: '/projects',
})

interface ProjectsPageProps {
  searchParams: { category?: string }
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const category = searchParams?.category
  const allProjects = await getProjects()
  const projects = category ? await getProjects(category) : allProjects

  const categories = [
    { label: 'All', value: '', href: '/projects' },
    { label: 'Residential', value: 'residential', href: '/projects?category=residential' },
    { label: 'Office', value: 'office', href: '/projects?category=office' },
    { label: 'Hospitality', value: 'hospitality', href: '/projects?category=hospitality' },
  ]

  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="See how we transform spaces with premium furniture"
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
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-primary-700 py-12">
            No projects available in this category.
          </p>
        )}
      </Section>
    </>
  )
}

