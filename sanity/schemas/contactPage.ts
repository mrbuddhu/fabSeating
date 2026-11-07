export default {
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  description: 'The words on the Contact page. Phone, address, and WhatsApp are under Logo, phone and address.',
  fields: [
    {
      name: 'stripImages',
      title: 'Craft strip images (3 images)',
      hidden: true,
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        },
      ],
      validation: (Rule: any) => Rule.max(3),
      description: 'Kept for later use. The contact page currently shows the text below this field.',
    },
    { name: 'title', title: 'Page heading', type: 'string' },
    { name: 'afterTitle', title: 'Section heading', type: 'string' },
    { name: 'afterBody', title: 'Section text', type: 'text', rows: 4 },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', title: 'SEO title', type: 'string' },
        { name: 'description', title: 'SEO description', type: 'text', rows: 3 },
        { name: 'image', title: 'Share image', type: 'image', options: { hotspot: true } },
        { name: 'noIndex', title: 'Hide from search engines', type: 'boolean', initialValue: false },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' }
    },
  },
}
