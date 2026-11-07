export default {
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  liveEdit: true,
  description: 'The tabs follow the home page from top to bottom. Edits on this page save as you make them.',
  groups: [
    { name: 'hero', title: '1. Top of the page', default: true },
    { name: 'brands', title: '2. Brand logos' },
    { name: 'quote', title: '3. Quote' },
    { name: 'about', title: '4. About' },
    { name: 'categories', title: '5. All Categories' },
    { name: 'industries', title: '6. Industries' },
    { name: 'process', title: '7. Our process' },
    { name: 'legacy', title: '8. Our legacy' },
    { name: 'custom', title: '9. Custom solutions' },
    { name: 'reviews', title: '10. Google reviews' },
    { name: 'faq', title: '11. Questions' },
    { name: 'showroom', title: '12. Visit the showroom' },
    { name: 'seo', title: 'Search listing' },
  ],
  fields: [
    {
      name: 'exploreIntro',
      title: 'All Categories text',
      type: 'object',
      group: 'categories',
      description: 'The small line, the heading, and the sentence above the circles.',
      fields: [
        { name: 'eyebrow', title: 'Small line', type: 'string', description: 'Leave empty to keep “Explore”.' },
        { name: 'title', title: 'Heading', type: 'string', description: 'Leave empty to keep “All Categories”.' },
        { name: 'description', title: 'Description', type: 'text', rows: 2, description: 'The line under the title.' },
      ],
    },
    {
      name: 'furnitureCategories',
      title: 'Circles',
      type: 'array',
      group: 'categories',
      description: 'Open a name, upload Round photo, then Publish. TV Consoles, Wardrobes, Storage Solutions, Modular Kitchens, Wallpapers, and Doors have no photo yet.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'coverImage', title: 'Round photo', type: 'image', options: { hotspot: true }, description: 'The photo inside the circle on the home page. Upload or replace it here.' },
            { name: 'title', title: 'Category name', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'slug', title: 'Landing page address', type: 'slug', options: { source: (_doc: any, ctx: any) => ctx.parent?.title, maxLength: 96 }, hidden: true },
            { name: 'blurb', title: 'Description', type: 'text', rows: 2, hidden: true },
            {
              name: 'productCategories',
              title: 'Products on the landing page',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'productCategory' }] }],
              hidden: true,
            },
          ],
          preview: {
            select: { title: 'title', media: 'coverImage' },
            prepare({ title, media }: { title?: string; media?: unknown }) {
              return { title: title || 'Category', subtitle: media ? 'Round photo' : 'No photo yet — open and upload', media }
            },
          },
        },
      ],
    },
    { name: 'heroVideoFile', title: 'Video', type: 'file', group: 'hero', description: 'The video at the top of the home page.', options: { accept: 'video/*' } },
    {
      name: 'galleryImages',
      title: 'Main Gallery Photos',
      group: 'hero',
      hidden: true,
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
      title: 'Photo',
      group: 'hero',
      type: 'image',
      options: { hotspot: true },
      description: 'Shown behind the words when the video is not playing.',
    },
    {
      name: 'aboutReels',
      title: 'Four videos',
      group: 'about',
      description: 'The four videos under About Fab Seating.',
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
      group: 'about',
      hidden: true,
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
      title: 'Steps',
      group: 'process',
      description: 'The words in the coloured strip that says Our Process. Example: Consultation, Design & Selection, Manufacturing.',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'brandPartners',
      title: 'Logos',
      group: 'brands',
      description: 'The row of brand logos under the top banner. Leave empty to keep the current logos.',
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
    },
    {
      name: 'industries',
      title: 'Industries',
      group: 'industries',
      description: 'The list under the circles. Leave empty to keep the current list.',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'faqs',
      title: 'Questions and answers',
      group: 'faq',
      description: 'The questions near the bottom of the home page. Leave empty to keep the current questions.',
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
    },
    {
      name: 'googleReviewsUrl',
      title: 'Google reviews link',
      group: 'reviews',
      type: 'url',
      description: 'Your Google Business Profile reviews link, used by the "Loved on Google" section.',
    },
    {
      name: 'hero',
      title: 'Words',
      group: 'hero',
      description: 'The headline, the line under it, and the button at the top of the home page.',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Heading', type: 'text', rows: 2 },
        { name: 'subheadline', title: 'Line under the heading', type: 'text', rows: 3 },
        { name: 'ctaText', title: 'Button', type: 'string' },
        { name: 'trustLine1', title: 'Trust line 1', type: 'string' },
        { name: 'trustLine2', title: 'Trust line 2', type: 'string' },
        { name: 'badge1', title: 'Badge 1', type: 'string' },
        { name: 'badge2', title: 'Badge 2', type: 'string' },
        { name: 'badge3', title: 'Badge 3', type: 'string' },
      ],
    },
    {
      name: 'quote',
      title: 'Quote',
      group: 'quote',
      description: 'The sentence on the coloured band under the brand logos.',
      type: 'object',
      fields: [
        { name: 'text', title: 'Quote', type: 'text', rows: 4 },
        { name: 'attribution', title: 'Attribution', type: 'string' },
      ],
    },
    {
      name: 'about',
      title: 'About text',
      group: 'about',
      description: 'The heading and paragraph above the four videos.',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Small line', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Text', type: 'text', rows: 4 },
        { name: 'instagramUrl', title: 'Instagram link', type: 'url' },
      ],
    },
    {
      name: 'legacy',
      title: 'Legacy',
      group: 'legacy',
      description: 'The coloured block with the years and the three numbers.',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Small line', type: 'string' },
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
      title: 'Custom solutions',
      group: 'custom',
      description: 'The white section with the custom quote button.',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Small line', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'intro', title: 'Intro', type: 'text', rows: 2 },
        { name: 'paragraph1', title: 'Paragraph 1', type: 'text', rows: 3 },
        { name: 'paragraph2', title: 'Paragraph 2', type: 'text', rows: 3 },
        { name: 'ctaLabel', title: 'Button label', type: 'string' },
      ],
    },
    {
      name: 'showroomCta',
      title: 'Showroom',
      group: 'showroom',
      description: 'The last section on the home page, before the banner and the footer.',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Small line', type: 'string' },
        { name: 'title', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Text', type: 'text', rows: 3 },
        { name: 'directionsLabel', title: 'Directions button', type: 'string' },
        { name: 'contactLabel', title: 'Contact button', type: 'string' },
      ],
    },
    {
      name: 'experience',
      title: 'Banner',
      group: 'showroom',
      hidden: true,
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
      title: 'Review cards',
      group: 'reviews',
      description: 'The review cards above the questions.',
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
      title: 'Search result',
      group: 'seo',
      description: 'The title and description Google shows for the home page. Visitors do not see this on the page.',
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
