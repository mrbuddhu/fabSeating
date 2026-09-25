// Generates lib/imageManifest.json: a list of image files in public/images/*.
// Pages import this JSON instead of reading the filesystem at runtime, so Vercel
// doesn't bundle the whole public/images folder into serverless functions.
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..', 'public', 'images')
const IMG = /\.(png|jpe?g|webp|avif)$/i
const manifest = {}

function walk(dir) {
  let entries = []
  try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { return }
  const rel = path.relative(root, dir).split(path.sep).join('/')
  const files = entries.filter((e) => e.isFile() && IMG.test(e.name)).map((e) => e.name).sort()
  if (rel && files.length) manifest[rel] = files
  for (const e of entries) if (e.isDirectory()) walk(path.join(dir, e.name))
}

walk(root)
const out = path.join(__dirname, '..', 'lib', 'imageManifest.json')
fs.writeFileSync(out, JSON.stringify(manifest, null, 2) + '\n')
console.log(`image manifest: ${Object.keys(manifest).length} folders`)
