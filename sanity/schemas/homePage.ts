export default {
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'exploreIntro',
      title: 'All Categories text',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'The small line above the title. Leave empty to keep “Explore”.' },
        { name: 'title', title: 'Title', type: 'string', description: 'Leave empty to keep “All Categories”.' },
        { name: 'description', title: 'Description', type: 'text', rows: 2, description: 'The line under the title.' },
      ],
    },
    {
      name: 'furnitureCategories',
      title: 'All Categories',
      type: 'array',
      description: 'Each tile is one circle. Open a tile, replace Image, then Publish. The same image is used on the homepage and on the category circles across the site.',
      options: { layout: 'grid' },
      of: [
        {
          type: 'object',
          fields: [
            { name: 'coverImage', title: 'Image', type: 'image', options: { hotspot: true }, description: 'The photo inside the circle.' },
            { name: 'title', title: 'Category name', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'slug', title: 'Landing page address', type: 'slug', description: 'Sofas is sofas, which opens /category/sofas. This must match the landing page slug.', options: { source: (_doc: any, ctx: any) => ctx.parent?.title, maxLength: 96 }, validation: (Rule: any) => Rule.required() },
            { name: 'blurb', title: 'Description', type: 'text', rows: 2 },
            {
              name: 'productCategories',
              title: 'Products on the landing page',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'productCategory' }] }],
              description: 'These products fill the landing page collection when no custom collection images are uploaded.',
            },
          ],
          preview: { select: { title: 'title', subtitle: 'slug.current', media: 'coverImage' } },
        },
      ],
    },
    { name: 'heroVideoFile', title: 'Hero video upload', type: 'file', options: { accept: 'video/*' } },
    {
      name: 'galleryImages',
      title: 'Main Gallery Photos',
      type: 'array',
      description: 'Older gallery photos. New photos, names, text, and filters are edited under Gallery in the Studio menu.',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Image description', type: 'string' },
          { name: 'caption', title: 'Caption', type: 'text', rows: 2 },
          {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'productCategory' }],
            description: 'Used by the category filters on the Gallery page.',
          },
        ],
      }],
    },
    {
      name: 'heroImage',
      title: 'Hero background image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main hero section background. Used as fallback if no video.',
    },
    {
      name: 'aboutReels',
      title: 'About section – video reels (4 items)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'videoFile', title: 'Video upload', type: 'file', options: { accept: 'video/*' } },
            { name: 'videoUrl', title: 'External video URL (optional)', type: 'url', description: 'Used when no uploaded video is selected.' },
            { name: 'posterImage', title: 'Poster / thumbnail image', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'videoUrl' },
            prepare({ title }: { title?: string }) {
              return { title: title ? `Reel: ${title.slice(0, 40)}…` : 'Reel' }
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(4),
    },
    {
      name: 'solutionsCards',
      title: 'Our Solutions – 3 cards (Residential, Office, Hospitality)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'link', title: 'Link', type: 'string', description: 'e.g. /solutions/residential' },
            { name: 'posterImage', title: 'Poster / thumbnail image', type: 'image', options: { hotspot: true } },
            { name: 'videoFile', title: 'Video upload', type: 'file', options: { accept: 'video/*' } },
            { name: 'videoUrl', title: 'Video URL (optional)', type: 'url', description: 'Used when no video file is uploaded.' },
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Solution card' }
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(6),
    },
    {
      name: 'processSteps',
      title: 'Process steps (typewriter strip)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Consultation, Design & Selection, Manufacturing…',
    },
    {
      name: 'brandPartners',
      title: 'Brand partners strip',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Brand name', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'logo', title: 'Logo', type: 'image' },
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        },
      ],
      description: 'Leave empty to use the built-in list.',
    },
    {
      name: 'industries',
      title: 'Industries we serve',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Leave empty to use the built-in list.',
    },
    {
      name: 'faqs',
      title: 'FAQ section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'answer', title: 'Answer', type: 'text', validation: (Rule: any) => Rule.required() },
          ],
          preview: { select: { title: 'question' } },
        },
      ],
      description: 'Leave empty to use the built-in list.',
    },
    {
      name: 'googleReviewsUrl',
      title: 'Google reviews link',
      type: 'url',
      description: 'Your Google Business Profile reviews link, used by the "Loved on Google" section.',
    },
    {
      name: 'hero',
      title: 'Hero text',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Headline', type: 'text', rows: 2 },
        { name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3 },
        { name: 'ctaText', title: 'Button label', type: 'string' },
        { name: 'trustLine1', title: 'Trust line 1', type: 'string' },
        { name: 'trustLine2', title: 'Trust line 2', type: 'string' },
        { name: 'badge1', title: 'Badge 1', type: 'string' },
        { name: 'badge2', title: 'Badge 2', type: 'string' },
        { name: 'badge3', title: 'Badge 3', type: 'string' },
      ],
    },
    {
      name: 'quote',
      title: 'Quote band',
      type: 'object',
      fields: [
        { name: 'text', title: 'Quote', type: 'text', rows: 4 },
        { name: 'attribution', title: 'Attribution', type: 'string' },
      ],
    },
    {
      name: 'about',
      title: 'About section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Text', type: 'text', rows: 4 },
        { name: 'instagramUrl', title: 'Instagram link', type: 'url' },
      ],
    },
    {
      name: 'legacy',
      title: 'Legacy section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Text', type: 'text', rows: 4 },
        {
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'number', title: 'Number', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' },
            ],
            preview: { select: { title: 'number', subtitle: 'label' } },
          }],
        },
      ],
    },
    {
      name: 'bespoke',
      title: 'Custom solutions section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'intro', title: 'Intro', type: 'text', rows: 2 },
        { name: 'paragraph1', title: 'Paragraph 1', type: 'text', rows: 3 },
        { name: 'paragraph2', title: 'Paragraph 2', type: 'text', rows: 3 },
        { name: 'ctaLabel', title: 'Button label', type: 'string' },
      ],
    },
    {
      name: 'showroomCta',
      title: 'Showroom closing section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Text', type: 'text', rows: 3 },
        { name: 'directionsLabel', title: 'Directions button', type: 'string' },
        { name: 'contactLabel', title: 'Contact button', type: 'string' },
      ],
    },
    {
      name: 'experience',
      title: 'Banner',
      description: 'Older copy of the banner. Edit Banner in the Studio menu. This is used only when that Banner is empty.',
      type: 'object',
      fields: [
        { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt text', type: 'string' }] },
        {
          name: 'items',
          title: 'Labels',
          type: 'array',
          of: [{ type: 'object', fields: [{ name: 'title', title: 'Label', type: 'string' }], preview: { select: { title: 'title' } } }],
          validation: (Rule: any) => Rule.max(4),
        },
      ],
    },
    {
      name: 'googleReviews',
      title: 'Google review cards',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'summary', title: 'Summary line', type: 'string' },
        {
          name: 'items',
          title: 'Reviews',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'text', title: 'Review', type: 'text', rows: 4 },
              { name: 'date', title: 'Date', type: 'string' },
            ],
            preview: { select: { title: 'date', subtitle: 'text' } },
          }],
        },
      ],
    },
    {
      name: 'seo',
      title: 'Homepage SEO',
      type: 'object',
      fields: [
        { name: 'title', title: 'SEO title', type: 'string' },
        { name: 'description', title: 'SEO description', type: 'text', rows: 3 },
        { name: 'image', title: 'Share image', type: 'image', options: { hotspot: true } },
        { name: 'noIndex', title: 'Hide from search engines', type: 'boolean', initialValue: false },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
}
