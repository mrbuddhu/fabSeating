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
import { ProcessStrip } from '@/components/ProcessStrip'
import { BrandPressStrip } from '@/components/BrandPressStrip'

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
    {
      src: 'https://cdn.coverr.co/videos/coverr-modern-boutique-office-6267/1080p.mp4',
      title: 'Consultation in progress',
      poster: 'https://images.unsplash.com/photo-1529429617124-aee65f5f7b4d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      src: 'https://cdn.coverr.co/videos/coverr-modern-cafe-5535/1080p.mp4',
      title: 'Cafe seating mock',
      poster: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    },
    {
      src: 'https://cdn.coverr.co/videos/coverr-modern-apartment-6575/1080p.mp4',
      title: 'Residence walkthrough',
      poster: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    },
    {
      src: 'https://cdn.coverr.co/videos/coverr-cozy-coffee-house-1264/1080p.mp4',
      title: 'Hospitality vibes',
      poster: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=1200&q=80',
    },
  ]
  const heroVideos = [
    {
      src: 'https://cdn.coverr.co/videos/coverr-modern-living-room-1574/1080p.mp4',
      title: 'Luxury living setup',
      poster: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    },
    {
      src: 'https://cdn.coverr.co/videos/coverr-modern-boutique-office-6267/1080p.mp4',
      title: 'Office lounge',
      poster: 'https://images.unsplash.com/photo-1529429617124-aee65f5f7b4d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      src: 'https://cdn.coverr.co/videos/coverr-modern-cafe-5535/1080p.mp4',
      title: 'Cafe seating',
      poster: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    },
    {
      src: 'https://cdn.coverr.co/videos/coverr-modern-apartment-6575/1080p.mp4',
      title: 'Residence walkthrough',
      poster: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    },
    {
      src: 'https://cdn.coverr.co/videos/coverr-office-meeting-1327/1080p.mp4',
      title: 'Client review',
      poster: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    },
  ]
  const categoryVideos = [
    {
      label: 'Sofa Sets',
      src: 'https://cdn.coverr.co/videos/coverr-modern-living-room-1574/1080p.mp4',
      poster: 'https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Dining Tables',
      src: 'https://cdn.coverr.co/videos/coverr-modern-dining-room-5978/1080p.mp4',
      poster: 'https://images.unsplash.com/photo-1616628182501-d995c3cc6aab?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Arm Chairs',
      src: 'https://cdn.coverr.co/videos/coverr-cozy-chair-8454/1080p.mp4',
      poster: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Centre Tables',
      src: 'https://cdn.coverr.co/videos/coverr-modern-lounge-5659/1080p.mp4',
      poster: 'https://images.unsplash.com/photo-1523419400524-2230b924dc00?auto=format&fit=crop&w=800&q=80',
    },
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
      <ProcessStrip />
      <BrandPressStrip />
      <CategoriesSection categories={data.categories} />
      <FeaturedProducts products={data.featuredProducts} />
      <FeaturedProjects projects={data.featuredProjects} />
      <WhyChooseUs data={data.whyChooseUs} />
      <TestimonialsPreview testimonials={data.testimonials} />
      <CTA data={data.cta} />
    </>
  )
}

