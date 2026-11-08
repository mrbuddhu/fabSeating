// Central content config for FabSeating site updates (2026).
// Section defaults (categories, partners, industries, FAQs) live in siteDefaults.json so the
// Sanity seed script can reuse them. Edit them in Sanity Studio (Homepage) once seeded.
import defaults from './siteDefaults.json'

// Business contact details — single source of truth.
export const CONTACT = {
  phoneDisplay: '+91 88706 66135',
  phoneTel: '+918870666135',
  whatsapp: '918870666135', // wa.me/<this>
  email: 'info@fabseating.com',
  showroom: 'Kilpauk, Chennai',
  addressLine: '428, Kilpauk Garden Road, Aspiran Garden Colony, Kilpauk, Chennai, Tamil Nadu 600010',
  mapsUrl: 'https://www.google.com/maps/search/Fab+Seating+Kilpauk/@13.08379,80.23497,17z',
  reviewsUrl: 'https://www.google.com/maps/search/Fab+Seating+Kilpauk/@13.08379,80.23497,17z',
  serviceArea: 'Chennai · Pan India delivery & installation',
  instagram: 'https://www.instagram.com/fabseating/',
  youtube: 'https://www.youtube.com/@FabSeating',
  footerBlurb: 'Premium furniture & furnishings crafted with excellence. Based in Kilpauk, Chennai — delivering Pan India.',
}

export type SiteContact = typeof CONTACT

export const LABELS = {
  menuHome: 'Home',
  menuExplore: 'Explore',
  menuGallery: 'Gallery',
  menuCatalogues: 'Catalogues',
  menuContact: 'Contact',
  footerCompany: 'Company',
  footerProducts: 'Products',
  footerSupport: 'Support',
  footerBlog: 'Blog',
  footerLegals: 'Legals',
  footerPolicies: 'Policies',
  footerMaps: 'Find us on Google',
  whatsappButton: 'Enquire on WhatsApp',
  stickyWhatsApp: 'WhatsApp',
  callButton: 'Call Us',
  galleryAll: 'All',
  notFoundEyebrow: 'Fab Seating · Kilpauk',
  notFoundTitle: 'This page is not in the showroom.',
  notFoundBody: 'The address may have changed. The collections, catalogues, and the Kilpauk showroom are still here.',
  notFoundHome: 'Back to Home',
  notFoundContact: 'Contact the showroom',
}

export type SiteLabels = typeof LABELS

export function waLink(message: string, whatsapp = CONTACT.whatsapp) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
}

export function filled(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

export type Category = {
  slug: string
  title: string
  blurb: string
  cover: string | null      // public path, or null -> styled placeholder
  imageDirs: string[]       // dirs under /public/images to pull the product grid from
}

// The 13 categories from the client brief. Covers wired to organized Drive images
// where product shots exist; the rest await client photography.
export const CATEGORIES: Category[] = defaults.categories

export const BRAND_PARTNERS: { name: string; logo: string }[] = defaults.brandPartners

export const INDUSTRIES: string[] = defaults.industries

export const FAQS: { q: string; a: string }[] = defaults.faqs
