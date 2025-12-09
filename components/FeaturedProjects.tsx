import Link from 'next/link'
import { Section } from './Section'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import type { Project } from '@/types'

interface FeaturedProjectsProps {
  projects?: Project[]
}

export function FeaturedProjects({ projects = [] }: FeaturedProjectsProps) {
  if (projects.length === 0) return null

  return (
    <Section>
      <div className="mb-12 text-center">
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-primary-950">Our Works</h2>
        <p className="text-primary-700 max-w-2xl mx-auto text-lg md:text-xl">
          Explore our recent work and see how we transform spaces
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Reveal key={project._id} delay={80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/projects"
          className="inline-block px-8 py-3 border-2 border-primary-950 text-primary-950 hover:bg-primary-950 hover:text-primary-50 transition-colors font-medium"
        >
          View All Projects
        </Link>
      </div>
    </Section>
  )
}

