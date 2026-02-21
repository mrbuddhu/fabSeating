export default {
  name: 'solutionPage',
  title: 'Solutions',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Solution Type',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Office', value: 'office' },
          { title: 'Hospitality', value: 'hospitality' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Optional. The website text is currently hardcoded; this is kept only for future flexibility.',
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'string',
      description: 'Optional. The website text is currently hardcoded; this is kept only for future flexibility.',
    },
    {
      name: 'introText',
      title: 'Intro Paragraph',
      type: 'text',
      description: 'Optional. The website text is currently hardcoded; this is kept only for future flexibility.',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'galleryImages',
      title: 'Hero Gallery Images (up to 3)',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'Optional: Add up to three images to show in the top gallery for this solution category.',
      validation: (Rule: any) => Rule.max(3),
    },
    {
      name: 'furnitureItems',
      title: 'Furniture Includes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional. The website list is currently hardcoded; this is kept only for future flexibility.',
    },
    {
      name: 'furnishingsItems',
      title: 'Furnishings Includes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional. The website list is currently hardcoded; this is kept only for future flexibility.',
    },
    {
      name: 'bestSuitedFor',
      title: 'Best Suited For',
      type: 'text',
      description: 'Optional. The website text is currently hardcoded; this is kept only for future flexibility.',
    },
    {
      name: 'secondaryImage',
      title: 'Secondary Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      type: 'type',
      media: 'heroImage',
    },
    prepare({ title, type }: { title: string; type: string }) {
      return {
        title: title || 'Untitled',
        subtitle: type ? type.charAt(0).toUpperCase() + type.slice(1) : '',
      }
    },
  },
}

