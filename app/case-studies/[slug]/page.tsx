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
    heroImage: 'https://images.unsplash.com/photo-1497366212-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304a36?auto=format&fit=crop&w=800&q=80',
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
    subtitle: 'Welcoming and elegant seating solutions for hospitality',
    summary: 'Elegant lobby design with custom furniture pieces for a boutique hotel.',
    client: 'Grand Plaza Hotel',
    location: 'Chennai, Tamil Nadu',
    year: '2024',
    industry: 'hospitality',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    challenge: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Hotel needed a lobby that would create a welcoming first impression while reflecting their brand.'
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
            text: 'We designed custom seating solutions and elegant furniture pieces that balance comfort with style.'
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
            text: 'A transformed lobby space that enhances guest experience and strengthens hotel brand identity.'
          }
        ]
      }
    ],
    stats: [
      {
        _type: 'object',
        label: 'Project Status',
        value: 'Coming Soon'
      },
      {
        _type: 'object',
        label: 'Seating Capacity',
        value: '25+ guests'
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
