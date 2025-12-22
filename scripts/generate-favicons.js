/**
 * Script to generate favicon files from logo.png
 * 
 * Requirements:
 * - Install sharp: npm install sharp
 * - Place logo.png in /public folder
 * 
 * Run: node scripts/generate-favicons.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const publicDir = path.join(__dirname, '..', 'public')
const logoPath = path.join(publicDir, 'logo.png')

async function generateFavicons() {
  try {
    // Check if logo.png exists
    if (!fs.existsSync(logoPath)) {
      console.error('❌ logo.png not found in /public folder')
      console.log('Please place your logo.png file in the /public folder first')
      return
    }

    console.log('🎨 Generating favicon files...')

    // Generate favicon.ico (32x32)
    await sharp(logoPath)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFile(path.join(publicDir, 'favicon.ico'))
    console.log('✅ Generated favicon.ico (32x32)')

    // Generate apple-touch-icon.png (180x180)
    await sharp(logoPath)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFile(path.join(publicDir, 'apple-touch-icon.png'))
    console.log('✅ Generated apple-touch-icon.png (180x180)')

    // Generate additional sizes for better PWA support
    const sizes = [192, 512]
    for (const size of sizes) {
      await sharp(logoPath)
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .toFile(path.join(publicDir, `icon-${size}x${size}.png`))
      console.log(`✅ Generated icon-${size}x${size}.png`)
    }

    console.log('\n✨ All favicon files generated successfully!')
    console.log('📁 Files are in the /public folder')
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message)
    console.log('\n💡 Alternative: Use online tools like https://realfavicongenerator.net/')
  }
}

generateFavicons()

