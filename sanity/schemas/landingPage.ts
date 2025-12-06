export default {
  name: 'landingPage',
  title: 'Landing Page',
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
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'hero',
          title: 'Hero Section',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'subtitle', type: 'string', title: 'Subtitle' },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'ctaText', type: 'string', title: 'CTA Text' },
            { name: 'ctaLink', type: 'string', title: 'CTA Link' },
          ],
        },
        {
          type: 'object',
          name: 'features',
          title: 'Features Section',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            {
              name: 'items',
              type: 'array',
              title: 'Items',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string', title: 'Title' },
                    { name: 'description', type: 'text', title: 'Description' },
                    { name: 'icon', type: 'string', title: 'Icon' },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'object',
          name: 'textWithImage',
          title: 'Text with Image',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'content', type: 'text', title: 'Content' },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            {
              name: 'imagePosition',
              type: 'string',
              title: 'Image Position',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
              },
            },
          ],
        },
        {
          type: 'object',
          name: 'testimonials',
          title: 'Testimonials Section',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            {
              name: 'testimonials',
              type: 'array',
              title: 'Testimonials',
              of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
            },
          ],
        },
        {
          type: 'object',
          name: 'faq',
          title: 'FAQ Section',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            {
              name: 'faqs',
              type: 'array',
              title: 'FAQs',
              of: [{ type: 'reference', to: [{ type: 'faq' }] }],
            },
          ],
        },
        {
          type: 'object',
          name: 'cta',
          title: 'CTA Section',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'subtitle', type: 'string', title: 'Subtitle' },
            { name: 'buttonText', type: 'string', title: 'Button Text' },
            { name: 'buttonLink', type: 'string', title: 'Button Link' },
          ],
        },
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
        { name: 'noIndex', type: 'boolean', title: 'No Index', initialValue: false },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}

