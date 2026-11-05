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
}

export function waLink(message: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`
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
