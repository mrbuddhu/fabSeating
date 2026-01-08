export default {
  name: 'solutionPage',
  title: 'Solution Page',
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'string',
    },
    {
      name: 'introText',
      title: 'Intro Paragraph',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
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
      name: 'furnitureItems',
      title: 'Furniture Includes',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'furnishingsItems',
      title: 'Furnishings Includes',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'bestSuitedFor',
      title: 'Best Suited For',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
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

