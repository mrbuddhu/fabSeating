# PWA Setup Guide

## Favicon Files Required

To complete the PWA setup, you need to generate the following favicon files from your `logo.png`:

### Quick Setup (Recommended):

**Option 1: Automated Script (Easiest)**
```bash
# Install sharp (if not already installed)
npm install sharp --save-dev

# Generate all favicon files
npm run generate-favicons
```

This will automatically generate:
- `favicon.ico` (32x32)
- `apple-touch-icon.png` (180x180)
- `icon-192x192.png`
- `icon-512x512.png`

**Option 2: Online Tools**
- Visit https://realfavicongenerator.net/
- Upload your `logo.png`
- Download all generated favicons
- Place them in the `/public` folder

**Option 3: Manual (ImageMagick)**
```bash
# Generate favicon.ico
convert logo.png -resize 32x32 favicon.ico

# Generate apple-touch-icon.png
convert logo.png -resize 180x180 apple-touch-icon.png
```

## PWA Features Included

✅ **Manifest** (`/app/manifest.ts`)
- App name, description, theme colors
- Icons configuration
- Display mode (standalone)

✅ **Service Worker** (`/public/sw.js`)
- Offline caching
- Cache-first strategy
- Automatic cache cleanup

✅ **PWA Registration** (`/components/PWARegister.tsx`)
- Service worker registration
- Install prompt handling
- App installed detection

## Testing PWA

1. **Chrome DevTools:**
   - Open DevTools → Application → Service Workers
   - Check "Offline" to test offline mode
   - Application → Manifest to verify manifest

2. **Lighthouse:**
   - Run Lighthouse audit
   - Check PWA score (should be 90+)

3. **Mobile Testing:**
   - Open site on mobile device
   - Look for "Add to Home Screen" prompt
   - Test offline functionality

## PWA Checklist

- [x] Manifest file created
- [x] Service worker registered
- [x] Icons configured
- [x] Theme colors set
- [x] Offline support enabled
- [ ] Generate favicon.ico (32x32)
- [ ] Generate apple-touch-icon.png (180x180)

## Notes

- Service worker caches main pages for offline access
- API routes are excluded from caching
- Cache version updates automatically on deploy
- Users will see cached content when offline

