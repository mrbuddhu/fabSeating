export default {
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroImage',
      title: 'Hero background image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main hero section background. Used as fallback if no video.',
    },
    {
      name: 'aboutReels',
      title: 'About section – video reels (4 items)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'videoUrl', title: 'Video URL', type: 'url', description: 'e.g. /videos/video1.mp4 or full URL' },
            { name: 'posterImage', title: 'Poster / thumbnail image', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'videoUrl' },
            prepare({ title }: { title?: string }) {
              return { title: title ? `Reel: ${title.slice(0, 40)}…` : 'Reel' }
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(4),
    },
    {
      name: 'solutionsCards',
      title: 'Our Solutions – 3 cards (Residential, Office, Hospitality)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'link', title: 'Link', type: 'string', description: 'e.g. /solutions/residential' },
            { name: 'posterImage', title: 'Poster / thumbnail image', type: 'image', options: { hotspot: true } },
            { name: 'videoUrl', title: 'Video URL (optional)', type: 'url' },
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Solution card' }
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(6),
    },
    {
      name: 'processSteps',
      title: 'Process steps (typewriter strip)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Consultation, Design & Selection, Manufacturing…',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
}
