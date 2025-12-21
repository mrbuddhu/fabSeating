import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { BlogCard } from '@/components/BlogCard'
import { getBlogPosts } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: 'Blog',
  description: 'Latest insights, tips, and stories from FabSeating',
  path: '/blog',
})

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <PageHero
        title="Our Blog"
        subtitle="Insights, inspiration, and stories from the world of premium furniture"
      />
      <Section>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-primary-700 py-12">
            No blog posts available at the moment.
          </p>
        )}
      </Section>
    </>
  )
}

