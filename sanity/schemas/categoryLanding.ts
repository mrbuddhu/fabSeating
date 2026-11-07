const imageWithAlt = {
  type: 'image',
  options: { hotspot: true },
  fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
}

export default {
  name: 'categoryLanding',
  title: 'Category landing pages',
  type: 'document',
  description: 'The full landing page for a furniture category, for example /category/sofas. Images, text, and SEO are edited here.',
  fields: [
    {
      name: 'label',
      title: 'Page name',
      type: 'string',
      description: 'Studio label only, for example Sofas.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Category slug',
      type: 'slug',
      description: 'Must match the category URL. Sofas is sofas, which publishes at /category/sofas.',
      options: { source: 'label', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'image', title: 'Hero image', ...imageWithAlt },
        { name: 'exploreLabel', title: 'Explore button label', type: 'string' },
        { name: 'whatsappLabel', title: 'WhatsApp button label', type: 'string' },
      ],
    },
    {
      name: 'collection',
      title: 'Collection',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'moreLabel', title: 'Explore more label', type: 'string' },
        {
          name: 'items',
          title: 'Images',
          type: 'array',
          description: 'Wide photos in the collection row. Leave empty to use this category’s product photos.',
          of: [{ type: 'object', fields: [{ name: 'image', title: 'Image', ...imageWithAlt }] }],
        },
      ],
    },
    {
      name: 'lifestyle',
      title: 'Lifestyle strip',
      type: 'object',
      fields: [
        { name: 'title', title: 'Heading', type: 'string' },
        {
          name: 'points',
          title: 'Points',
          type: 'array',
          of: [{ type: 'object', fields: [{ name: 'title', title: 'Label', type: 'string' }] }],
        },
      ],
    },
    {
      name: 'guide',
      title: 'Choosing guide',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'image', title: 'Image', ...imageWithAlt },
        {
          name: 'tips',
          title: 'Tips',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'body', title: 'Text', type: 'text', rows: 3 },
            ],
          }],
        },
      ],
    },
    {
      name: 'spaces',
      title: 'Spaces',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        {
          name: 'items',
          title: 'Spaces',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Label', type: 'string' },
              { name: 'image', title: 'Image', ...imageWithAlt },
            ],
          }],
        },
      ],
    },
    {
      name: 'related',
      title: 'Explore more categories',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        {
          name: 'items',
          title: 'Categories',
          description: 'Leave empty to show the other furniture categories.',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Label', type: 'string' },
              { name: 'href', title: 'Link', type: 'string' },
              { name: 'image', title: 'Image', ...imageWithAlt },
            ],
          }],
        },
      ],
    },
    {
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      fields: [
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'intro', title: 'Intro', type: 'text', rows: 2 },
        {
          name: 'items',
          title: 'Questions',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'question', title: 'Question', type: 'string' },
              { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
            ],
          }],
        },
      ],
    },
    {
      name: 'showroom',
      title: 'Showroom',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'address', title: 'Address line', type: 'string' },
        { name: 'image', title: 'Image', ...imageWithAlt },
      ],
    },
    {
      name: 'closing',
      title: 'Closing bar',
      type: 'object',
      fields: [
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        { name: 'whatsappLabel', title: 'WhatsApp button label', type: 'string' },
        { name: 'exploreLabel', title: 'Explore button label', type: 'string' },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', title: 'SEO title', type: 'string' },
        { name: 'description', title: 'SEO description', type: 'text', rows: 3 },
        { name: 'image', title: 'Social share image', ...imageWithAlt },
        { name: 'noIndex', title: 'Hide from search engines', type: 'boolean', initialValue: false },
      ],
    },
  ],
  preview: {
    select: { title: 'label', subtitle: 'slug.current' },
  },
}
