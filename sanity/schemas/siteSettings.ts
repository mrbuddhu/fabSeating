export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo image',
      type: 'image',
      options: { hotspot: true },
      description: 'Used in header and footer. If empty, /logo.png is used.',
    },
    {
      name: 'announcementText',
      title: 'Announcement Bar Text',
      type: 'string',
    },
  ],
}


