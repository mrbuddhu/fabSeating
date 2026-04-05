import Link from 'next/link'
import { ResponsiveImage } from './ResponsiveImage'
import Image from 'next/image'
import type { Project, CaseStudy } from '@/types'
import { cn } from '@/lib/utils'
import {
  caseStudyIsComingSoon,
  normalizeCaseStudyImage,
  resolveCaseStudyVisualImage,
} from '@/lib/caseStudy'

interface CaseStudyCardProps {
  project: Project | CaseStudy
  index?: number
  className?: string
}

export function CaseStudyCard({ project, index = 0, className }: CaseStudyCardProps) {
  const getImage = () => {
    if ('heroImage' in project || 'cardImage' in project) {
      const v = resolveCaseStudyVisualImage(project as CaseStudy)
      if (v) return v
    }
    if ('images' in project && project.images?.[0]) {
      return normalizeCaseStudyImage(project.images[0])
    }
    return null
  }

  const getCategory = () => {
    if ('industry' in project) return project.industry
    if ('category' in project) return project.category
    return 'Project'
  }

  const getDescription = () => {
    if ('summary' in project) return project.summary
    if ('description' in project) return project.description
    return ''
  }

  const isComingSoon = caseStudyIsComingSoon(project as CaseStudy)
  const img = getImage()
  const thumb = (project as any).thumbnail as string | undefined

  return (
    <div
      className={cn(
        'group relative block h-full overflow-hidden rounded-lg bg-gray-900 shadow-xl transition-shadow duration-500 hover:shadow-2xl',
        isComingSoon ? 'cursor-not-allowed' : '',
        className
      )}
    >
      {/* Image on top — wider frame + contain so card crop isn’t over-magnified */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-950">
        {project.videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
        ) : img ? (
          <ResponsiveImage
            image={img as any}
            alt={project.title}
            fill
            objectFit="contain"
            className="transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : thumb ? (
          <Image
            src={thumb}
            alt={project.title}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-800">
            <span className="text-gray-500">No media</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute right-4 top-4 z-20">
          <span className="rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
            {getCategory()}
          </span>
          {isComingSoon && (
            <span className="absolute -right-1 -top-1 rounded-md border border-yellow-400/30 bg-yellow-900/80 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-yellow-400 backdrop-blur-sm">
              Soon
            </span>
          )}
        </div>
        {isComingSoon && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
            <div className="text-center">
              <div className="mb-2 font-serif text-2xl font-bold text-white/90">Coming Soon</div>
              <div className="text-sm text-white/70">This case study is under construction</div>
            </div>
          </div>
        )}
      </div>

      {/* Text below */}
      <div className="h-full bg-gradient-to-b from-gray-900 to-black p-6">
        <div className="mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">
            Case Study {index + 1}
          </span>
        </div>
        <h3 className="mb-2 font-serif text-xl font-bold tracking-tight text-white">{project.title}</h3>
        {getDescription() && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-300">{getDescription()}</p>
        )}
        {!isComingSoon ? (
          <Link
            href={`/case-studies/${project.slug.current}`}
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-primary-300 transition-colors duration-300 hover:text-primary-200"
          >
            <span className="tracking-wide">View Details</span>
            <svg
              className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        ) : (
          <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-500">
            <span className="tracking-wide">Coming Soon</span>
          </div>
        )}
      </div>
    </div>
  )
}
