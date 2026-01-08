import { ResponsiveImage } from './ResponsiveImage'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <div
      className={cn(
        'group block rounded-3xl bg-white p-4 shadow-[0_15px_45px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.24)] hover:ring-1 hover:ring-primary-200/80 hover:ring-offset-1 hover:ring-offset-white',
        className
      )}
    >
      <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-2xl bg-primary-100">
        {project.images && project.images[0] && (
          <ResponsiveImage
            image={project.images[0]}
            alt={project.title}
            fill
            className="transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="space-y-2">
        <h3 className="font-serif text-2xl font-bold mb-1 group-hover:text-primary-800 transition-colors">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-base text-primary-700 line-clamp-2">
            {project.description}
          </p>
        )}
        {(project.location || project.year) && (
          <p className="text-xs text-primary-600 uppercase tracking-wider">
            {[project.location, project.year].filter(Boolean).join(' • ')}
          </p>
        )}
      </div>
    </div>
  )
}

