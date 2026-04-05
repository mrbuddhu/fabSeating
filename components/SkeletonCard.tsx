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
        {/* Match catalog MediaCard: flexible image area */}
        <div className="flex min-h-[220px] w-full items-center justify-center overflow-hidden bg-neutral-100 px-2 py-6 sm:min-h-[260px]">
          <Skeleton className="aspect-[3/4] w-4/5 max-w-[240px] bg-gray-200 animate-pulse rounded-md" />
        </div>

        {/* Content Area — compact like catalog variant */}
        <div className="p-4 sm:p-5">
          <Skeleton className="h-7 w-3/4 bg-gray-200 mb-3" />
          <Skeleton className="h-3.5 w-full bg-gray-100 mb-1.5" />
          <Skeleton className="h-3.5 w-2/3 bg-gray-100 mb-3" />
          <Skeleton className="h-4 w-20 bg-gray-200" />
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
        'relative block h-full overflow-hidden rounded-lg bg-gray-900 shadow-xl',
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Skeleton className="h-full w-full animate-pulse bg-gray-800" />
        <div className="absolute right-4 top-4 z-20">
          <Skeleton className="h-6 w-20 bg-gray-700" />
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-900 to-black p-6">
        <Skeleton className="mb-2 h-3 w-24 bg-gray-800" />
        <Skeleton className="mb-2 h-8 w-3/4 bg-gray-800" />
        <Skeleton className="mb-1 h-4 w-full bg-gray-800" />
        <Skeleton className="mb-4 h-4 w-2/3 bg-gray-800" />
        <Skeleton className="h-4 w-24 bg-gray-800" />
      </div>

      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  )
}
