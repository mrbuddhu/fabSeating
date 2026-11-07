const titles = [
  '25+ Years of Experience',
  'Quality Craftsmanship',
  'Customisation Available',
  'Furniture & Furnishings Under One Roof',
]

export default {
  name: 'footerBanner',
  title: 'Banner',
  type: 'document',
  description: 'The photo and titles above the footer. This banner is the same on every page.',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Image description', type: 'string' }],
      description: 'The wide photo above the titles. Leave empty to keep the current photo.',
    },
    {
      name: 'items',
      title: 'Titles',
      type: 'array',
      description: 'Up to four titles under the photo. Leave empty to keep the current titles.',
      of: [
        {
          type: 'object',
          fields: [{ name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() }],
          preview: { select: { title: 'title' } },
        },
      ],
      validation: (Rule: any) => Rule.max(4),
    },
  ],
  initialValue: {
    items: titles.map((title, index) => ({ _key: `banner-${index}`, _type: 'object', title })),
  },
  preview: {
    prepare() {
      return { title: 'Banner' }
    },
  },
}
