import { HomeHeroCoral } from '@/components/HomeHeroCoral'
import { CategoriesSection } from '@/components/CategoriesSection'
import { TestimonialsPreview } from '@/components/TestimonialsPreview'
import { AnimatedCard } from '@/components/AnimatedCard'
import { AnimatedSection } from '@/components/AnimatedSection'
import { getHomePageData } from '@/lib/sanity/queries'

export const revalidate = 21600

export default async function Homepage2() {
  const data = await getHomePageData()
  
  const heroHeadline = 'Premium Furniture and Furnishings for Homes, Offices and Hospitality'
  const heroSubheadline = 'Since 2001, Fab Seating has been creating complete furniture and furnishing solutions designed for real spaces and long term use.'
  const primaryCta = 'Talk to Us'
  const trustLine = 'Crafted & curated from our Chennai facility | Serving residential & commercial spaces across South India'
  
  const solutionsVideos = [
    {
      id: 1,
      title: 'Residential Collection',
      description: 'Elegant and functional furniture for modern homes',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-living-room-1574/1080p.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812d0c?auto=format&fit=crop&w=800&q=80',
      link: '/solutions/residential'
    },
    {
      id: 2,
      title: 'Office Spaces',
      description: 'Productive and inspiring work environments',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-boutique-office-6267/1080p.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1524758631624-e2822e304a36?auto=format&fit=crop&w=800&q=80',
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
      thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      link: '/contact'
    }
  ]

  const projectVideos = [
    {
      id: 1,
      title: 'Luxury Villa Project',
      description: 'Complete home furnishing solution',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-apartment-6575/1080p.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      link: '/projects?category=residential'
    },
    {
      id: 2,
      title: 'Corporate Office',
      description: 'Modern workspace transformation',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-office-space-5699/1080p.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009c2f1deba7?auto=format&fit=crop&w=800&q=80',
      link: '/projects?category=office'
    },
    {
      id: 3,
      title: 'Boutique Hotel',
      description: 'Luxury hospitality furnishings',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-hotel-lobby-6162/1080p.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      link: '/projects?category=hospitality'
    }
  ]

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {/* 1. Hero Section */}
      <HomeHeroCoral 
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
      <section className="relative py-8 md:py-10 bg-[#da5863] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-3 inline-block">
              <svg className="w-6 h-6 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>
            <blockquote className="text-lg md:text-2xl lg:text-3xl font-serif font-light mb-3 italic leading-[1.2] tracking-[-0.02em] text-white/95">
              Furniture should not just look good on day one. It should work well for years.
            </blockquote>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/40"></div>
              <p className="text-sm md:text-base text-white/90 font-serif font-light tracking-wider uppercase">
                Fabseating Furniture & Furnishings
              </p>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/40"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* 3. About Us Section */}
      <AnimatedSection>
        <section className="relative py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block mb-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#a83d46]">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 text-gray-900 tracking-tight">
                About Fab Seating
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#da5863] to-transparent mx-auto mb-3"></div>
              <p className="text-base md:text-lg text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed">
                Founded in 2001, Fab Seating is a Chennai based furniture and furnishings solutions brand focused on building spaces that last. We bring together furniture, furnishings, planning and execution under one roof.
              </p>
            </div>
            
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6 mb-12">
              {[
                { name: 'Sofas', icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3v5c0 1.1.9 2 2 2h1c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2h1c1.1 0 2-.9 2-2v-5c0-1.66-1.34-3-3-3zM4 12h16v5h-1v-1c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v1H4v-5z"/>
                  </svg>
                )},
                { name: 'Chairs', icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 2v2h1v14c0 2.21 1.79 4 4 4s4-1.79 4-4V4h1V2H7zm4 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-4H7V4h6v8z"/>
                  </svg>
                )},
                { name: 'Tables', icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-4h16v4zm0-6H4V6h16v6z"/>
                  </svg>
                )},
                { name: 'Beds', icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H6C4.35 2 3 3.35 3 5v5.78c-.61.55-1 1.34-1 2.22v6h2v-2h16v2h2v-6c0-.88-.39-1.67-1-2.22zM14 4h4c.55 0 1 .45 1 1v5.78c-.16-.12-.33-.22-.5-.3L19 10.6V9c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v1.6l-.5.38c-.17.08-.34.18-.5.3V5c0-.55.45-1 1-1zM5 5c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v5.78c-.16-.12-.33-.22-.5-.3L10 10.6V9c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v1.6l-.5.38c-.17.08-.34.18-.5.3V5z"/>
                  </svg>
                )},
                { name: 'Rugs', icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                    <rect x="2" y="4" width="20" height="16" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )},
                { name: 'Curtains', icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM4 4h7v16H4V4zm9 0h7v16h-7V4z"/>
                  </svg>
                )},
                { name: 'Mattresses', icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M4 8h16M4 12h16M4 16h16" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                )},
                { name: 'Cabinets', icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM9 7h6v2H9V7zm0 4h6v2H9v-2zm0 4h6v2H9v-2z"/>
                  </svg>
                )},
              ].map((category, index) => (
                <AnimatedCard key={index} index={index}>
                  <div className="group flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl hover:bg-[#fef2f2] transition-all duration-500 cursor-pointer">
                    <div className="text-[#da5863] mb-2 transform group-hover:scale-110 group-hover:text-[#c44d57] transition-all duration-300">
                      {category.icon}
                    </div>
                    <p className="text-xs md:text-sm text-[#a83d46] font-medium text-center group-hover:text-[#8b2e35] transition-colors">
                      {category.name}
                    </p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* 4. Categories Offered Section - 8 Categories */}
      {data.categories && data.categories.length > 0 && (
        <AnimatedSection delay={0.1}>
          <section className="relative py-16 md:py-20 bg-gradient-to-b from-white via-[#fef2f2]/30 to-white">
            <CategoriesSection categories={data.categories.slice(0, 8)} />
          </section>
        </AnimatedSection>
      )}

      {/* 5. Solutions Section - Carousel Only (Commercial, Residential, Hospitality) */}
      <AnimatedSection delay={0.2}>
        <section id="solutions" className="relative py-16 md:py-20 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#da5863] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#f87171] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-block mb-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#a83d46]">What We Offer</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 text-gray-900 tracking-tight">
                Our Solutions
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#da5863] to-transparent mx-auto mb-3"></div>
              <p className="text-lg md:text-xl text-gray-800 font-medium max-w-3xl mx-auto leading-relaxed">
                Fab Seating delivers integrated furniture and furnishings solutions designed around how a space is used not just how it looks.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {solutionsVideos.map((item, index) => (
              <AnimatedCard key={item.id} index={index}>
                <div 
                  className="group relative rounded-2xl overflow-hidden border-2 border-[#fecaca] bg-white shadow-lg hover:shadow-2xl hover:border-[#f87171] transition-all duration-500"
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
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#4a1418]/80"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="mb-2">
                    <span className="text-xs font-semibold tracking-wider text-white uppercase bg-[#4a1418]/60 px-3 py-1 rounded-full inline-block">Solution {index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-white mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-gray-100 text-sm mb-4 leading-relaxed">{item.description}</p>
                  <a 
                    href={item.link}
                    className="inline-flex items-center gap-2 bg-white text-[#4a1418] px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#fef2f2] transition-all duration-300 shadow-lg"
                  >
                    <span className="tracking-wide">Explore</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* 6. Projects Showcase - Carousel/Bento Grid */}
      <AnimatedSection delay={0.3}>
        <section id="projects" className="relative py-16 md:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#a83d46]">Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 text-gray-900 tracking-tight">
              Our Work
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#da5863] to-transparent mx-auto mb-3"></div>
            <p className="text-lg md:text-xl text-gray-800 font-medium max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of completed projects across residential, office, and hospitality spaces.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {projectVideos.map((item, index) => (
              <AnimatedCard key={item.id} index={index}>
                <div 
                  className="group relative overflow-hidden bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    poster={item.thumbnail}
                  >
                    <source src={item.videoUrl} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-xs font-bold tracking-widest text-white/90 uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-md border border-white/20">Project</span>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
                  <div className="mb-2">
                    <span className="text-xs font-semibold tracking-wider text-[#fca5a5] uppercase">Case Study {index + 1}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
                  <a 
                    href={item.link}
                    className="inline-flex items-center gap-2 text-[#fca5a5] hover:text-[#f87171] font-medium text-sm transition-colors duration-300 group/link"
                  >
                    <span className="tracking-wide">View Details</span>
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
              </AnimatedCard>
            ))}
          </div>
          
          <div className="text-center">
            <a 
              href="/projects" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#da5863] text-white font-medium rounded-full hover:bg-[#c44d57] transition-all duration-300 hover:gap-5 shadow-lg hover:-translate-y-1 hover:shadow-2xl group"
            >
              <span className="text-sm tracking-wider uppercase">View All Projects</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* 7. Leadership Section - Legacy Entry */}
      <section className="relative py-8 md:py-10 bg-[#da5863] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-[#fca5a5] rounded-full blur-3xl"></div>
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60">Our Heritage</span>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-light mb-3 text-white tracking-tight">
              Our Legacy
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-4"></div>
            <p className="text-sm md:text-base leading-relaxed mb-6 text-white/90 font-light max-w-4xl mx-auto">
              Established in 2001, Fabseating has been at the forefront of furniture manufacturing and furnishings curation. With over two decades of hands-on experience, we&apos;ve built a reputation for excellence, quality, and customer satisfaction across South India.
            </p>
            
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
                  <div className="text-xs md:text-sm text-white/80 font-light tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* 8. Custom/Bespoke Solution - Short Custom Quote CTA Section */}
      <AnimatedSection delay={0.4}>
        <section id="custom" className="relative py-16 md:py-20 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#da5863] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#a83d46]">Bespoke Craftsmanship</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 text-gray-900 tracking-tight">
              Custom & Bespoke Solutions
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#da5863] to-transparent mx-auto mb-3"></div>
            <p className="text-lg md:text-xl text-gray-800 font-medium max-w-3xl mx-auto leading-relaxed">
              Tailored furniture solutions designed specifically for your space and style.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            {customVideos.map((item, index) => (
              <AnimatedCard key={item.id} index={index}>
                <div className="group relative overflow-hidden bg-[#4a1418] rounded-2xl shadow-2xl hover:shadow-[0_40px_100px_rgba(218,88,99,0.25)] transition-all duration-700 border border-[#8b2e35]/50">
                <div className="relative h-[550px] overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#4a1418]/40 via-[#4a1418]/20 to-transparent group-hover:from-[#4a1418]/20 transition-all duration-700"></div>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4a1418] via-[#4a1418]/80 to-transparent"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                  <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="w-1 h-8 bg-[#f87171]"></div>
                      <span className="text-xs font-bold tracking-[0.2em] text-[#fca5a5] uppercase">Bespoke</span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-[#fee2e2] mb-6 leading-relaxed text-base">{item.description}</p>
                    <a 
                      href={item.link}
                      className="inline-flex items-center gap-3 bg-[#f87171] text-[#4a1418] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#fca5a5] hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <span className="tracking-wider">Get Started</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              </AnimatedCard>
            ))}
          </div>
          
          <div className="text-center">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#da5863] text-white font-medium rounded-full hover:bg-[#c44d57] transition-all duration-300 hover:gap-5 shadow-lg hover:-translate-y-1 hover:shadow-2xl group"
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

      {/* 9. Testimonials/Social Proof */}
      {(data.testimonials && data.testimonials.length > 0) || process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ? (
        <AnimatedSection delay={0.5}>
          <section className="relative py-16 md:py-20 bg-gradient-to-b from-white via-[#fef2f2]/30 to-white">
            <TestimonialsPreview 
              testimonials={data.testimonials} 
              showGoogleReviews={!!process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID}
            />
          </section>
        </AnimatedSection>
      ) : null}

      {/* 10. Call to Action */}
      <section className="relative py-8 md:py-10 bg-[#da5863] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#fca5a5] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60">Let&apos;s Begin</span>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-light mb-3 text-white tracking-tight">
              Planning a new space or upgrading an existing one?
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-3"></div>
            <p className="text-sm md:text-base mb-4 max-w-2xl mx-auto text-white/90 font-light leading-relaxed">
              Let&apos;s design it thoughtfully with Fabseating&apos;s expertise in furniture and furnishings.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#da5863] font-medium rounded-full hover:bg-[#fef2f2] transition-all duration-300 hover:gap-3 shadow-2xl hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group text-base"
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
