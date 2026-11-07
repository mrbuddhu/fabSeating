const filterOptions = [
  { title: 'Sofas', value: 'sofas' },
  { title: 'Dining Furniture', value: 'dining-furniture' },
  { title: 'Chairs & Recliners', value: 'chairs-recliners' },
  { title: 'Beds & Mattresses', value: 'beds-mattresses' },
  { title: 'Office Furniture', value: 'office-furniture' },
  { title: 'Carpets & Rugs', value: 'carpets-rugs' },
  { title: 'Wardrobes', value: 'wardrobes' },
  { title: 'Curtains & Blinds', value: 'curtains-blinds' },
]

export default {
  name: 'galleryPage',
  title: 'Gallery',
  type: 'document',
  description: 'The Gallery page in the menu. Words at the top, then the photos.',
  groups: [
    { name: 'page', title: '1. Words at the top', default: true },
    { name: 'photos', title: '2. Photos' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'page',
      description: 'The title at the top of the Gallery page. Leave empty to keep “Gallery”.',
    },
    {
      name: 'subtitle',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'page',
      description: 'The line under the title. Leave empty to keep the current line.',
    },
    {
      name: 'includeProducts',
      title: 'Also show product photos',
      type: 'boolean',
      group: 'photos',
      initialValue: true,
      description: 'On: product photos stay in the gallery. Off: the page shows only the photos you add below.',
    },
    {
      name: 'photos',
      title: 'Gallery photos',
      type: 'array',
      group: 'photos',
      description: 'Add a photo, write the name and text that appear when someone clicks it, then choose which filters it belongs to. Drag to reorder. Publish to update the Gallery page.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Shown as the title when the photo is opened.',
            },
            {
              name: 'text',
              title: 'Description',
              type: 'text',
              rows: 4,
              description: 'Shown under the title when the photo is opened. Leave empty when there is no description.',
            },
            {
              name: 'filters',
              title: 'Category',
              type: 'array',
              of: [{ type: 'string' }],
              options: { list: filterOptions },
              description: 'The photo always appears under All. Choose the category buttons it should also appear under.',
            },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
            prepare({ title, media }: { title?: string; media?: any }) {
              return { title: title || 'Gallery photo', media }
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Gallery' }
    },
  },
}
