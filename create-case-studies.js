// Script to create case studies in Sanity
const { createClient } = require('@sanity/client');

// Initialize the client
const client = createClient({
  projectId: 'n59kaaxb',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Case studies to create
const caseStudies = [
  {
    _type: 'caseStudy',
    title: 'A Regal Home Transformation in Kilpauk',
    slug: { current: 'regal-home-kilpauk' },
    summary: 'Complete furniture and furnishings for a 3-storey residence featuring custom throne chairs and bespoke accent pieces.',
    client: 'Murugan',
    location: 'Kilpauk, Chennai',
    year: '2024',
    industry: 'residential',
    comingSoon: false,
  },
  {
    _type: 'caseStudy',
    title: 'Luxury 4BHK Residence in Nungambakkam',
    slug: { current: 'luxury-4bhk-nungambakkam' },
    summary: 'Complete home furniture and furnishings featuring Italian marble dining table, home theatre recliners, and motorized curtains.',
    client: 'Mr. Rajesh Kothari',
    location: 'Nungambakkam, Chennai',
    year: '2024',
    industry: 'residential',
    comingSoon: false,
  },
  {
    _type: 'caseStudy',
    title: 'Boutique Hotel Lobby',
    slug: { current: 'boutique-hotel-lobby' },
    summary: 'Welcoming and elegant seating solutions for hospitality. Coming Soon.',
    industry: 'hospitality',
    comingSoon: true,
  },
];

async function createCaseStudies() {
  try {
    console.log('Creating case studies...');
    
    for (const caseStudy of caseStudies) {
      console.log(`Creating: ${caseStudy.title}`);
      
      // Check if already exists
      const existing = await client.fetch(
        `*[_type == "caseStudy" && slug.current == $slug][0]`,
        { slug: caseStudy.slug.current }
      );
      
      if (existing) {
        console.log(`✅ Already exists: ${caseStudy.title}`);
        continue;
      }
      
      // Create new case study
      const result = await client.create(caseStudy);
      console.log(`✅ Created: ${result.title} (ID: ${result._id})`);
    }
    
    console.log('\n🎉 All case studies created successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Open Sanity Studio at http://localhost:3333');
    console.log('2. Upload hero images to each case study');
    console.log('3. Your website will automatically use the real images!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 You might need to:');
    console.log('1. Set up API tokens in .env.local');
    console.log('2. Check your project permissions');
  }
}

createCaseStudies();
