import { client } from './client'
import type { Product, ProductCategory, Project, BlogPost, Testimonial, FAQ, LandingPage, SolutionPage } from '@/types'

function isSanityConfigured() {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
}

export async function getHomePageData() {
  if (!isSanityConfigured()) {
    return {
      categories: [],
      featuredProducts: [],
      featuredProjects: [],
      whyChooseUs: null,
      testimonials: [],
      cta: null,
    }
  }
  
  const settings = await client.fetch(`*[_type == "siteSettings"][0] {
    whyChooseUs,
    homeCta
  }`)

  const [categories, featuredProducts, featuredProjects, testimonials] = await Promise.all([
    client.fetch(`*[_type == "productCategory"] | order(_createdAt desc) [0...8]`),
    client.fetch(`*[_type == "product" && featured == true] | order(_createdAt desc) [0...6]`),
    client.fetch(`*[_type == "project" && featured == true] | order(_createdAt desc) [0...3]`),
    client.fetch(`*[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...4]`),
  ])

  return {
    categories,
    featuredProducts,
    featuredProjects,
    whyChooseUs: settings?.whyChooseUs || null,
    testimonials,
    cta: settings?.homeCta || null,
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) return []
  return client.fetch(`*[_type == "product"] | order(_createdAt desc) {
    _id,
    _type,
    _updatedAt,
    title,
    description,
    category->{
      _id,
      title,
      slug
    },
    price,
    images,
    featured,
    seo
  }`)
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  if (!isSanityConfigured()) return []
  return client.fetch(`*[_type == "productCategory"] | order(title asc) {
    _id,
    _type,
    title,
    slug,
    description,
    image
  }`)
}

export async function getProjects(category?: string): Promise<Project[]> {
  if (!isSanityConfigured()) return []
  const categoryFilter = category ? `&& category == $category` : ''
  return client.fetch(`*[_type == "project"${categoryFilter}] | order(_createdAt desc) {
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
  }`, category ? { category } : {})
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) return []
  return client.fetch(`*[_type == "blogPost"] | order(publishedAt desc) {
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
  }`)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured()) return null
  const post = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0] {
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
  }`, { slug })
  return post || null
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured()) return []
  return client.fetch(`*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    _type,
    name,
    role,
    company,
    content,
    image,
    rating,
    featured
  }`)
}

export async function getFAQs(): Promise<FAQ[]> {
  if (!isSanityConfigured()) return []
  return client.fetch(`*[_type == "faq"] | order(_createdAt asc) {
    _id,
    _type,
    question,
    answer,
    category
  }`)
}

export async function getLandingPageBySlug(slug: string): Promise<LandingPage | null> {
  if (!isSanityConfigured()) return null
  const page = await client.fetch(`*[_type == "landingPage" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    sections,
    seo
  }`, { slug })
  return page || null
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

export async function getSolutionPage(type: 'residential' | 'office' | 'hospitality'): Promise<SolutionPage | null> {
  if (!isSanityConfigured()) return null
  const page = await client.fetch(`*[_type == "solutionPage" && type == $type][0] {
    _id,
    _type,
    type,
    title,
    subtitle,
    introText,
    heroImage,
    furnitureItems,
    furnishingsItems,
    bestSuitedFor,
    secondaryImage,
    seo
  }`, { type })
  return page || null
}

export async function getSitemapData() {
  if (!isSanityConfigured()) {
    return {}
  }
  return {}
}

