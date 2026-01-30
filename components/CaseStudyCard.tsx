import Link from 'next/link'
import { ResponsiveImage } from './ResponsiveImage'
import type { Project, CaseStudy } from '@/types'
import { cn } from '@/lib/utils'

interface CaseStudyCardProps {
  project: Project | CaseStudy
  index?: number
  className?: string
}

export function CaseStudyCard({ project, index = 0, className }: CaseStudyCardProps) {
  // Helper to get image
  const getImage = () => {
    if ('heroImage' in project && project.heroImage) return project.heroImage
    if ('images' in project && project.images?.[0]) return project.images[0]
    return null
  }

  // Helper to get category/industry
  const getCategory = () => {
    if ('industry' in project) return project.industry
    if ('category' in project) return project.category
    return 'Project'
  }

  // Helper to get description/summary
  const getDescription = () => {
    if ('summary' in project) return project.summary
    if ('description' in project) return project.description
    return ''
  }

  return (
    <Link
      href={`/case-studies/${project.slug.current}`}
      className={cn(
        'group relative overflow-hidden bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 block h-full',
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {project.videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
        ) : getImage() ? (
          <ResponsiveImage
            image={getImage()!}
            alt={project.title}
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (project as any).thumbnail ? (
          <img 
            src={(project as any).thumbnail} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500">No media</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-4 right-4 z-20">
          <span className="text-xs font-bold tracking-widest text-white/90 uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-md border border-white/20">
            {getCategory()}
          </span>
        </div>
      </div>
      <div className="p-6 bg-gradient-to-b from-gray-900 to-black h-full">
        <div className="mb-2">
          <span className="text-xs font-semibold tracking-wider text-primary-400 uppercase">
            Case Study {index + 1}
          </span>
        </div>
        <h3 className="text-xl font-serif font-bold text-white mb-2 tracking-tight">
          {project.title}
        </h3>
        {getDescription() && (
          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
            {getDescription()}
          </p>
        )}
        <div className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 font-medium text-sm transition-colors duration-300 group/link">
          <span className="tracking-wide">View Details</span>
          <svg
            className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
