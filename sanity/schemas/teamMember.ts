export default {
  name: 'teamMember',
  title: 'Team',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'role', title: 'Role', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'bio', title: 'Short bio', type: 'text' },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'socials',
      title: 'Social links',
      type: 'object',
      options: { collapsible: true },
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'twitter', title: 'Twitter URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'email', title: 'Email (mailto:)', type: 'url' },
      ],
    },
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: '_createdAt', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'image' },
  },
}
