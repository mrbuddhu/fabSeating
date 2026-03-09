import { notFound } from 'next/navigation'
import { getCaseStudyBySlug } from '@/lib/sanity/queries'
import { CaseStudyDetailContent } from '@/components/CaseStudyDetailContent'

// Dummy data for preview when no Sanity data is available
const dummyCaseStudies: Record<string, any> = {
  'tech-hub-workspace': {
    _id: 'dummy-1',
    _type: 'caseStudy',
    title: 'Tech Hub Workspace',
    subtitle: 'A futuristic office space designed for collaboration and innovation',
    summary: 'Modern office setup with ergonomic furniture and collaborative workspaces.',
    client: 'TechCorp Solutions',
    location: 'Chennai, Tamil Nadu',
    year: '2024',
    industry: 'office',
    // Uses locally uploaded image from /public/images/case-studies/
    heroImage: '/images/case-studies/tech-hub-workspace.webp',
    challenge: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Client needed a modern workspace that would foster innovation and team collaboration.'
          }
        ]
      }
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We created a tech hub with modular workstations, collaborative zones, and advanced meeting rooms.'
          }
        ]
      }
    ],
    result: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A transformed workspace that increased productivity and team satisfaction by 40%.'
          }
        ]
      }
    ],
    stats: [
      {
        _type: 'object',
        label: 'Project Duration',
        value: '3 months'
      },
      {
        _type: 'object',
        label: 'Square Footage',
        value: '2,500 sq ft'
      },
      {
        _type: 'object',
        label: 'Workstations',
        value: '15+'
      }
    ]
  },
  'luxury-villa-interiors': {
    _id: 'dummy-2',
    _type: 'caseStudy',
    title: 'Luxury Villa Interiors',
    subtitle: 'Bespoke furniture collection for a premium residential project',
    summary: 'High-end custom furniture and furnishings for a luxury villa with Italian marble and premium materials.',
    client: 'Mr. & Mrs. Sharma',
    location: 'Adyar, Chennai',
    year: '2024',
    industry: 'residential',
    // Uses locally uploaded image from /public/images/case-studies/
    heroImage: '/images/case-studies/luxury-villa-interiors.webp',
    challenge: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Client wanted luxury interiors that would reflect their sophisticated taste while maintaining functionality.'
          }
        ]
      }
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We designed custom furniture pieces, sourced Italian marble, and created a cohesive luxury aesthetic.'
          }
        ]
      }
    ],
    result: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A stunning villa transformation that exceeded client expectations with premium materials and craftsmanship.'
          }
        ]
      }
    ],
    stats: [
      {
        _type: 'object',
        label: 'Project Duration',
        value: '6 months'
      },
      {
        _type: 'object',
        label: 'Budget',
        value: '₹45 Lakhs'
      },
      {
        _type: 'object',
        label: 'Custom Pieces',
        value: '25+ items'
      }
    ]
  },
  'boutique-hotel-lobby': {
    _id: 'dummy-3',
    _type: 'caseStudy',
    title: 'Boutique Hotel Lobby',
    subtitle: 'Coming soon – hospitality case study in progress',
    summary: 'We are currently documenting this hospitality project. Full details, photos, and metrics will be published soon.',
    client: 'Grand Plaza Hotel',
    location: 'Chennai, Tamil Nadu',
    year: '2024',
    industry: 'hospitality',
    // Uses locally uploaded image from /public/images/case-studies/
    heroImage: '/images/case-studies/boutique-hotel-lobby.webp',
    // No detailed sections yet – this entry is intentionally minimal
    challenge: [],
    solution: [],
    result: [],
    stats: [
      {
        _type: 'object',
        label: 'Project Status',
        value: 'Coming Soon'
      }
    ]
  }
}

interface CaseStudyPageProps {
  params: { slug: string }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  let caseStudy = await getCaseStudyBySlug(params.slug)

  if (!caseStudy) {
    // Check for dummy data
    if (dummyCaseStudies[params.slug]) {
      caseStudy = dummyCaseStudies[params.slug] as any
    } else {
      return notFound()
    }
  }

  if (!caseStudy) {
    return notFound()
  }

  return <CaseStudyDetailContent caseStudy={caseStudy} />
}
