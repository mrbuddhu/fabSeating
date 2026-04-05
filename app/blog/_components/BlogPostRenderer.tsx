import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/blog/posts'

/** Bumps when static HTML under /public/blog changes, so browsers reload iframe (avoids stale hero/media). */
const BLOG_HTML_QUERY = 'v=3'

export async function BlogPostRenderer({ slug }: { slug: string }) {
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-white pt-24 md:pt-28">
      <iframe
        src={`/blog/${post.htmlFile}?${BLOG_HTML_QUERY}`}
        title={post.title}
        className="w-full min-h-screen border-0"
      />
    </main>
  )
}


