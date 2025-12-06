export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'homeHero',
      title: 'Home Hero',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'subtitle', type: 'string', title: 'Subtitle' },
        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
        { name: 'ctaText', type: 'string', title: 'CTA Text' },
        { name: 'ctaLink', type: 'string', title: 'CTA Link' },
      ],
    },
    {
      name: 'whyChooseUs',
      title: 'Why Choose Us',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'subtitle', type: 'string', title: 'Subtitle' },
        {
          name: 'features',
          type: 'array',
          title: 'Features',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'homeCta',
      title: 'Home CTA',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'subtitle', type: 'string', title: 'Subtitle' },
        { name: 'buttonText', type: 'string', title: 'Button Text' },
        { name: 'buttonLink', type: 'string', title: 'Button Link' },
      ],
    },
  ],
}

