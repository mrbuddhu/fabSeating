export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'useJournalLayout',
      title: 'Use Journal layout',
      description: 'Same layout as main site blog articles (hero, numbered sections, summary box, CTA). If off, only "Content" below is used.',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'heroTag',
      title: 'Hero tag',
      description: 'e.g. "Chennai Home Trends · 2026"',
      type: 'string',
      hidden: ({ parent }: any) => !parent?.useJournalLayout,
    },
    {
      name: 'byline',
      title: 'Byline',
      description: 'e.g. "By Fab Seating · 9 min read"',
      type: 'string',
      hidden: ({ parent }: any) => !parent?.useJournalLayout,
    },
    {
      name: 'featuredImage',
      title: 'Hero / Featured Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          const useJournalLayout = !!context?.document?.useJournalLayout
          if (useJournalLayout && !value) return 'Required when using Journal layout'
          return true
        }),
    },
    {
      name: 'intro',
      title: 'Intro paragraphs',
      description: 'Short intro block above the numbered sections',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }: any) => !parent?.useJournalLayout,
    },
    {
      name: 'sections',
      title: 'Sections (numbered items)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'journalSection',
          fields: [
            { name: 'number', title: 'Number', type: 'string', description: 'e.g. 01, 02' },
            { name: 'title', title: 'Section title', type: 'string' },
            {
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            },
            {
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
            },
            { name: 'highlight', title: 'Highlight (optional callout)', type: 'text' },
          ],
          preview: {
            select: { number: 'number', title: 'title' },
            prepare: ({ number, title }: any) => ({ title: `${number || '?'} · ${title || 'Untitled'}` }),
          },
        },
      ],
      hidden: ({ parent }: any) => !parent?.useJournalLayout,
    },
    {
      name: 'summaryTitle',
      title: 'Summary box title',
      type: 'string',
      hidden: ({ parent }: any) => !parent?.useJournalLayout,
    },
    {
      name: 'summaryBody',
      title: 'Summary box body',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }: any) => !parent?.useJournalLayout,
    },
    {
      name: 'summaryBullets',
      title: 'Summary bullet points',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }: any) => !parent?.useJournalLayout,
    },
    {
      name: 'ctaHeading',
      title: 'CTA heading',
      type: 'string',
      hidden: ({ parent }: any) => !parent?.useJournalLayout,
    },
    {
      name: 'ctaDescription',
      title: 'CTA description',
      type: 'text',
      hidden: ({ parent }: any) => !parent?.useJournalLayout,
    },
    {
      name: 'excerpt',
      title: 'Excerpt (for cards & SEO)',
      type: 'text',
    },
    {
      name: 'content',
      title: 'Content (used when Journal layout is off)',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
      hidden: ({ parent }: any) => parent?.useJournalLayout,
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'readTime',
      title: 'Read time',
      description: 'e.g. "9 min read"',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      description: 'e.g. "Residential · Trends"',
      type: 'string',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'SEO Title' },
        { name: 'description', type: 'text', title: 'SEO Description' },
        { name: 'image', type: 'image', title: 'SEO Image' },
        { name: 'noIndex', type: 'boolean', title: 'No Index', initialValue: false },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, media, publishedAt }: any) {
      return {
        title,
        media,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : '',
      }
    },
  },
}

