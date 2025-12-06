import Link from 'next/link'
import { ResponsiveImage } from './ResponsiveImage'
import type { BlogPost } from '@/types'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : null

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className={cn('group block', className)}
    >
      <div className="relative aspect-[16/10] mb-4 overflow-hidden bg-primary-100">
        {post.featuredImage && (
          <ResponsiveImage
            image={post.featuredImage}
            alt={post.title}
            fill
            className="transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div>
        {date && (
          <p className="text-xs text-primary-500 uppercase tracking-wider mb-2">
            {date}
          </p>
        )}
        <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary-700 transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-primary-600 line-clamp-3">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}

