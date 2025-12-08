import { HomeHero } from '@/components/HomeHero'
import { CategoriesSection } from '@/components/CategoriesSection'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { FeaturedProjects } from '@/components/FeaturedProjects'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { TestimonialsPreview } from '@/components/TestimonialsPreview'
import { CTA } from '@/components/CTA'
import { getHomePageData } from '@/lib/sanity/queries'
import { VideoReelSection } from '@/components/VideoReelSection'
import { VideoCategoryChips } from '@/components/VideoCategoryChips'
import { BrandStrip } from '@/components/BrandStrip'

export const revalidate = 3600

export default async function Home() {
  const data = await getHomePageData()
  const heroContent = {
    headline: 'Crafting Comfort, Elevating Spaces—Since 2003',
    subheadline:
      'Premium Furniture & Furnishings in Chennai for Homes, Offices, Restaurants & Hotels',
    trustIndicators: [
      'Over 21 Years of Experience',
      '1000+ Projects Completed',
      '1000+ Satisfied Customers',
    ],
    brands: ['Molteni', 'Herman Miller', 'Fenix', 'Formica', 'Hettich', 'Daikin'],
    announcement: {
      message: 'Custom builds, nationwide delivery, and showroom consultations now open.',
      ctaLabel: 'Book a design consult',
      ctaHref: '/contact',
    },
    videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-living-room-1574/1080p.mp4',
  }
  const reelVideos = [
    { src: 'https://cdn.coverr.co/videos/coverr-modern-boutique-office-6267/1080p.mp4', title: 'Consultation in progress' },
    { src: 'https://cdn.coverr.co/videos/coverr-modern-cafe-5535/1080p.mp4', title: 'Cafe seating mock' },
    { src: 'https://cdn.coverr.co/videos/coverr-modern-apartment-6575/1080p.mp4', title: 'Residence walkthrough' },
    { src: 'https://cdn.coverr.co/videos/coverr-cozy-coffee-house-1264/1080p.mp4', title: 'Hospitality vibes' },
    { src: 'https://cdn.coverr.co/videos/coverr-office-meeting-1327/1080p.mp4', title: 'Client review' },
  ]
  const heroVideos = [
    { src: 'https://cdn.coverr.co/videos/coverr-modern-living-room-1574/1080p.mp4', title: 'Luxury living setup' },
    { src: 'https://cdn.coverr.co/videos/coverr-modern-boutique-office-6267/1080p.mp4', title: 'Office lounge' },
    { src: 'https://cdn.coverr.co/videos/coverr-modern-cafe-5535/1080p.mp4', title: 'Cafe seating' },
    { src: 'https://cdn.coverr.co/videos/coverr-modern-apartment-6575/1080p.mp4', title: 'Residence walkthrough' },
    { src: 'https://cdn.coverr.co/videos/coverr-office-meeting-1327/1080p.mp4', title: 'Client review' },
  ]
  const categoryVideos = [
    { label: 'Sofa Sets', src: 'https://cdn.coverr.co/videos/coverr-modern-living-room-1574/1080p.mp4' },
    { label: 'Dining Tables', src: 'https://cdn.coverr.co/videos/coverr-modern-dining-room-5978/1080p.mp4' },
    { label: 'Arm Chairs', src: 'https://cdn.coverr.co/videos/coverr-cozy-chair-8454/1080p.mp4' },
    { label: 'Centre Tables', src: 'https://cdn.coverr.co/videos/coverr-modern-lounge-5659/1080p.mp4' },
    { label: 'Beds', src: 'https://cdn.coverr.co/videos/coverr-modern-bedroom-2786/1080p.mp4' },
    { label: 'Console Tables', src: 'https://cdn.coverr.co/videos/coverr-modern-hall-8715/1080p.mp4' },
  ]

  return (
    <>
      <HomeHero
        data={data.hero}
        headline={heroContent.headline}
        subheadline={heroContent.subheadline}
        trustIndicators={heroContent.trustIndicators}
        brands={heroContent.brands}
        videoUrl={heroContent.videoUrl}
        heroVideos={heroVideos}
      />
      <VideoReelSection
        title="Experience with FabSeating"
        subtitle="Live peeks into our workshops, showrooms, and installs"
        items={reelVideos}
      />
      <BrandStrip brands={heroContent.brands} />
      <VideoCategoryChips title="Our Products" items={categoryVideos} />
      <CategoriesSection categories={data.categories} />
      <FeaturedProducts products={data.featuredProducts} />
      <FeaturedProjects projects={data.featuredProjects} />
      <WhyChooseUs data={data.whyChooseUs} />
      <TestimonialsPreview testimonials={data.testimonials} />
      <CTA data={data.cta} />
    </>
  )
}

