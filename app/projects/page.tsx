import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { ProjectCard } from '@/components/ProjectCard'
import { getProjects } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 900

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
        {/* View Gallery CTA */}
        <div className="mb-12 text-center">
          <a
            href="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-950 text-white font-medium rounded-full hover:bg-primary-900 transition-all duration-300 hover:gap-5 shadow-lg hover:-translate-y-1 hover:shadow-2xl group"
          >
            <span className="text-sm tracking-wider uppercase">View Gallery</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
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

