import { MetadataRoute } from 'next'
import { getSitemapData } from '@/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabseating.com'
  const data = await getSitemapData()

  const routes = [
    '',
    '/about',
    '/products',
    '/projects',
    '/blog',
    '/testimonials',
    '/faq',
    '/careers',
    '/contact',
    '/custom-furniture',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const productRoutes = data.products.map((product: { slug: string; _updatedAt?: string }) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product._updatedAt ? new Date(product._updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const projectRoutes = data.projects.map((project: { slug: string; _updatedAt?: string }) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project._updatedAt ? new Date(project._updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogRoutes = data.blogPosts.map((post: { slug: string; _updatedAt?: string }) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...routes, ...productRoutes, ...projectRoutes, ...blogRoutes]
}

