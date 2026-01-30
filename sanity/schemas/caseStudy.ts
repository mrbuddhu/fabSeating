export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
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
      name: 'summary',
      title: 'Summary / Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for cards and previews',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Completion Year',
      type: 'string',
    },
    {
      name: 'industry',
      title: 'Industry / Sector',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Office / Corporate', value: 'office' },
          { title: 'Hospitality', value: 'hospitality' },
          { title: 'Education', value: 'education' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Retail', value: 'retail' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    {
      name: 'story',
      title: 'Story Sections (Alternating Layout)',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Section',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'heading', media: 'image' },
            prepare({ title, media }: any) {
              return {
                title: title || 'Untitled Section',
                media,
              }
            },
          },
        },
      ],
    },
    {
      name: 'showcase',
      title: 'Showcase Media (Bottom Grid)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Media Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
              },
              initialValue: 'image',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }: any) => parent?.type === 'video',
            },
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({ parent }: any) => parent?.type === 'image',
            },
          ],
          preview: {
            select: { type: 'type', media: 'image' },
            prepare({ type, media }: any) {
              return {
                title: type === 'video' ? 'Video' : 'Image',
                media: type === 'video' ? undefined : media,
                subtitle: type === 'video' ? 'Video Player' : 'Static Image',
              }
            },
          },
        },
      ],
    },
    {
      name: 'challenge',
      title: 'The Challenge',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'What was the problem or requirement?',
    },
    {
      name: 'solution',
      title: 'The Solution',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      description: 'How did we solve it?',
    },
    {
      name: 'result',
      title: 'The Result',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'What was the outcome?',
    },
    {
      name: 'stats',
      title: 'Project Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
      description: 'Key metrics like "Square Footage", "Timeline", "Seats Installed"',
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'videoUrl',
      title: 'Video URL (Optional)',
      type: 'url',
      description: 'Link to a video walkthrough (MP4/YouTube/Vimeo)',
    },
    {
      name: 'productsUsed',
      title: 'Products Used',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
    },
    {
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        { name: 'quote', title: 'Quote', type: 'text' },
        { name: 'author', title: 'Author', type: 'string' },
        { name: 'role', title: 'Role/Position', type: 'string' },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'SEO Title' },
        { name: 'description', type: 'text', title: 'SEO Description' },
        { name: 'image', type: 'image', title: 'SEO Image' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'heroImage',
    },
  },
}
