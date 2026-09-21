/**
 * Uploads the local product library (public/images/<category>) to Sanity as
 * `productCategory` + `product` documents.
 *
 * Usage:
 *   node scripts/upload-products-to-sanity.js            # dry run (default)
 *   node scripts/upload-products-to-sanity.js --commit   # actually upload
 *
 * Needs SANITY_API_WRITE_TOKEN (Editor role) in .env.local.
 * Safe to re-run: document _ids are deterministic and Sanity de-duplicates
 * identical image files.
 */
const fs = require('fs')
const path = require('path')

// Minimal .env.local loader (no dotenv dependency)
const envFile = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const COMMIT = process.argv.includes('--commit')
const IMAGES = path.join(__dirname, '..', 'public', 'images')

// folder (relative to public/images) -> category. Gallery, brand logos, team
// and _source-extras are intentionally NOT uploaded.
const CATEGORIES = [
  { dir: 'sofas', slug: 'sofas', title: 'Sofas' },
  { dir: 'chairs/dining', slug: 'dining-chairs', title: 'Dining Chairs' },
  { dir: 'chairs/office', slug: 'office-chairs', title: 'Office Chairs' },
  { dir: 'chairs/lounge', slug: 'lounge-chairs', title: 'Lounge Chairs' },
  { dir: 'dining-tables', slug: 'dining-tables', title: 'Dining Tables' },
  { dir: 'center-side-tables', slug: 'center-side-tables', title: 'Center & Side Tables' },
  { dir: 'beds', slug: 'beds', title: 'Beds' },
  { dir: 'poufs', slug: 'poufs', title: 'Poufs' },
  { dir: 'rugs', slug: 'rugs', title: 'Rugs' },
]

const IMG_RE = /\.(png|jpe?g|webp)$/i

function titleFromFile(file) {
  const base = file.replace(IMG_RE, '').replace(/^fabseating-/, '')
  return base
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}

function plan() {
  const cats = []
  for (const c of CATEGORIES) {
    const dir = path.join(IMAGES, c.dir)
    if (!fs.existsSync(dir)) {
      console.warn(`! missing folder ${c.dir}, skipped`)
      continue
    }
    const files = fs.readdirSync(dir).filter((f) => IMG_RE.test(f)).sort()
    cats.push({
      ...c,
      products: files.map((f) => ({
        file: path.join(dir, f),
        filename: f,
        slug: f.replace(IMG_RE, '').replace(/^fabseating-/, ''),
        title: titleFromFile(f),
      })),
    })
  }
  return cats
}

async function main() {
  const cats = plan()
  const total = cats.reduce((n, c) => n + c.products.length, 0)
  console.log(`${COMMIT ? 'UPLOAD' : 'DRY RUN'}: ${cats.length} categories, ${total} products`)
  for (const c of cats) console.log(`  ${c.title.padEnd(24)} ${String(c.products.length).padStart(3)}  (${c.dir})`)
  if (!COMMIT) {
    console.log('\nNothing uploaded. Re-run with --commit (needs SANITY_API_WRITE_TOKEN).')
    return
  }

  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token || token.startsWith('your_')) {
    console.error('\nMissing SANITY_API_WRITE_TOKEN in .env.local')
    process.exit(1)
  }
  const { createClient } = require('@sanity/client')
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'n59kaaxb',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })

  let done = 0
  for (const c of cats) {
    const catId = `productCategory-${c.slug}`
    await client.createOrReplace({
      _id: catId,
      _type: 'productCategory',
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
    })
    for (const p of c.products) {
      const asset = await client.assets.upload('image', fs.createReadStream(p.file), {
        filename: p.filename,
      })
      await client.createOrReplace({
        _id: `product-${c.slug}-${p.slug}`.slice(0, 120),
        _type: 'product',
        title: p.title,
        slug: { _type: 'slug', current: p.slug.slice(0, 96) },
        category: { _type: 'reference', _ref: catId },
        images: [
          { _type: 'image', _key: 'main', asset: { _type: 'reference', _ref: asset._id } },
        ],
        featured: false,
      })
      done++
      if (done % 10 === 0 || done === total) console.log(`  ${done}/${total}`)
    }
  }
  console.log('Done.')
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})
