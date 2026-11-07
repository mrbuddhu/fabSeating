export default {
  name: 'articleMedia',
  title: 'Article Images',
  type: 'document',
  fields: [
    { name: 'title', title: 'Article name', type: 'string' },
    { name: 'slug', title: 'Existing article slug', type: 'string', validation: (Rule: any) => Rule.required() },
    {
      name: 'image',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
      description: 'Shown in full under the article title. It is not cropped on any screen.',
    },
    {
      name: 'thumbnail',
      title: 'Listing thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
      description: 'Shown on the journal list. If empty, the hero image is used.',
    },
  ],
  preview: { select: { title: 'title', media: 'image' } },
}
