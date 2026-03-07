const { createClient } = require('next-sanity');

// You'll need to set your write token here
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'n59kaaxb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN // Add your write token here
});

// Dummy case studies to import into Sanity
const dummyCaseStudies = [
  {
    _type: 'caseStudy',
    title: 'A Regal Home Transformation in Kilpauk',
    slug: {
      _type: 'slug',
      current: 'regal-home-kilpauk'
    },
    summary: 'Complete furniture and furnishings for a 3-storey residence featuring custom throne chairs and bespoke accent pieces.',
    industry: 'residential',
    client: 'Murugan',
    location: 'Kilpauk, Chennai',
    year: '2024',
    challenge: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The client needed a complete furniture and furnishing solution for their 3-storey residence that would reflect their regal taste while maintaining functionality for daily family life.'
          }
        ]
      }
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We designed and manufactured custom throne chairs, bespoke accent pieces, and coordinated all furnishings to create a cohesive royal aesthetic throughout the home.'
          }
        ]
      }
    ],
    result: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A stunning transformation that exceeded client expectations, creating a truly regal living space that combines luxury with comfort.'
          }
        ]
      }
    ],
    stats: [
      {
        _type: 'object',
        label: 'Project Duration',
        value: '6 months'
      },
      {
        _type: 'object',
        label: 'Square Footage',
        value: '4,500 sq ft'
      },
      {
        _type: 'object',
        label: 'Custom Pieces',
        value: '12+ items'
      }
    ]
  },
  {
    _type: 'caseStudy',
    title: 'Luxury 4BHK Residence in Nungambakkam',
    slug: {
      _type: 'slug',
      current: 'luxury-4bhk-nungambakkam'
    },
    summary: 'Complete home furniture and furnishings featuring Italian marble dining table, home theatre recliners, and motorized curtains.',
    industry: 'residential',
    client: 'Mr. Rajesh Kothari',
    location: 'Nungambakkam, Chennai',
    year: '2024',
    challenge: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The client wanted a luxury 4BHK residence with high-end furnishings including Italian marble dining, home theatre setup, and automated systems.'
          }
        ]
      }
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We sourced and installed Italian marble dining table, premium home theatre recliners, motorized curtains, and coordinated all furniture pieces for a cohesive luxury look.'
          }
        ]
      }
    ],
    result: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A complete luxury residence that delivers on both aesthetics and functionality, with all premium furnishings integrated seamlessly.'
          }
        ]
      }
    ],
    stats: [
      {
        _type: 'object',
        label: 'Project Duration',
        value: '4 months'
      },
      {
        _type: 'object',
        label: 'Square Footage',
        value: '3,200 sq ft'
      },
      {
        _type: 'object',
        label: 'Premium Items',
        value: '20+ pieces'
      }
    ]
  },
  {
    _type: 'caseStudy',
    title: 'Boutique Hotel Lobby',
    slug: {
      _type: 'slug',
      current: 'boutique-hotel-lobby'
    },
    summary: 'Welcoming and elegant seating solutions for hospitality. Coming Soon.',
    industry: 'hospitality',
    challenge: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The boutique hotel needed a lobby that would create a welcoming first impression while reflecting their brand identity.'
          }
        ]
      }
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We designed elegant seating solutions that balance comfort with style, creating an inviting atmosphere for guests.'
          }
        ]
      }
    ],
    result: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A transformed lobby space that enhances the guest experience and strengthens the hotel\'s brand identity.'
          }
        ]
      }
    ],
    stats: [
      {
        _type: 'object',
        label: 'Project Status',
        value: 'Coming Soon'
      },
      {
        _type: 'object',
        label: 'Seating Capacity',
        value: '25+ guests'
      }
    ]
  }
];

async function importCaseStudies() {
  console.log('Starting import of case studies...');
  
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ SANITY_API_WRITE_TOKEN environment variable is required');
    console.log('Please set your write token and try again');
    return;
  }
  
  try {
    for (const caseStudy of dummyCaseStudies) {
      console.log(`Creating: ${caseStudy.title}`);
      
      // Check if case study with this slug already exists
      const existing = await client.fetch('*[_type == "caseStudy" && slug.current == $slug][0]', {
        slug: caseStudy.slug.current
      });
      
      if (existing) {
        console.log(`Case study "${caseStudy.title}" already exists, skipping...`);
        continue;
      }
      
      // Create the case study
      const result = await client.create(caseStudy);
      console.log(`✅ Created: ${result.title} (ID: ${result._id})`);
    }
    
    console.log('🎉 Import completed successfully!');
    console.log('You can now edit these case studies in your Sanity Studio.');
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
  }
}

importCaseStudies();
