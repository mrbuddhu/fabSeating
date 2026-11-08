import { client } from './client'
import type { Project, CaseStudy, BlogPost, Testimonial, SolutionPage, Catalog } from '@/types'
import { CONTACT, filled, type SiteContact } from '@/lib/siteContent'

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

  const [categories, testimonials, featuredProjects] = await Promise.all([
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
    client.fetch(
      `*[_type == "caseStudy"] | order(_createdAt desc) [0...3] {
        _id,
        title,
        slug,
        summary,
        heroImage,
        videoUrl,
        industry
      }`,
      {},
      { next: { tags: ['sanity', 'sanity:caseStudy'] } } as any,
    ),
  ])

  return {
    categories,
    testimonials,
    featuredProjects,
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
      videoUrl,
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
      challenge,
      solution,
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
      thumbnail,
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

export async function getArticleMedia(): Promise<{ slug: string; image?: import('@/types').SanityImage; thumbnail?: import('@/types').SanityImage }[]> {
  if (!isSanityConfigured()) return []
  return client.fetch(
    `*[_type == "articleMedia" && !(_id in path("drafts.**"))]{
      slug,
      image,
      thumbnail
    }`,
    {},
    { next: { tags: ['sanity', 'sanity:articleMedia'] } } as any,
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
      thumbnail,
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


export type PageSeoOverride = { path?: string; title?: string; description?: string; image?: any; noIndex?: boolean }

export type SiteSettings = {
  announcement: string | null
  logo: any
  contact: SiteContact
  seoTitle: string | null
  seoDescription: string | null
  seoImage: any
  pageSeo: PageSeoOverride[]
  cataloguesPage: Record<string, string | null | undefined> | null
  journalPage: { eyebrow?: string; title?: string; description?: string } | null
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const empty: SiteSettings = {
    announcement: null,
    logo: null,
    contact: CONTACT,
    seoTitle: null,
    seoDescription: null,
    seoImage: null,
    pageSeo: [],
    cataloguesPage: null,
    journalPage: null,
  }
  if (!isSanityConfigured()) return empty
  const doc = await client.fetch(
    `*[_type == "siteSettings"][0] {
      announcementText,
      logo,
      phoneDisplay, phoneTel, whatsapp, email, addressLine, showroom, mapsUrl, reviewsUrl,
      instagramUrl, youtubeUrl, footerBlurb,
      seoTitle, seoDescription, seoImage,
      pageSeo[]{ path, title, description, image, noIndex },
      cataloguesPage,
      journalPage
    }`,
    {},
    { next: { tags: ['sanity', 'sanity:siteSettings'] } } as any,
  )
  return {
    announcement: doc?.announcementText ?? null,
    logo: doc?.logo ?? null,
    contact: {
      phoneDisplay: filled(doc?.phoneDisplay, CONTACT.phoneDisplay),
      phoneTel: filled(doc?.phoneTel, CONTACT.phoneTel),
      whatsapp: filled(doc?.whatsapp, CONTACT.whatsapp),
      email: filled(doc?.email, CONTACT.email),
      showroom: filled(doc?.showroom, CONTACT.showroom),
      addressLine: filled(doc?.addressLine, CONTACT.addressLine),
      mapsUrl: filled(doc?.mapsUrl, CONTACT.mapsUrl),
      reviewsUrl: filled(doc?.reviewsUrl, CONTACT.reviewsUrl),
      serviceArea: CONTACT.serviceArea,
      instagram: filled(doc?.instagramUrl, CONTACT.instagram),
      youtube: filled(doc?.youtubeUrl, CONTACT.youtube),
      footerBlurb: filled(doc?.footerBlurb, CONTACT.footerBlurb),
    },
    seoTitle: doc?.seoTitle ?? null,
    seoDescription: doc?.seoDescription ?? null,
    seoImage: doc?.seoImage ?? null,
    pageSeo: doc?.pageSeo || [],
    cataloguesPage: doc?.cataloguesPage ?? null,
    journalPage: doc?.journalPage ?? null,
  }
}

export type FooterBanner = {
  image?: import('@/types').SanityImage
  items?: { title?: string }[]
}

/** The photo and titles above the footer on every page. */
export async function getFooterBanner(): Promise<FooterBanner | null> {
  if (!isSanityConfigured()) return null
  try {
    const banner = await client.fetch<FooterBanner | null>(
      `*[_type == "footerBanner" && _id == "footerBanner" && !(_id in path("drafts.**"))][0]{
        image,
        items[]{ title }
      }`,
      {},
      { next: { revalidate: 300, tags: ['sanity', 'sanity:footerBanner'] } } as any,
    )
    return banner || null
  } catch {
    return null
  }
}

/** Homepage singleton: hero, about reels, solutions cards, process steps */
export async function getHomePageContent() {
  if (!isSanityConfigured()) return null
  return client.fetch(
    `*[_type == "homePage" && !(_id in path("drafts.**"))] | order(_id asc)[0] {
      heroImage,
      "heroVideoUrl": heroVideoFile.asset->url,
      aboutReels[] {
        "videoUrl": coalesce(videoFile.asset->url, videoUrl),
        posterImage
      },
      solutionsCards[] {
        title,
        description,
        link,
        posterImage,
        "videoUrl": coalesce(videoFile.asset->url, videoUrl)
      },
      processTitle,
      processSteps,
      googleReviewsUrl,
      exploreIntro { eyebrow, title, description },
      industriesIntro { title, description },
      faqIntro { eyebrow, title },
      teamIntro { eyebrow, title },
      hero, quote, about, legacy, bespoke, showroomCta,
      experience { image, items[]{ title } },
      googleReviews { heading, summary, items[]{ text, date } },
      seo
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
      stripImages,
      title,
      afterTitle,
      afterBody,
      seo
    }`,
    {},
    { next: { tags: ['sanity', 'sanity:contactPage'] } } as any,
  )
}

export async function getLegalDocument(slug: 'policies' | 'legals') {
  if (!isSanityConfigured()) return null
  return client.fetch(
    `*[_type == "legalDocument" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
      title,
      blocks[]{ kind, text },
      seo
    }`,
    { slug },
    { next: { tags: ['sanity', 'sanity:legalDocument'] } } as any,
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
      "galleryImages": galleryImages[defined(asset)],
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
    `*[_type == "catalog" && !(_id in path("drafts.**"))] | order(coalesce(sortOrder, 100) asc, _createdAt desc) {
      _id,
      _type,
      title,
      eyebrow,
      description,
      sortOrder,
      coverImage,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename,
      seo
    }`,
    {},
    {
      next: { tags: ['sanity', 'sanity:catalog'], revalidate: 60 },
    } as any,
  )
}

export type ProductImage = { id?: string; src: string; title: string; description?: string; images?: string[] }

export type GalleryProduct = {
  id: string
  title: string
  description?: string
  src: string
  images?: string[]
  categorySlug?: string
  categoryTitle?: string
}

/** Published products for the Gallery page, including the category used by the filters. */
export async function getGalleryProducts(): Promise<GalleryProduct[]> {
  if (!isSanityConfigured()) return []
  try {
    const rows = await client.fetch<GalleryProduct[]>(
      `*[_type == "product" && defined(images[0].asset) && !(_id in path("drafts.**"))] | order(title asc) {
        "id": _id,
        title,
        description,
        "src": images[0].asset->url,
        "images": images[defined(asset)][].asset->url,
        "categorySlug": category->slug.current,
        "categoryTitle": category->title
      }`,
      {},
      { next: { revalidate: 300, tags: ['sanity', 'sanity:product', 'sanity:productCategory'] } } as any,
    )
    return (rows || []).flatMap((row) => row.src ? [{
      ...row,
      description: row.description?.trim() || undefined,
      images: (row.images || []).filter(Boolean),
      categorySlug: row.categorySlug || undefined,
      categoryTitle: row.categoryTitle || undefined,
    }] : [])
  } catch {
    return []
  }
}

/** Product images from Sanity for the given productCategory slugs (used by /category pages). */
export async function getProductImagesByCategory(categorySlugs: string[]): Promise<ProductImage[]> {
  if (!isSanityConfigured() || categorySlugs.length === 0) return []
  try {
    const rows = await client.fetch<{ _id: string; title: string; description?: string | null; src: string | null; images: string[] }[]>(
      `*[_type == "product" && category->slug.current in $slugs && defined(images[0].asset)] | order(title asc) {
        title,
        description,
        _id,
        "src": images[0].asset->url,
        "images": images[defined(asset)][].asset->url
      }`,
      { slugs: categorySlugs },
      { next: { revalidate: 300, tags: ['sanity', 'sanity:product'] } } as any
    )
    return (rows || []).flatMap((r) => r.src ? [{ id: r._id, title: r.title, description: r.description?.trim() || undefined, src: r.src, images: (r.images || []).filter(Boolean) }] : [])
  } catch {
    return []
  }
}

const landingImage = `{
  alt,
  asset,
  "url": asset->url
}`

export type CategoryLandingDoc = {
  hero?: {
    eyebrow?: string
    title?: string
    description?: string
    exploreLabel?: string
    whatsappLabel?: string
    image?: { url?: string; alt?: string; asset?: { _ref: string; _type: 'reference' } }
  }
  collection?: {
    eyebrow?: string
    title?: string
    description?: string
    moreLabel?: string
    items?: { image?: { url?: string; alt?: string } }[]
  }
  lifestyle?: { title?: string; points?: { title?: string }[] }
  guide?: {
    eyebrow?: string
    title?: string
    description?: string
    image?: { url?: string; alt?: string }
    tips?: { title?: string; body?: string }[]
  }
  spaces?: {
    eyebrow?: string
    title?: string
    description?: string
    items?: { title?: string; image?: { url?: string; alt?: string } }[]
  }
  related?: {
    eyebrow?: string
    title?: string
    description?: string
    items?: { title?: string; href?: string; image?: { url?: string; alt?: string } }[]
  }
  faq?: { title?: string; intro?: string; items?: { question?: string; answer?: string }[] }
  showroom?: {
    eyebrow?: string
    title?: string
    description?: string
    address?: string
    image?: { url?: string; alt?: string }
  }
  closing?: { title?: string; description?: string; whatsappLabel?: string; exploreLabel?: string }
  seo?: { title?: string; description?: string; noIndex?: boolean; image?: import('@/types').SanityImage }
} | null

export async function getCategoryLanding(slug: string): Promise<CategoryLandingDoc> {
  if (!isSanityConfigured()) return null
  try {
    return await client.fetch(
      `*[_type == "categoryLanding" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
        hero{ eyebrow, title, description, exploreLabel, whatsappLabel, image${landingImage} },
        collection{
          eyebrow, title, description, moreLabel,
          items[]{ image${landingImage} }
        },
        lifestyle{ title, points[]{ title } },
        guide{ eyebrow, title, description, image${landingImage}, tips[]{ title, body } },
        spaces{ eyebrow, title, description, items[]{ title, image${landingImage} } },
        related{ eyebrow, title, description, items[]{ title, href, image${landingImage} } },
        faq{ title, intro, items[]{ question, answer } },
        showroom{ eyebrow, title, description, address, image${landingImage} },
        closing{ title, description, whatsappLabel, exploreLabel },
        seo{ title, description, noIndex, image }
      }`,
      { slug },
      { next: { revalidate: 300, tags: ['sanity', 'sanity:categoryLanding'] } } as any,
    )
  } catch {
    return null
  }
}

export type MainGalleryImage = import('@/types').SanityImage & {
  categorySlug?: string
  categoryTitle?: string
}

export type GalleryPagePhoto = {
  _key: string
  title?: string
  text?: string
  filters?: string[]
  image?: import('@/types').SanityImage
}

export type GalleryPageContent = {
  title?: string
  subtitle?: string
  includeProducts: boolean
  photos: GalleryPagePhoto[]
}

/** Published Gallery page: heading, intro, and the photos an editor added. */
export async function getGalleryPage(): Promise<GalleryPageContent | null> {
  if (!isSanityConfigured()) return null
  try {
    const page = await client.fetch<GalleryPageContent | null>(
      `*[_type == "galleryPage" && _id == "galleryPage" && !(_id in path("drafts.**"))][0]{
        title,
        subtitle,
        includeProducts,
        photos[]{
          _key,
          title,
          text,
          filters,
          image
        }
      }`,
      {},
      { next: { revalidate: 300, tags: ['sanity', 'sanity:galleryPage'] } } as any,
    )
    if (!page) return null
    return {
      title: page.title?.trim() || undefined,
      subtitle: page.subtitle?.trim() || undefined,
      includeProducts: page.includeProducts !== false,
      photos: (page.photos || []).filter((photo) => photo?.image),
    }
  } catch {
    return null
  }
}

/** Only published CMS images appear on the main Gallery page. An empty list stays empty. */
export async function getMainGalleryImages(): Promise<MainGalleryImage[]> {
  if (!isSanityConfigured()) return []
  return client.fetch(
    `*[_type == "homePage" && !(_id in path("drafts.**"))] | order(_id asc)[0].galleryImages[defined(asset)]{
      _key,
      _type,
      asset,
      alt,
      caption,
      "categorySlug": category->slug.current,
      "categoryTitle": category->title
    }`,
    {},
    { next: { revalidate: 300, tags: ['sanity', 'sanity:homePage'] } } as any,
  ).then((images: MainGalleryImage[] | null) => images || [])
}
