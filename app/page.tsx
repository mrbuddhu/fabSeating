import { HomeHero } from '@/components/HomeHero'
import { CategoriesSection } from '@/components/CategoriesSection'
import { TestimonialsPreview } from '@/components/TestimonialsPreview'
import { AnimatedCard } from '@/components/AnimatedCard'
import { AnimatedSection } from '@/components/AnimatedSection'
import { ProcessTypewriter } from '@/components/ProcessTypewriter'
import { TeamSection } from '@/components/TeamSection'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { getHomePageData } from '@/lib/sanity/queries'
import { CaseStudyCard } from '@/components/CaseStudyCard'
import { SkeletonCard } from '@/components/SkeletonCard'

// Dummy data for preview when no Sanity data is available
const dummyCaseStudies = [
  {
    _id: 'dummy-1',
    _type: 'caseStudy',
    title: 'Tech Hub Workspace',
    slug: { current: 'tech-hub-workspace' },
    summary: 'A futuristic office space designed for collaboration and innovation.',
    industry: 'Office',
    thumbnail: 'https://images.unsplash.com/photo-1497366214047-2a8ba81e032e?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'dummy-2',
    _type: 'caseStudy',
    title: 'Luxury Villa Interiors',
    slug: { current: 'luxury-villa-interiors' },
    summary: 'Bespoke furniture collection for a premium residential project.',
    industry: 'Residential',
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'dummy-3',
    _type: 'caseStudy',
    title: 'Boutique Hotel Lobby',
    slug: { current: 'boutique-hotel-lobby' },
    summary: 'Welcoming and elegant seating solutions for hospitality.',
    industry: 'Hospitality',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  }
]

const dummyCategories = [
  { _id: 'cat-1', title: 'Sofas', slug: { current: 'sofas' }, image: { asset: { _ref: 'image-1', _type: 'reference' }, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' } },
  { _id: 'cat-2', title: 'Chairs', slug: { current: 'chairs' }, image: { asset: { _ref: 'image-2', _type: 'reference' }, imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445857?auto=format&fit=crop&w=800&q=80' } },
  { _id: 'cat-3', title: 'Tables', slug: { current: 'tables' }, image: { asset: { _ref: 'image-3', _type: 'reference' }, imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80' } },
  { _id: 'cat-4', title: 'Beds', slug: { current: 'beds' }, image: { asset: { _ref: 'image-4', _type: 'reference' }, imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80' } },
  { _id: 'cat-5', title: 'Storage', slug: { current: 'storage' }, image: { asset: { _ref: 'image-5', _type: 'reference' }, imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80' } },
  { _id: 'cat-6', title: 'Outdoor', slug: { current: 'outdoor' }, image: { asset: { _ref: 'image-6', _type: 'reference' }, imageUrl: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=800&q=80' } },
  { _id: 'cat-7', title: 'Office', slug: { current: 'office' }, image: { asset: { _ref: 'image-7', _type: 'reference' }, imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80' } },
  { _id: 'cat-8', title: 'Lighting', slug: { current: 'lighting' }, image: { asset: { _ref: 'image-8', _type: 'reference' }, imageUrl: 'https://images.unsplash.com/photo-1513506003013-d5347e0f95d1?auto=format&fit=crop&w=800&q=80' } },
]

export const revalidate = 21600

export default async function Home() {
  const data = await getHomePageData()
  
  const heroHeadline = 'Premium Furniture & Furnishings\nfor Homes, Offices & Hospitality'
  const heroSubheadline = 'Since 2001, Fab Seating has been creating complete furniture and furnishing solutions designed for real spaces and long term use.'
  const primaryCta = 'Contact Us'
  const trustLine = 'Crafted & curated from our Chennai facility | Serving residential & commercial spaces across South India'
  
  const solutionsVideos = [
    {
      id: 1,
      title: 'Residential Collection',
      description: 'Elegant and functional furniture for modern homes',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-living-room-1574/1080p.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      link: '/solutions/residential'
    },
    {
      id: 2,
      title: 'Office Spaces',
      description: 'Productive and inspiring work environments',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-boutique-office-6267/1080p.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1497366214047-2a8ba81e032e?auto=format&fit=crop&w=800&q=80',
      link: '/solutions/office'
    },
    {
      id: 3,
      title: 'Hospitality',
      description: 'Durable and stylish solutions for hospitality',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-cafe-5535/1080p.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      link: '/solutions/hospitality'
    }
  ]

  const customVideos = [
    {
      id: 1,
      title: 'Bespoke Furniture',
      description: 'Tailored to your exact specifications',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-carpenter-working-on-furniture-4549/1080p.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      link: '/contact'
    },
    {
      id: 2,
      title: 'Custom Upholstery',
      description: 'Choose from premium fabrics and designs',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-tailor-sewing-clothes-8575/1080p.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      link: '/contact'
    }
  ]

  // Use Sanity data if available
  const projectsToDisplay = data.featuredProjects || []

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {/* 1. Hero Section */}
      <HomeHero 
        headline={heroHeadline}
        subheadline={heroSubheadline}
        trustIndicators={['Crafted & curated from our Chennai facility', 'Serving residential & commercial spaces across South India']}
        brands={['Premium Quality', '20+ Years Experience', 'Custom Solutions']}
        data={{
          ctaText: primaryCta,
          ctaLink: '/contact'
        }}
      />

      {/* 2. Quote Section - Social Proof */}
      <section className="relative py-8 md:py-10 grainy-gradient text-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        {/* Decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-3 inline-block">
              <svg className="w-6 h-6 text-primary-400/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>
            <blockquote className="text-lg md:text-2xl lg:text-3xl font-serif font-light mb-3 italic leading-[1.2] tracking-[-0.02em] text-white/95">
              We are the most experienced makers of exceptional upholstered furniture. Using materials of the highest quality, we ensure every handmade piece is comfortable, beautifully finished, and built to last.
            </blockquote>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary-400/40"></div>
              <p className="text-sm md:text-base text-primary-200/90 font-serif font-light tracking-wider uppercase">
                Fabseating Furniture & Furnishings
              </p>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary-400/40"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* 3. About Us Section */}
      <AnimatedSection>
        <section className="relative py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-screen-2xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8">
              <div className="inline-block mb-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-700">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 text-primary-950 tracking-tight">
                About Fab Seating
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent mx-auto mb-3"></div>
              <p className="text-base md:text-lg text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed">
                Founded in 2001, Fab Seating is a Chennai based furniture and furnishings solutions brand focused on building spaces that last. We bring together furniture, furnishings, planning and execution under one roof.
              </p>
            </div>
            
            {/* Video Reels Grid - Portrait Mode - Full Width */}
            <div className="w-full mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[6px] md:gap-2">
                {[
                  {
                    id: 1,
                    videoUrl: '/videos/video1.mp4',
                    thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812d0c?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    id: 2,
                    videoUrl: '/videos/video2.mp4',
                    thumbnail: 'https://images.unsplash.com/photo-1524758631624-e2822e304a36?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    id: 3,
                    videoUrl: '/videos/video3.mp4',
                    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    id: 4,
                    videoUrl: '/videos/video4.mp4',
                    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
                  },
                ].map((reel, index) => (
                  <AnimatedCard key={reel.id} index={index}>
                    <div className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        poster={reel.thumbnail}
                      >
                        <source src={reel.videoUrl} type="video/mp4" />
                      </video>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Categories Section Moved to Solutions */}

      {/* 5. Solutions Section - Carousel Only (Commercial, Residential, Hospitality) */}
      <AnimatedSection delay={0.2}>
        <section id="solutions" className="relative py-16 md:py-20 bg-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-block mb-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-700">What We Offer</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 text-primary-950 tracking-tight">
                Our Solutions
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent mx-auto mb-3"></div>
              <p className="text-lg md:text-xl text-gray-800 font-medium max-w-3xl mx-auto leading-relaxed">
                Fab Seating delivers integrated furniture and furnishings solutions designed around how a space is used not just how it looks.
              </p>
            </div>
          </AnimatedSection>

          {/* Categories Grid */}
          <div className="mb-16">
            <CategoriesSection categories={data.categories && data.categories.length > 0 ? data.categories.slice(0, 8) : dummyCategories} />
          </div>
          
          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {solutionsVideos.map((item, index) => (
              <AnimatedCard key={item.id} index={index}>
                <div 
                  className="group relative rounded-2xl overflow-hidden border-2 border-primary-200/50 bg-white shadow-lg hover:shadow-2xl hover:border-primary-400 transition-all duration-500"
                >
                <div className="relative h-[450px] overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    poster={item.thumbnail}
                  >
                    <source src={item.videoUrl} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-950/80"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">

                  <h3 className="text-2xl font-serif font-semibold text-white mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-gray-100 text-sm mb-4 leading-relaxed">{item.description}</p>
                  <div className="inline-block hover:scale-110 transition-transform duration-300">
                    <a 
                      href={item.link}
                      className="inline-flex items-center gap-2 bg-white text-primary-950 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-50 hover:animate-shake transition-colors duration-300 shadow-lg"
                    >
                      <span className="tracking-wide">Explore</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Teal Strip Divider with Process Typewriter */}
      <section className="relative py-8 md:py-10 grainy-gradient text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-primary-300 rounded-full blur-3xl"></div>
        </div>
        
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-4"></div>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-300/60 mb-6">Our Process</h3>
            </div>
            <ProcessTypewriter 
              steps={[
                'Consultation',
                'Design & Selection',
                'Manufacturing & Sourcing',
                'Quality Checks',
                'Delivery & Installation',
                'After Sales Support'
              ]}
              delay={1500}
            />
          </div>
        </div>
        
        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* 6. Projects Showcase - Carousel/Bento Grid */}
      <AnimatedSection delay={0.3}>
        <section id="projects" className="relative py-16 md:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-700">Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 text-primary-950 tracking-tight">
              Our Work
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent mx-auto mb-3"></div>
            <p className="text-lg md:text-xl text-gray-800 font-medium max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of completed projects across residential, office, and hospitality spaces.
            </p>
          </div>
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {projectsToDisplay.length > 0 ? (
              projectsToDisplay.map((item: any, index: number) => (
                <AnimatedCard key={item._id} index={index}>
                  <CaseStudyCard 
                    project={item} 
                    index={index} 
                  />
                </AnimatedCard>
              ))
            ) : (
              dummyCaseStudies.map((project, index) => (
                <AnimatedCard key={project._id} index={index}>
                  <CaseStudyCard project={project as any} index={index} />
                </AnimatedCard>
              ))
            )}
          </div>
          
          {/* CTA Button */}
          <div className="text-center">
            <a 
              href="/case-studies" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-950 text-white font-medium rounded-full hover:bg-primary-900 transition-all duration-300 hover:gap-5 shadow-lg hover:-translate-y-1 hover:shadow-2xl group"
            >
              <span className="text-sm tracking-wider uppercase">View All Case Studies</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* 7. Leadership Section - Legacy Entry */}
      <section className="relative py-8 md:py-10 grainy-gradient text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-primary-300 rounded-full blur-3xl"></div>
        </div>
        
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-300/60">Our Heritage</span>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-light mb-3 text-white tracking-tight">
              Our Legacy
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-4"></div>
            <p className="text-sm md:text-base leading-relaxed mb-6 text-white/90 font-light max-w-4xl mx-auto">
              Established in 2001, Fabseating has been at the forefront of furniture manufacturing and furnishings curation. With over two decades of hands-on experience, we&apos;ve built a reputation for excellence, quality, and customer satisfaction across South India.
            </p>
            
            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                { number: '20+', label: 'Years of Experience' },
                { number: '1000+', label: 'Projects Completed' },
                { number: '500+', label: 'Happy Clients' }
              ].map((stat, index) => (
                <AnimatedCard key={index} index={index}>
                  <div className="group">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-1 tracking-tight group-hover:scale-110 transition-transform duration-500">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-primary-200/80 font-light tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* 8. Custom/Bespoke Solution - Short Custom Quote CTA Section */}
      <AnimatedSection delay={0.4}>
        <section id="custom" className="relative py-16 md:py-20 bg-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-700">Bespoke Craftsmanship</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 text-primary-950 tracking-tight">
              Custom & Bespoke Solutions
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent mx-auto mb-3"></div>
            <p className="text-lg md:text-xl text-gray-800 font-medium max-w-3xl mx-auto leading-relaxed">
              Tailored furniture solutions designed specifically for your space and style.
            </p>
          </div>
          
          {/* Custom Solutions Text Content */}
          <div className="max-w-6xl mx-auto mb-16 px-2 md:px-4">
            <div className="text-center max-w-5xl mx-auto space-y-6">
              <AnimatedSection delay={0.1} once={false}>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  At Fabseating, furniture doesn&apos;t start with a template. It starts with your space.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.2} once={false}>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Dimensions, comfort, upholstery, wood, finishes — every detail is designed, refined, and crafted specifically for you.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3} once={false}>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  From one-of-a-kind sofas to fully bespoke dining, bedroom, and statement pieces, we build furniture that fits perfectly, looks intentional, and lasts for years.
                </p>
              </AnimatedSection>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="text-center">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-950 text-white font-medium rounded-full hover:bg-primary-900 transition-all duration-300 hover:gap-5 shadow-lg hover:-translate-y-1 hover:shadow-2xl group"
            >
              <span className="text-sm tracking-wider uppercase">Get a Custom Quote</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection>
        <TeamSection />
      </AnimatedSection>

      {/* 9. Testimonials/Social Proof */}
      {(data.testimonials && data.testimonials.length > 0) || process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ? (
        <AnimatedSection delay={0.5}>
          <section className="relative py-16 md:py-20 bg-gradient-to-b from-white via-primary-50/30 to-white">
            <TestimonialsPreview 
              testimonials={data.testimonials} 
              showGoogleReviews={!!process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID}
            />
          </section>
        </AnimatedSection>
      ) : null}

      {/* 10. Call to Action */}
      <section className="relative py-12 md:py-16 bg-white text-primary-950 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-600">Let&apos;s Begin</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 text-primary-950 tracking-tight">
              Planning a new space or upgrading an existing one?
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent mx-auto mb-4"></div>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-600 font-medium leading-relaxed">
              Let&apos;s design it thoughtfully with Fabseating&apos;s expertise in furniture and furnishings.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-950 text-white font-medium rounded-full hover:bg-primary-900 transition-all duration-300 hover:gap-3 shadow-xl hover:-translate-y-1 hover:shadow-2xl group text-base"
            >
              <span className="tracking-wider uppercase">Talk to Us</span>
              <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
