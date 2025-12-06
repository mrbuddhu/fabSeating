import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { EnquiryForm } from '@/components/EnquiryForm'
import { getProjectBySlug, getProjects } from '@/lib/sanity/queries'
import { generateSEOMetadata } from '@/components/SEOHead'

export const revalidate = 3600

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug.current,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return {}

  return generateSEOMetadata({
    seo: project.seo,
    title: project.title,
    description: project.description,
    image: project.images?.[0],
    path: `/projects/${params.slug}`,
  })
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
      />
      <PageHero title={project.title} subtitle={project.description} />
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            {project.images && project.images.length > 0 && (
              <div className="space-y-4">
                {project.images.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] bg-primary-100">
                    <ResponsiveImage
                      image={image}
                      alt={`${project.title} ${index + 1}`}
                      fill
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {(project.location || project.year) && (
              <div className="mb-6 space-y-2">
                {project.location && (
                  <p className="text-sm text-primary-600">
                    <span className="font-medium">Location:</span> {project.location}
                  </p>
                )}
                {project.year && (
                  <p className="text-sm text-primary-600">
                    <span className="font-medium">Year:</span> {project.year}
                  </p>
                )}
              </div>
            )}
            {project.description && (
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-primary-700 leading-relaxed">{project.description}</p>
              </div>
            )}
            <EnquiryForm projectId={project._id} originPage={`/projects/${params.slug}`} />
          </div>
        </div>
      </Section>
    </>
  )
}

