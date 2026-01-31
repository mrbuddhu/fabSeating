import { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { getProjects } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'
import Link from 'next/link'
import { AnimatedCard } from '@/components/AnimatedCard'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { SkeletonCard } from '@/components/SkeletonCard'
import Image from 'next/image'

// Dummy data for preview when no Sanity data is available
const dummyProjects = [
  {
    _id: 'dummy-1',
    _type: 'project',
    title: 'Modern Living Room',
    slug: { current: '#' },
    category: 'Residential',
    location: 'Chennai',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'dummy-2',
    _type: 'project',
    title: 'Corporate HQ',
    slug: { current: '#' },
    category: 'Office',
    location: 'Bangalore',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1497366214047-2a8ba81e032e?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'dummy-3',
    _type: 'project',
    title: 'Luxury Hotel Suite',
    slug: { current: '#' },
    category: 'Hospitality',
    location: 'Hyderabad',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  }
]

export const revalidate = 900

export const metadata: Metadata = generateSEOMetadata({
  title: 'Project Gallery',
  description: 'Visual showcase of our finest work',
  path: '/projects',
})

interface ProjectsPageProps {
  searchParams: { category?: string }
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const category = searchParams?.category
  const projects = await getProjects(category)

  const categories = [
    { label: 'All', value: '', href: '/projects' },
    { label: 'Residential', value: 'residential', href: '/projects?category=residential' },
    { label: 'Office', value: 'office', href: '/projects?category=office' },
    { label: 'Hospitality', value: 'hospitality', href: '/projects?category=hospitality' },
  ]

  return (
    <>
      <PageHero
        title="Project Gallery"
        subtitle="A visual collection of our design excellence"
      />
      <Section>
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={cat.href}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                (!category && cat.value === '') || category === cat.value
                  ? 'bg-primary-950 text-white shadow-lg'
                  : 'border-2 border-primary-300 text-primary-700 hover:border-primary-950 hover:bg-primary-50'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <AnimatedCard key={project._id} index={index}>
                <Link 
                  href={`/case-studies/${project.slug.current}`}
                  className="group relative block aspect-square overflow-hidden rounded-xl bg-gray-100"
                >
                  {project.images && project.images[0] ? (
                    <ResponsiveImage
                      image={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (project as any).thumbnail ? (
                    <Image
                      src={(project as any).thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-200">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />
                  
                  {/* Text Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="mb-2 text-xs font-bold uppercase tracking-widest text-white/80">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                    {(project.location || project.year) && (
                      <p className="mt-2 text-sm text-white/90">
                        {[project.location, project.year].filter(Boolean).join(' — ')}
                      </p>
                    )}
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDummyProjects.length > 0 ? (
              filteredDummyProjects.map((project, index) => (
                <AnimatedCard key={project._id} index={index}>
                  <Link 
                    href={`#`}
                    className="group relative block aspect-square overflow-hidden rounded-xl bg-gray-100"
                  >
                    <Image
                      src={(project as any).thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />
                    
                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="mb-2 text-xs font-bold uppercase tracking-widest text-white/80">
                        {project.category}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/90">
                        {[project.location, project.year].filter(Boolean).join(' — ')}
                      </p>
                    </div>
                  </Link>
                </AnimatedCard>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-primary-600">No projects found in this category.</p>
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  )
}
