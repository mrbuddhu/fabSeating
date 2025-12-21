export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
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

