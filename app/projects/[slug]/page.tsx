import { redirect } from 'next/navigation'

interface ProjectPageProps {
  params: { slug: string }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  redirect(`/case-studies/${params.slug}`)
}
