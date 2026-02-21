export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'stripImages',
      title: 'Craft strip images (3 images)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        },
      ],
      validation: (Rule: any) => Rule.max(3),
      description: 'Three images shown in the strip below the contact title: e.g. carpentry, upholstery, finishing.',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' }
    },
  },
}
