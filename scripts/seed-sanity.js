/**
 * One-time seed: creates the initial Sanity documents so the client can edit
 * them in Studio without creating anything. Run once: npm run seed-sanity
 * (set SANITY_API_TOKEN and optionally NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local or env).
 * Get token: https://sanity.io/manage → API → Tokens → Add API token (Editor).
 */

const fs = require('fs')
const path = require('path')

// Project root = folder that contains package.json (parent of scripts/)
const projectRoot = path.resolve(__dirname, '..')

function loadEnv(file) {
  const p = path.join(projectRoot, file)
  if (!fs.existsSync(p)) return
  const content = fs.readFileSync(p, 'utf8')
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (trimmed.startsWith('#')) return
    const eq = trimmed.indexOf('=')
    if (eq === -1) return
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    val = val.replace(/\r$/, '')
    if (key) process.env[key] = val
  })
}

;['.env.local', '.env.development', '.env'].forEach(loadEnv)

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID.')
  console.error('Tried loading from:', projectRoot)
  console.error('Add to .env.local in project root: NEXT_PUBLIC_SANITY_PROJECT_ID=n59kaaxb')
  process.exit(1)
}
if (!token) {
  console.error('Missing SANITY_API_TOKEN.')
  console.error('Add to .env.local: SANITY_API_TOKEN=your_token (uncomment the line, no # at start)')
  process.exit(1)
}

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

async function run() {
  console.log('Seeding Sanity documents...')

  // 1. Homepage (singleton)
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroImage: undefined,
    aboutReels: [
      { _type: 'object', _key: 'r1', videoUrl: '/videos/video1.mp4' },
      { _type: 'object', _key: 'r2', videoUrl: '/videos/video2.mp4' },
      { _type: 'object', _key: 'r3', videoUrl: '/videos/video3.mp4' },
      { _type: 'object', _key: 'r4', videoUrl: '/videos/video4.mp4' },
    ],
    solutionsCards: [
      { _type: 'object', _key: 's1', title: 'Residential Collection', description: 'Elegant and functional furniture for modern homes', link: '/solutions/residential', videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-living-room-1574/1080p.mp4' },
      { _type: 'object', _key: 's2', title: 'Office Spaces', description: 'Productive and inspiring work environments', link: '/solutions/office', videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-boutique-office-6267/1080p.mp4' },
      { _type: 'object', _key: 's3', title: 'Hospitality', description: 'Durable and stylish solutions for hospitality', link: '/solutions/hospitality', videoUrl: 'https://cdn.coverr.co/videos/coverr-modern-cafe-5535/1080p.mp4' },
    ],
    processSteps: [
      'Consultation',
      'Design & Selection',
      'Manufacturing & Sourcing',
      'Quality Checks',
      'Delivery & Installation',
      'After Sales Support',
    ],
  })
  console.log('  ✓ Homepage')

  // 2. Contact Page (singleton) – no images yet; client adds 3 in Studio
  await client.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    stripImages: [],
  })
  console.log('  ✓ Contact Page')

  // 3. Site Settings (singleton)
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'Fabseating',
    announcementText: 'Serving residential & commercial spaces across South India since 2001.',
    logo: undefined,
  })
  console.log('  ✓ Site Settings')

  // 4. Team (3 placeholder members – client can add photos and edit in Studio)
  const teamIds = ['teamMember-1', 'teamMember-2', 'teamMember-3']
  const teamData = [
    { name: 'Founder Name', role: 'Founder', bio: 'With over 20 years of experience in the furniture industry, leading the vision of Fab Seating to create spaces that inspire.' },
    { name: 'Co-Founder Name', role: 'Co-Founder', bio: 'A design enthusiast with a passion for ergonomics and aesthetics, ensuring every piece meets our high standards of quality.' },
    { name: 'Key Member Name', role: 'Head of Operations', bio: 'Ensuring smooth execution from manufacturing to delivery, making sure your experience with Fab Seating is seamless.' },
  ]
  for (let i = 0; i < teamIds.length; i++) {
    await client.createOrReplace({
      _id: teamIds[i],
      _type: 'teamMember',
      name: teamData[i].name,
      role: teamData[i].role,
      bio: teamData[i].bio,
      image: undefined,
      socials: i === 0 ? { linkedin: '#', twitter: '#', instagram: '#' } : i === 1 ? { linkedin: '#', instagram: '#' } : { linkedin: '#', email: 'mailto:info@fabseating.com' },
    })
  }
  console.log('  ✓ Team (3 members)')

  console.log('\nDone. Open Sanity Studio and you’ll see Homepage, Contact Page, Site Settings, and Team ready to edit.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
