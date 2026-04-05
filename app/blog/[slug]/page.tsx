import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateSEOMetadata } from '@/components/SEOHead'
import { BlogPostRenderer } from '@/app/blog/_components/BlogPostRenderer'
import { SanityBlogPostView } from '@/app/blog/_components/SanityBlogPostView'
import { BLOG_POSTS, getBlogPostBySlug as getStaticBlogPostBySlug } from '@/lib/blog/posts'
import {
  getBlogPosts,
  getBlogPostBySlug as getSanityBlogPostBySlug,
  SANITY_FETCH_REVALIDATE_SECONDS,
} from '@/lib/sanity/queries'

export const revalidate = SANITY_FETCH_REVALIDATE_SECONDS

export async function generateStaticParams() {
  const staticSlugs = BLOG_POSTS.map((p) => ({ slug: p.slug }))
  let sanitySlugs: { slug: string }[] = []
  try {
    const sanityPosts = await getBlogPosts()
    sanitySlugs = sanityPosts.map((p) => ({ slug: p.slug.current }))
  } catch {
    // Sanity not configured or fetch failed
  }
  return [...staticSlugs, ...sanitySlugs]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const staticPost = getStaticBlogPostBySlug(slug)
  if (staticPost)
    return generateSEOMetadata({
      title: staticPost.title,
      description: staticPost.description,
      path: `/blog/${staticPost.slug}`,
    })
  const sanityPost = await getSanityBlogPostBySlug(slug)
  if (sanityPost)
    return generateSEOMetadata({
      title: sanityPost.seo?.title ?? sanityPost.title,
      description: sanityPost.seo?.description ?? sanityPost.excerpt ?? undefined,
      path: `/blog/${sanityPost.slug.current}`,
    })
  return {}
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const staticPost = getStaticBlogPostBySlug(slug)
  if (staticPost) return <BlogPostRenderer slug={slug} />

  const sanityPost = await getSanityBlogPostBySlug(slug)
  if (sanityPost) return <SanityBlogPostView post={sanityPost} />

  notFound()
}

