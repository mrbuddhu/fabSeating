import { client } from './client'
import type { Product, ProductCategory, Project, BlogPost, Testimonial, FAQ, LandingPage } from '@/types'

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
  
  // Only fetch dynamic content sections
  const settings = await client.fetch(`*[_type == "siteSettings"][0] {
    whyChooseUs,
    homeCta
  }`)

  const [categories, featuredProducts, featuredProjects, testimonials] = await Promise.all([
    client.fetch(`*[_type == "productCategory"] | order(_createdAt desc) [0...6]`),
    client.fetch(`*[_type == "product" && featured == true] | order(_createdAt desc) [0...6]`),
    client.fetch(`*[_type == "project" && featured == true] | order(_createdAt desc) [0...3]`),
    client.fetch(`*[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...3]`),
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
    slug,
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

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured()) return null
  const products = await client.fetch(`*[_type == "product" && slug.current == $slug][0] {
    _id,
    _type,
    _updatedAt,
    title,
    slug,
    description,
    category->{
      _id,
      title,
      slug
    },
    price,
    images,
    specifications,
    featured,
    seo
  }`, { slug })
  return products || null
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

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured()) return []
  return client.fetch(`*[_type == "project"] | order(_createdAt desc) {
    _id,
    _type,
    _updatedAt,
    title,
    slug,
    description,
    images,
    location,
    year,
    featured,
    seo
  }`)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSanityConfigured()) return null
  const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    _updatedAt,
    title,
    slug,
    description,
    images,
    location,
    year,
    featured,
    seo
  }`, { slug })
  return project || null
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
  // Note: Announcement can be added back if needed
  return {
    announcement: null,
  }
}

export async function getSitemapData() {
  if (!isSanityConfigured()) {
    return {
      products: [],
      projects: [],
      blogPosts: [],
    }
  }
  const [products, projects, blogPosts] = await Promise.all([
    client.fetch(`*[_type == "product"] { slug, _updatedAt }`),
    client.fetch(`*[_type == "project"] { slug, _updatedAt }`),
    client.fetch(`*[_type == "blogPost"] { slug, _updatedAt }`),
  ])

  return {
    products: products.map((p: any) => ({ slug: p.slug.current, _updatedAt: p._updatedAt })),
    projects: projects.map((p: any) => ({ slug: p.slug.current, _updatedAt: p._updatedAt })),
    blogPosts: blogPosts.map((p: any) => ({ slug: p.slug.current, _updatedAt: p._updatedAt })),
  }
}

