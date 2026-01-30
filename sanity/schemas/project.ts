export default {
  name: 'project',
  title: 'Project',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Office', value: 'office' },
          { title: 'Hospitality', value: 'hospitality' },
        ],
      },
    },
    {
      name: 'furniture',
      title: 'Furniture Involved',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of furniture items used in this project',
    },
    {
      name: 'furnishings',
      title: 'Furnishings Involved',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of furnishings used in this project',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'videoUrl',
      title: 'Video URL (Optional)',
      type: 'url',
      description: 'URL to a video file (mp4) for the homepage card background. If not provided, the first image will be used.',
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
      media: 'images.0',
    },
  },
}

