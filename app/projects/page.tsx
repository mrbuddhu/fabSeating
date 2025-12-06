import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { ProjectCard } from '@/components/ProjectCard'
import { getProjects } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 3600

export const metadata: Metadata = generateSEOMetadata({
  title: 'Projects',
  description: 'Explore our portfolio of completed projects',
  path: '/projects',
})

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="See how we transform spaces with premium furniture"
      />
      <Section>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-primary-700 py-12">
            No projects available at the moment.
          </p>
        )}
      </Section>
    </>
  )
}

