import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return {}

  return generateSEOMetadata({
    seo: post.seo,
    title: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    path: `/blog/${params.slug}`,
  })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />
      <PageHero title={post.title} />
      {post.featuredImage && (
        <Section>
          <div className="relative aspect-[16/9] bg-primary-100 -mx-4 sm:-mx-6 lg:-mx-8">
            <ResponsiveImage image={post.featuredImage} alt={post.title} fill priority />
          </div>
        </Section>
      )}
      <Section>
        <div className="max-w-3xl mx-auto">
          {(date || post.author) && (
            <div className="mb-8 text-sm text-primary-600">
              {date && <span>{date}</span>}
              {post.author && (
                <span className={date ? ' • ' : ''}>
                  By {post.author.name}
                </span>
              )}
            </div>
          )}
          {post.excerpt && (
            <p className="text-xl text-primary-700 mb-8 leading-relaxed">{post.excerpt}</p>
          )}
          {post.content && (
            <div className="prose prose-lg max-w-none">
              {typeof post.content === 'string' ? (
                <p className="text-primary-700 leading-relaxed whitespace-pre-line">{post.content}</p>
              ) : (
                <div>{JSON.stringify(post.content)}</div>
              )}
            </div>
          )}
        </div>
      </Section>
    </>
  )
}

