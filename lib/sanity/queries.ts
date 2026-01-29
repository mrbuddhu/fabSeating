import { client } from './client'
import type { Project, BlogPost, Testimonial, SolutionPage, Catalog } from '@/types'

function isSanityConfigured() {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
}

export async function getHomePageData() {
  if (!isSanityConfigured()) {
    return {
      categories: [],
      testimonials: [],
    }
  }

  const [categories, testimonials] = await Promise.all([
    client.fetch(
      `*[_type == "productCategory"] | order(_createdAt desc) [0...8]`,
      {},
      { next: { tags: ['sanity', 'sanity:productCategory'] } } as any,
    ),
    client.fetch(
      `*[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...4]`,
      {},
      { next: { tags: ['sanity', 'sanity:testimonial'] } } as any,
    ),
  ])

  return {
    categories,
    testimonials,
  }
}


export async function getProjects(category?: string): Promise<Project[]> {
  if (!isSanityConfigured()) return []
  const categoryFilter = category ? `&& category == $category` : ''
  return client.fetch(
    `*[_type == "project"${categoryFilter}] | order(_createdAt desc) {
      _id,
      _type,
      _updatedAt,
      title,
      slug,
      description,
      images,
      location,
      year,
      category,
      featured,
      seo
    }`,
    category ? { category } : {},
    { next: { tags: ['sanity', 'sanity:project'] } } as any,
  )
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) return []
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      _type,
      _updatedAt,
      title,
      slug,
      excerpt,
      featuredImage,
      author->{
        name,
        image
      },
      publishedAt,
      seo
    }`,
    {},
    { next: { tags: ['sanity', 'sanity:blogPost'] } } as any,
  )
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured()) return null
  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      _type,
      _updatedAt,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      author->{
        name,
        image
      },
      publishedAt,
      seo
    }`,
    { slug },
    { next: { tags: ['sanity', 'sanity:blogPost'] } } as any,
  )
  return post || null
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured()) return []
  return client.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc) {
      _id,
      _type,
      name,
      role,
      company,
      content,
      image,
      rating,
      featured
    }`,
    {},
    { next: { tags: ['sanity', 'sanity:testimonial'] } } as any,
  )
}


export async function getSiteSettings() {
  if (!isSanityConfigured()) {
    return {
      announcement: null,
    }
  }
  return {
    announcement: null,
  }
}

export async function getSolutionPage(
  type: 'residential' | 'office' | 'hospitality',
): Promise<{ heroImage?: any; secondaryImage?: any; galleryImages?: any[]; seo?: any } | null> {
  if (!isSanityConfigured()) return null
  const page = await client.fetch(
    `*[_type == "solutionPage" && type == $type][0] {
      heroImage,
      secondaryImage,
      galleryImages,
      seo
    }`,
    { type },
    { next: { tags: ['sanity', 'sanity:solutionPage'] } } as any,
  )
  return page || null
}

export async function getSitemapData() {
  if (!isSanityConfigured()) {
    return {}
  }
  return {}
}

export async function getCatalogs(): Promise<Catalog[]> {
  if (!isSanityConfigured()) return []
  return client.fetch(
    `*[_type == "catalog"] | order(_createdAt desc) {
      _id,
      _type,
      title,
      description,
      coverImage,
      "fileUrl": file.asset->url,
      seo
    }`,
    {},
    { next: { tags: ['sanity', 'sanity:catalog'] } } as any,
  )
}
