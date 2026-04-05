import { Metadata } from 'next'
import { generateSEOMetadata } from '@/components/SEOHead'
import { CaseStudyDetailContent } from '@/components/CaseStudyDetailContent'

const caseStudy = {
  _id: 'luxury-4bhk-nungambakkam',
  title: 'Luxury 4BHK Residence in Nungambakkam',
  subtitle: 'Complete Home Furniture & Furnishings',
  client: 'Mr. Rajesh Kothari',
  location: 'Nungambakkam, Chennai',
  year: '2024',
  industry: 'residential',
  summary:
    'Complete home furniture and furnishings featuring Italian marble dining table, home theatre recliners, and motorized curtains.',
  heroImage:
    'https://images.unsplash.com/photo-1524758631624-e2822e304a36?auto=format&fit=crop&w=1920&q=80',
  challenge: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text:
            "For Mr. Rajesh Kothari's 4BHK residence in Nungambakkam, the goal was clear — create a home that feels luxurious, modern, and seamlessly integrated with comfort. Every space needed to feel intentional. Nothing generic. Nothing off-the-shelf.",
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
            'This was a full-home execution covering major living and private spaces including custom-designed living room sofa, full home theatre recliner setup, grand Italian marble dining table with designer chairs, motorized curtains for the main hall, premium curtains across all bedrooms, and custom-made cots tailored to each room.',
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
            'The final outcome is a refined, high-end 4BHK residence that blends technology, comfort, and luxury seamlessly. Every room feels complete. Every detail feels intentional. This project reflects what happens when design, craftsmanship, and customization come together the right way.',
        },
      ],
    },
  ],
  stats: [
    { label: 'Project Type', value: '4BHK Residence' },
    { label: 'Scope', value: 'Full Home Execution' },
    { label: 'Completion', value: '2024' },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1524758631624-e2822e304a36?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366214047-2a8ba81e032e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
  ],
}

const homeTheatreImage =
  'https://images.unsplash.com/photo-1598928424272-9e66e0c2972b?auto=format&fit=crop&w=800&q=80'
const diningTableImage =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
const livingRoomImage =
  'https://images.unsplash.com/photo-1497366214047-2a8ba81e032e?auto=format&fit=crop&w=800&q=80'

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: caseStudy.title,
  description: caseStudy.summary,
  path: `/case-studies/luxury-4bhk-nungambakkam`,
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
        'Custom-designed living room sofa',
        'Full home theatre recliner setup',
        'Grand Italian marble dining table with designer chairs',
        'Motorized curtains for the main hall',
        'Premium curtains across all bedrooms',
        'Custom-made cots tailored to each room',
      ]}
      highlights={[
        {
          eyebrow: 'Entertainment',
          title: 'Home Theatre Experience',
          description:
            'A dedicated home theatre with plush recliners was designed to deliver cinema-level comfort within the home. Deep cushioning, ergonomic support, and a premium finish transformed the entertainment space into a private luxury lounge.',
          image: homeTheatreImage,
        },
        {
          eyebrow: 'Dining',
          title: 'The Dining Statement',
          description:
            'The centerpiece of the dining area was a massive Italian marble table paired with elegant chairs — bold, refined, and unmistakably premium. It anchors the space and immediately commands attention.',
          image: diningTableImage,
          imagePosition: 'left',
        },
        {
          eyebrow: 'Living spaces',
          title: 'Living & Bedrooms',
          description:
            'The living room sofa was designed to balance visual elegance with everyday comfort. Motorized curtains in the hall add both sophistication and convenience, while custom-made cots and curated curtains across all bedrooms ensure continuity in design and quality.',
          image: livingRoomImage,
        },
      ]}
    />
  )
}
