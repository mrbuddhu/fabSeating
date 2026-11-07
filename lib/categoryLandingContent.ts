import { CONTACT, waLink } from './siteContent'
import type { CategoryLandingDoc, ProductImage } from './sanity/queries'

export type LandingImage = { src: string; alt: string; fit?: 'cover' | 'contain' }

export type CategoryLandingModel = {
  seoTitle: string
  seoDescription: string
  seo: NonNullable<CategoryLandingDoc>['seo']
  hero: {
    eyebrow: string
    title: string
    description: string
    image?: LandingImage
    exploreLabel: string
    whatsappLabel: string
    whatsappHref: string
  }
  collection: {
    eyebrow: string
    title: string
    description: string
    moreLabel: string
    photos: LandingImage[]
    products: ProductImage[]
  }
  lifestyle: { title: string; points: string[] }
  guide: {
    eyebrow: string
    title: string
    description: string
    image?: LandingImage
    tips: { title: string; body: string }[]
  }
  spaces: {
    eyebrow: string
    title: string
    description: string
    items: { title: string; image?: LandingImage }[]
  }
  related: {
    eyebrow: string
    title: string
    description: string
    items: { title: string; href: string; image?: LandingImage }[]
  }
  faq: { title: string; intro: string; items: { question: string; answer: string }[] }
  showroom: {
    eyebrow: string
    title: string
    description: string
    address: string
    image?: LandingImage
    mapsUrl: string
    whatsappHref: string
  }
  closing: {
    title: string
    description: string
    whatsappLabel: string
    whatsappHref: string
    exploreLabel: string
  }
}

type CategoryRef = { slug: string; title: string; cover?: string | null }

function text(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

function picture(image: { url?: string; alt?: string } | null | undefined, fallbackAlt: string, fallback?: LandingImage): LandingImage | undefined {
  if (image?.url) return { src: image.url, alt: image.alt?.trim() || fallbackAlt, fit: 'cover' }
  return fallback
}

function sofaCopy(title: string) {
  return {
    eyebrow: 'SOFAS',
    heroTitle: 'Sofas for Comfortable and Stylish Living',
    heroDescription: 'Discover a curated range of sofas at Fab Seating that bring together everyday comfort, thoughtful design and a look that complements your home.',
    exploreLabel: 'Explore Sofas',
    whatsappLabel: 'Enquire on WhatsApp',
    collectionEyebrow: 'OUR COLLECTION',
    collectionTitle: 'Explore Our Sofa Collection',
    collectionDescription: 'From modern and minimal to classic and inviting, explore sofa designs that suit different spaces, layouts and interior styles.',
    moreLabel: 'Explore More',
    lifestyleTitle: 'A Sofa for the Way You Live',
    points: ['Comfortable Seating', 'Thoughtful Designs', 'Fits Different Spaces', 'A Range of Styles'],
    guideEyebrow: 'CHOOSING A SOFA',
    guideTitle: 'Find the Right Sofa for Your Space',
    guideDescription: 'A sofa should feel comfortable, look good and work well in your home. Here are a few things to consider as you explore your options.',
    tips: [
      { title: 'Consider the Size', body: 'Look at the available space, room layout and the proportions that will work best in your home.' },
      { title: 'Think About Comfort', body: 'Choose a seating option that feels comfortable for your everyday use, whether it is for relaxing, entertaining or family time.' },
      { title: 'Match Your Interior Style', body: 'Consider the overall look and feel of your space, including the colours, textures and other furniture.' },
      { title: 'Explore the Available Options', body: 'Visit our showroom to see the sofa collection in person and find a design that suits your needs.' },
    ],
    spacesEyebrow: 'SOFA INSPIRATION',
    spacesTitle: 'Sofas for Different Spaces',
    spacesDescription: 'Explore how sofas can work in different areas of your home, from living rooms to more versatile spaces.',
    spaces: ['Living Rooms', 'Family Spaces', 'Apartments & Compact Homes'],
    relatedEyebrow: 'COMPLETE YOUR INTERIORS',
    relatedTitle: 'Explore More at Fab Seating',
    relatedDescription: 'Discover other furniture and furnishings to create a connected and comfortable home.',
    faqTitle: 'Sofas — Frequently Asked Questions',
    faqIntro: 'Quick answers to common questions about our sofa collection.',
    faqs: [
      { question: 'Where can I explore sofas at Fab Seating?', answer: 'Visit the showroom at 428, Kilpauk Garden Road, Kilpauk, Chennai, or message us on WhatsApp to plan your visit.' },
      { question: 'How do I choose the right sofa for my home?', answer: 'Start with the room size, how you use the seating, and the colours already in the space. The showroom team can help you compare designs in person.' },
      { question: 'Are different sofa designs available at Fab Seating?', answer: 'Yes. The collection includes modern, classic, and custom sofas, and each piece can be tailored in size, fabric, and finish.' },
      { question: 'Can I enquire about a sofa on WhatsApp?', answer: 'Yes. Message +91 8870666135 with the sofa you have in mind and the team will share details and a quotation.' },
      { question: 'Where is the Fab Seating showroom located?', answer: 'Fab Seating is at 428, Kilpauk Garden Road, Aspiran Garden Colony, Kilpauk, Chennai 600010.' },
    ],
    showroomEyebrow: 'VISIT OUR SHOWROOM',
    showroomTitle: 'Experience the Sofa Collection in Person',
    showroomDescription: 'Visit Fab Seating in Kilpauk, Chennai, to explore our sofa collection and discover options that suit your home and lifestyle.',
    closingTitle: "Bring Home a Sofa You'll Love",
    closingDescription: 'Explore the sofa collection at Fab Seating or contact our team to learn more about the available options.',
    closingWhatsapp: 'Discover on WhatsApp',
    title,
  }
}

function genericCopy(title: string) {
  const lower = title.toLowerCase()
  return {
    eyebrow: title.toUpperCase(),
    heroTitle: `${title} for Comfortable and Stylish Living`,
    heroDescription: `Discover a curated range of ${lower} at Fab Seating, chosen for everyday comfort, thoughtful design, and a look that complements your space.`,
    exploreLabel: `Explore ${title}`,
    whatsappLabel: 'Enquire on WhatsApp',
    collectionEyebrow: 'OUR COLLECTION',
    collectionTitle: `Explore Our ${title} Collection`,
    collectionDescription: `From modern and minimal to classic and inviting, explore ${lower} that suit different spaces, layouts and interior styles.`,
    moreLabel: 'Explore More',
    lifestyleTitle: `${title} for the Way You Live`,
    points: ['Designed for Your Space', 'Thoughtful Designs', 'Fits Different Spaces', 'A Range of Styles'],
    guideEyebrow: `CHOOSING ${title.toUpperCase()}`,
    guideTitle: `Find the Right ${title} for Your Space`,
    guideDescription: `${title} should look considered and work well in your home. Here are a few things to consider as you explore the options.`,
    tips: [
      { title: 'Consider the Size', body: 'Look at the available space, room layout, and the proportions that will work best in your home.' },
      { title: 'Think About Daily Use', body: 'Choose a piece that feels comfortable for the way you use the room, whether that is relaxing, working, or hosting.' },
      { title: 'Match Your Interior Style', body: 'Consider the overall look and feel of your space, including the colours, textures, and other furniture.' },
      { title: 'Explore the Available Options', body: `Visit our showroom to see the ${lower} collection in person and find a design that suits your needs.` },
    ],
    spacesEyebrow: 'INSPIRATION',
    spacesTitle: `${title} for Different Spaces`,
    spacesDescription: `Explore how ${lower} can work across different areas of a home, from everyday rooms to more tailored spaces.`,
    spaces: ['Living Spaces', 'Family Homes', 'Apartments & Compact Homes'],
    relatedEyebrow: 'COMPLETE YOUR INTERIORS',
    relatedTitle: 'Explore More at Fab Seating',
    relatedDescription: 'Discover other furniture and furnishings to create a connected and comfortable home.',
    faqTitle: `${title} — Frequently Asked Questions`,
    faqIntro: `Quick answers to common questions about our ${lower} collection.`,
    faqs: [
      { question: `Where can I explore ${lower} at Fab Seating?`, answer: 'Visit the showroom at 428, Kilpauk Garden Road, Kilpauk, Chennai, or message us on WhatsApp to plan your visit.' },
      { question: `How do I choose the right ${lower} for my home?`, answer: 'Start with the room size, how you will use the piece, and the colours already in the space. The showroom team can help you compare options in person.' },
      { question: `Are different ${lower} designs available at Fab Seating?`, answer: 'Yes. Designs can be tailored in size, material, colour, and finish so the piece works with your space.' },
      { question: `Can I enquire about ${lower} on WhatsApp?`, answer: 'Yes. Message +91 8870666135 with what you have in mind and the team will share details and a quotation.' },
      { question: 'Where is the Fab Seating showroom located?', answer: 'Fab Seating is at 428, Kilpauk Garden Road, Aspiran Garden Colony, Kilpauk, Chennai 600010.' },
    ],
    showroomEyebrow: 'VISIT OUR SHOWROOM',
    showroomTitle: `Experience the ${title} Collection in Person`,
    showroomDescription: `Visit Fab Seating in Kilpauk, Chennai, to explore our ${lower} collection and discover options that suit your home and lifestyle.`,
    closingTitle: `Bring Home ${title} You'll Love`,
    closingDescription: `Explore the ${lower} collection at Fab Seating or contact our team to learn more about the available options.`,
    closingWhatsapp: 'Discover on WhatsApp',
    title,
  }
}

export function buildCategoryLanding(input: {
  slug: string
  title: string
  blurb?: string
  cover?: string | null
  doc: CategoryLandingDoc
  products: ProductImage[]
  others: CategoryRef[]
}): CategoryLandingModel {
  const base = input.slug === 'sofas' ? sofaCopy(input.title) : genericCopy(input.title)
  const doc = input.doc
  const whatsappHref = waLink(`Hi Fab Seating, I want to enquire about ${input.title}.`)
  const cover = input.cover ? { src: input.cover, alt: input.title, fit: 'contain' as const } : undefined
  const firstProduct = input.products[0] ? { src: input.products[0].src, alt: input.products[0].title, fit: 'contain' as const } : undefined
  const heroImage = picture(doc?.hero?.image, input.title, cover || firstProduct)

  const editorial = (doc?.collection?.items || [])
    .map((item) => picture(item.image, input.title))
    .filter((item): item is LandingImage => !!item)

  const spaceFallbacks = [0, 1, 2].map((index) => {
    const product = input.products[index]
    if (product) return { src: product.src, alt: product.title, fit: 'contain' as const }
    return cover || firstProduct
  })
  const spaceItems = (doc?.spaces?.items || []).filter((item) => item.title || item.image?.url)
  const spaces = (spaceItems.length ? spaceItems : base.spaces.map((title) => ({ title, image: undefined }))).map((item, index) => ({
    title: text(item.title, base.spaces[index] || input.title),
    image: picture(item.image, item.title || input.title, spaceFallbacks[index] || heroImage),
  }))

  const relatedItems = (doc?.related?.items || []).filter((item) => item.title && item.href)
  const preferred = ['beds-mattresses', 'office-furniture', 'wardrobes', 'dining-furniture', 'curtains-blinds', 'carpets-rugs', 'wallpapers']
  const orderedOthers = [...input.others].sort((a, b) => {
    const ai = preferred.indexOf(a.slug)
    const bi = preferred.indexOf(b.slug)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })
  const related = relatedItems.length
    ? relatedItems.map((item) => ({
        title: item.title!,
        href: item.href!,
        image: picture(item.image, item.title!),
      }))
    : orderedOthers.slice(0, 7).map((item) => ({
        title: item.title,
        href: `/category/${item.slug}`,
        image: item.cover ? { src: item.cover, alt: item.title, fit: 'cover' as const } : undefined,
      }))

  const tips = (doc?.guide?.tips || []).filter((tip) => tip.title && tip.body)
  const faqs = (doc?.faq?.items || []).filter((item) => item.question && item.answer)
  const points = (doc?.lifestyle?.points || []).map((point) => point.title?.trim()).filter((point): point is string => !!point)

  return {
    seoTitle: text(doc?.seo?.title, `${input.title} in Chennai`),
    seoDescription: text(doc?.seo?.description, text(doc?.hero?.description, input.blurb || base.heroDescription)),
    seo: doc?.seo,
    hero: {
      eyebrow: text(doc?.hero?.eyebrow, base.eyebrow),
      title: text(doc?.hero?.title, base.heroTitle),
      description: text(doc?.hero?.description, base.heroDescription),
      image: heroImage,
      exploreLabel: text(doc?.hero?.exploreLabel, base.exploreLabel),
      whatsappLabel: text(doc?.hero?.whatsappLabel, base.whatsappLabel),
      whatsappHref,
    },
    collection: {
      eyebrow: text(doc?.collection?.eyebrow, base.collectionEyebrow),
      title: text(doc?.collection?.title, base.collectionTitle),
      description: text(doc?.collection?.description, base.collectionDescription),
      moreLabel: text(doc?.collection?.moreLabel, base.moreLabel),
      photos: editorial.length ? editorial : !input.products.length && cover ? [cover] : [],
      products: input.products,
    },
    lifestyle: {
      title: text(doc?.lifestyle?.title, base.lifestyleTitle),
      points: points.length ? points : base.points,
    },
    guide: {
      eyebrow: text(doc?.guide?.eyebrow, base.guideEyebrow),
      title: text(doc?.guide?.title, base.guideTitle),
      description: text(doc?.guide?.description, base.guideDescription),
      image: picture(doc?.guide?.image, input.title, heroImage),
      tips: tips.length ? tips.map((tip) => ({ title: tip.title!, body: tip.body! })) : base.tips,
    },
    spaces: {
      eyebrow: text(doc?.spaces?.eyebrow, base.spacesEyebrow),
      title: text(doc?.spaces?.title, base.spacesTitle),
      description: text(doc?.spaces?.description, base.spacesDescription),
      items: spaces,
    },
    related: {
      eyebrow: text(doc?.related?.eyebrow, base.relatedEyebrow),
      title: text(doc?.related?.title, base.relatedTitle),
      description: text(doc?.related?.description, base.relatedDescription),
      items: related,
    },
    faq: {
      title: text(doc?.faq?.title, base.faqTitle),
      intro: text(doc?.faq?.intro, base.faqIntro),
      items: faqs.length ? faqs.map((item) => ({ question: item.question!, answer: item.answer! })) : base.faqs,
    },
    showroom: {
      eyebrow: text(doc?.showroom?.eyebrow, base.showroomEyebrow),
      title: text(doc?.showroom?.title, base.showroomTitle),
      description: text(doc?.showroom?.description, base.showroomDescription),
      address: text(doc?.showroom?.address, 'Fab Seating, Kilpauk, Chennai – 600010'),
      image: picture(doc?.showroom?.image, 'Fab Seating showroom', { src: '/images/experience-showroom.jpg', alt: 'Fab Seating showroom' }),
      mapsUrl: CONTACT.mapsUrl,
      whatsappHref,
    },
    closing: {
      title: text(doc?.closing?.title, base.closingTitle),
      description: text(doc?.closing?.description, base.closingDescription),
      whatsappLabel: text(doc?.closing?.whatsappLabel, base.closingWhatsapp),
      whatsappHref,
      exploreLabel: text(doc?.closing?.exploreLabel, base.exploreLabel),
    },
  }
}
