import { CONTACT, waLink } from '@/lib/siteContent'

export type CataloguePageCopy = {
  eyebrow: string
  title: string
  description: string
  exploreLabel: string
  sectionTitle: string
  sectionDescription: string
  helpTitle: string
  helpBody: string
  helpButton: string
  visitTitle: string
  visitBody: string
  directionsLabel: string
  contactLabel: string
  enquireHref: string
  mapsUrl: string
}

export const defaultCatalogueCopy: CataloguePageCopy = {
  eyebrow: 'Fab Seating | Catalogues',
  title: 'Explore Our Catalogues',
  description: 'Discover furniture and furnishing options designed to complement your space. Explore our catalogues for inspiration, find styles that suit your preferences, and discover possibilities for your home.',
  exploreLabel: 'Explore Catalogues',
  sectionTitle: 'Find Your Inspiration',
  sectionDescription: 'Explore our range of furniture and furnishings through our curated catalogues. Browse different styles and discover options to suit your space.',
  helpTitle: 'Looking for Something Specific?',
  helpBody: 'Have a design in mind or need help exploring the right options for your space? Our team is here to help you discover furniture and furnishings that suit your requirements.',
  helpButton: 'Enquire on WhatsApp',
  visitTitle: 'See It. Feel It. Find Your Fit.',
  visitBody: 'Explore furniture and furnishings in person at Fab Seating. Visit our showroom to discover available options and speak with our team about your requirements.',
  directionsLabel: 'Get Directions',
  contactLabel: 'Contact Us',
  enquireHref: waLink("Hi Fab Seating, I've been exploring your catalogues and would like to know more about your furniture and furnishing options."),
  mapsUrl: CONTACT.mapsUrl,
}
