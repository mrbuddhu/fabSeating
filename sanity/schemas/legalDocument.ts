export default {
  name: 'legalDocument',
  title: 'Policies and legal pages',
  type: 'document',
  description: 'Replace the Policies or Legal page. Use the slug policies or legals. Leave unpublished to keep the current page.',
  fields: [
    { name: 'title', title: 'Studio name', type: 'string', validation: (Rule: any) => Rule.required() },
    {
      name: 'slug',
      title: 'Page',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (input: string) => input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      },
      description: 'policies publishes at /policies. legals publishes at /legals.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'blocks',
      title: 'Page content',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'kind',
            title: 'Style',
            type: 'string',
            options: {
              list: [
                { title: 'Paragraph', value: 'p' },
                { title: 'Heading', value: 'h2' },
                { title: 'Subheading', value: 'h3' },
                { title: 'Small heading', value: 'h4' },
                { title: 'Date line', value: 'meta' },
                { title: 'Paragraph with Policies link', value: 'policies-link' },
              ],
            },
            initialValue: 'p',
          },
          { name: 'text', title: 'Text', type: 'text', rows: 4 },
        ],
        preview: { select: { title: 'text', subtitle: 'kind' } },
      }],
    },
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
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
}
