import { Skeleton } from "@/components/Skeleton"
import { cn } from "@/lib/utils"

interface SkeletonCardProps {
  className?: string
  variant?: 'default' | 'project' | 'catalog'
}

export function SkeletonCard({ className, variant = 'default' }: SkeletonCardProps) {
  if (variant === 'catalog') {
    return (
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl bg-white shadow-2xl block h-full",
          className
        )}
      >
        {/* Image Area Skeleton (Aspect Video) */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Skeleton className="w-full h-full bg-gray-200 animate-pulse" />
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Title */}
          <Skeleton className="h-8 w-3/4 bg-gray-200 mb-4" />
          
          {/* Description */}
          <Skeleton className="h-4 w-full bg-gray-100 mb-2" />
          <Skeleton className="h-4 w-2/3 bg-gray-100 mb-6" />

          {/* CTA Link */}
          <Skeleton className="h-6 w-24 bg-gray-200" />
        </div>

        {/* Shimmer Overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
    )
  }

  if (variant === 'project') {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-gray-200 rounded-xl aspect-square block w-full",
          className
        )}
      >
        <Skeleton className="w-full h-full bg-gray-300 animate-pulse" />
        {/* Shimmer Overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-900 rounded-lg shadow-xl block h-full",
        className
      )}
    >
      {/* Image Area Skeleton */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Skeleton className="w-full h-full bg-gray-800 animate-pulse" />
        
        {/* Badge Skeleton */}
        <div className="absolute top-4 right-4 z-20">
          <Skeleton className="h-6 w-20 bg-gray-700" />
        </div>
      </div>

      {/* Content Area - Stacked below image to match CaseStudyCard layout */}
      <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="mb-2">
          <Skeleton className="h-3 w-24 bg-gray-800" />
        </div>
        <Skeleton className="h-8 w-3/4 bg-gray-800 mb-2" />
        <Skeleton className="h-4 w-full bg-gray-800 mb-1" />
        <Skeleton className="h-4 w-2/3 bg-gray-800 mb-4" />
        
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24 bg-gray-800" />
        </div>
      </div>
      
      {/* Shimmer Overlay (Shining Screen Effect) */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  )
}
