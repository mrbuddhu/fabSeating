import { Metadata } from 'next'
import { generateSEOMetadata } from '@/components/SEOHead'
import { CaseStudyDetailContent } from '@/components/CaseStudyDetailContent'

const caseStudy = {
  _id: 'regal-home-kilpauk',
  title: 'A Regal Home Transformation in Kilpauk',
  subtitle: 'Complete Furniture & Furnishings for a 3-Storey Residence',
  client: 'Murugan',
  location: 'Kilpauk, Chennai',
  year: '2024',
  industry: 'residential',
  summary:
    'Complete furniture and furnishings for a 3-storey residence featuring custom throne chairs and bespoke accent pieces.',
  heroImage:
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80',
  challenge: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text:
            "When Mr. Murugan approached us for his newly built three-storey home in Kilpauk, the goal was clear — create a space that felt grand, refined, and deeply personal. This wasn't just about filling rooms with furniture. It was about defining a lifestyle.",
        },
      ],
    },
  ],
  solution: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text:
            'We executed end-to-end furniture and furnishing solutions across all three levels of the residence, including custom-designed sofas, one-seater lounge chairs, premium dining chairs, luxurious curtains and soft furnishings, statement throne chairs, and bespoke accent pieces.',
        },
      ],
    },
  ],
  result: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text:
            'The final outcome was a beautifully layered home that blends comfort with grandeur. Each floor carries its own identity while maintaining a cohesive, luxurious feel throughout. From everyday seating to statement furniture, the residence now reflects sophistication, comfort, and timeless design.',
        },
      ],
    },
  ],
  stats: [
    { label: 'Project Scope', value: '3-Storey Residence' },
    { label: 'Custom Pieces', value: '25+ Items' },
    { label: 'Completion', value: '2024' },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366214047-2a8ba81e032e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  ],
}

const throneChairImage =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: caseStudy.title,
  description: caseStudy.summary,
  path: `/case-studies/regal-home-kilpauk`,
})

export default function CaseStudyPage() {
  return (
    <CaseStudyDetailContent
      caseStudy={caseStudy}
      narrativeStyle="columns"
      storyLabels={{
        challenge: 'The Vision',
        solution: 'What We Delivered',
        result: 'The Result',
      }}
      solutionBullets={[
        'Custom-designed sofas',
        'One-seater lounge chairs',
        'Premium dining chairs',
        'Luxurious curtains and soft furnishings',
        'Statement throne chairs',
        'Bespoke accent pieces',
      ]}
      highlights={[
        {
          eyebrow: 'Signature piece',
          title: 'Custom Throne Chairs',
          description:
            "The highlight of the project? Custom throne chairs — bold, sculptural, and unmistakably regal. These weren't just seating pieces; they became conversation starters and focal points of the home.\n\nCrafted with intricate detailing and premium materials, they added a royal character that truly set the space apart.",
          image: throneChairImage,
        },
      ]}
    />
  )
}
