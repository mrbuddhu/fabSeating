export type BlogPost = {
  slug: string
  htmlFile: string
  title: string
  description: string
  category: string
  readTime: string
  date: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'fab-seating-blog',
    htmlFile: 'fab-seating-blog.html',
    title: 'Top 10 Custom Furniture Trends in Chennai for 2026',
    description:
      'Discover the top 10 custom furniture trends shaping Chennai homes in 2026 — from breathable cane inserts and biophilic curves to climate-smart upholstery and heritage brass accents.',
    category: 'Residential · Trends',
    readTime: '9 min read',
    date: 'Jan 2026',
  },
  {
    slug: 'fab-seating-custom-vs-readymade',
    htmlFile: 'fab-seating-custom-vs-readymade.html',
    title: 'Made-to-Order vs. Ready-Made Furniture: Which Is Better for Your Home?',
    description:
      'Trying to decide between custom and ready-made furniture? We break down cost, durability, space fit, and design flexibility — so you can make the right call for your home in Chennai.',
    category: 'Buying Guide',
    readTime: '8 min read',
    date: 'Feb 2026',
  },
  {
    slug: 'fab-seating-integrated-solutions',
    htmlFile: 'fab-seating-integrated-solutions.html',
    title: 'Why Large Projects Require Integrated Furniture & Furnishing Solutions',
    description:
      "Large villas, corporate offices, hotels, and commercial spaces can't be furnished room by room. Here's why integrated furniture and furnishing solutions deliver better results — and what fragmented sourcing actually costs you.",
    category: 'Commercial · Hospitality',
    readTime: '11 min read',
    date: 'Feb 2026',
  },
  {
    slug: 'fab-seating-office-furniture-guide',
    htmlFile: 'fab-seating-office-furniture-guide.html',
    title: 'How to Choose Office Furniture for Growing Teams',
    description:
      'A practical, detailed guide to choosing office furniture that scales with your team — covering ergonomics, modular layouts, storage, collaboration zones, and the mistakes most growing companies make.',
    category: 'Office · Commercial',
    readTime: '12 min read',
    date: 'Feb 2026',
  },
  {
    slug: 'fab-seating-sofa-guide',
    htmlFile: 'fab-seating-sofa-guide.html',
    title: 'How to Choose the Perfect Sofa for Your Living Room',
    description:
      'A practical, experience-backed sofa buying guide for Chennai homeowners — covering room sizing, frame quality, fabric selection, cushion types, and how to avoid common sofa-buying mistakes.',
    category: 'Residential · Buying Guide',
    readTime: '10 min read',
    date: 'Feb 2026',
  },
]

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

