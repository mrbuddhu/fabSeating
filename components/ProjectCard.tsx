import Link from 'next/link'
import { ResponsiveImage } from './ResponsiveImage'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className={cn('group block', className)}
    >
      <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-primary-100">
        {project.images && project.images[0] && (
          <ResponsiveImage
            image={project.images[0]}
            alt={project.title}
            fill
            className="transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div>
        <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary-700 transition-colors">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-sm text-primary-600 line-clamp-2 mb-2">
            {project.description}
          </p>
        )}
        {(project.location || project.year) && (
          <p className="text-xs text-primary-500 uppercase tracking-wider">
            {[project.location, project.year].filter(Boolean).join(' • ')}
          </p>
        )}
      </div>
    </Link>
  )
}

