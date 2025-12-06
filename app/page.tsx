import { HomeHero } from '@/components/HomeHero'
import { CategoriesSection } from '@/components/CategoriesSection'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { FeaturedProjects } from '@/components/FeaturedProjects'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { TestimonialsPreview } from '@/components/TestimonialsPreview'
import { CTA } from '@/components/CTA'
import { getHomePageData } from '@/lib/sanity/queries'

export const revalidate = 3600

export default async function Home() {
  const data = await getHomePageData()

  return (
    <>
      <HomeHero data={data.hero} />
      <CategoriesSection categories={data.categories} />
      <FeaturedProducts products={data.featuredProducts} />
      <FeaturedProjects projects={data.featuredProjects} />
      <WhyChooseUs data={data.whyChooseUs} />
      <TestimonialsPreview testimonials={data.testimonials} />
      <CTA data={data.cta} />
    </>
  )
}

