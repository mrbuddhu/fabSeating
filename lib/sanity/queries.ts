import { client } from './client'
import type { Project, CaseStudy, BlogPost, Testimonial, SolutionPage, Catalog } from '@/types'

function isSanityConfigured() {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
}

export async function getHomePageData() {
  if (!isSanityConfigured()) {
    return {
      categories: [],
      testimonials: [],
      featuredProjects: [],
    }
  }

  // Homepage "Our Work" uses manual uploads only. Case studies, projects, blogs (internal pages) still use getCaseStudies, getProjects, getBlogPosts.
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
    featuredProjects: [] as any[],
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
      videoUrl,
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

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSanityConfigured()) return null
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id,
      _type,
      _updatedAt,
      title,
      slug,
      description,
      content,
      images,
      location,
      year,
      category,
      furniture,
      furnishings,
      featured,
      seo
    }`,
    { slug },
    { next: { tags: ['sanity', 'sanity:project'] } } as any,
  )
}

export async function getCaseStudies(industry?: string): Promise<CaseStudy[]> {
  if (!isSanityConfigured()) return []
  const industryFilter = industry ? `&& industry == $industry` : ''
  return client.fetch(
    `*[_type == "caseStudy"${industryFilter}] | order(_createdAt desc) {
      _id,
      _type,
      _updatedAt,
      title,
      slug,
      summary,
      heroImage,
      client,
      location,
      year,
      industry,
      videoUrl,
      seo
    }`,
    industry ? { industry } : {},
    { next: { tags: ['sanity', 'sanity:caseStudy'] } } as any,
  )
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!isSanityConfigured()) return null
  return client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id,
      _type,
      _updatedAt,
      title,
      subtitle,
      slug,
      summary,
      heroImage,
      client,
      location,
      year,
      industry,
      story,
      showcase,
      challengeImage,
      challenge,
      solutionImage,
      solution,
      resultImage,
      result,
      stats,
      gallery,
      videoUrl,
      productsUsed[]->{
        _id,
        title,
        slug,
        images
      },
      testimonial,
      seo
    }`,
    { slug },
    { next: { tags: ['sanity', 'sanity:caseStudy'] } } as any,
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
      readTime,
      category,
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
      seo,
      useJournalLayout,
      heroTag,
      byline,
      intro,
      sections[] {
        _key,
        number,
        title,
        tags,
        body,
        highlight
      },
      summaryTitle,
      summaryBody,
      summaryBullets,
      ctaHeading,
      ctaDescription,
      readTime,
      category
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
    return { announcement: null, logo: null }
  }
  const doc = await client.fetch(
    `*[_type == "siteSettings"][0] {
      announcementText,
      logo
    }`,
    {},
    { next: { tags: ['sanity', 'sanity:siteSettings'] } } as any,
  )
  return {
    announcement: doc?.announcementText ?? null,
    logo: doc?.logo ?? null,
  }
}

/** Homepage singleton: hero, about reels, solutions cards, process steps */
export async function getHomePageContent() {
  if (!isSanityConfigured()) return null
  return client.fetch(
    `*[_type == "homePage"][0] {
      heroImage,
      aboutReels[] {
        videoUrl,
        posterImage
      },
      solutionsCards[] {
        title,
        description,
        link,
        posterImage,
        videoUrl
      },
      processSteps
    }`,
    {},
    { next: { tags: ['sanity', 'sanity:homePage'] } } as any,
  )
}

/** Contact page singleton: strip images */
export async function getContactPageContent() {
  if (!isSanityConfigured()) return null
  return client.fetch(
    `*[_type == "contactPage"][0] {
      stripImages
    }`,
    {},
    { next: { tags: ['sanity', 'sanity:contactPage'] } } as any,
  )
}

/** Team members for Team section */
export async function getTeamMembers() {
  if (!isSanityConfigured()) return []
  return client.fetch(
    `*[_type == "teamMember"] | order(_createdAt asc) {
      _id,
      name,
      role,
      bio,
      image,
      socials
    }`,
    {},
    { next: { tags: ['sanity', 'sanity:teamMember'] } } as any,
  )
}

export async function getSolutionPage(
  type: 'residential' | 'office' | 'hospitality',
): Promise<{
    emoji?: string;
    title?: string;
    subtitle?: string;
    tagline?: string;
    introText?: string;
    heroImage?: any;
    galleryImages?: any[];
    whatWeDesign?: string[];
    whyChooseUs?: string[];
    approach?: string[];
    bestSuitedFor?: string;
    secondaryImage?: any;
    seo?: any;
  } | null> {
  if (!isSanityConfigured()) return null
  const page = await client.fetch(
    `*[_type == "solutionPage" && type == $type][0] {
      emoji,
      title,
      subtitle,
      tagline,
      introText,
      heroImage,
      galleryImages,
      whatWeDesign,
      whyChooseUs,
      approach,
      bestSuitedFor,
      secondaryImage,
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
    {
      next: { tags: ['sanity', 'sanity:catalog'], revalidate: 60 },
    } as any,
  )
}
