import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/blog/posts'

export async function BlogPostRenderer({ slug }: { slug: string }) {
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-white pt-24 md:pt-28">
      <iframe
        src={`/blog/${post.htmlFile}`}
        title={post.title}
        className="w-full min-h-screen border-0"
      />
    </main>
  )
}


