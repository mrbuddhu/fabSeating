# FabSeating

Premium furniture website built with Next.js 14, TypeScript, Tailwind CSS, and Sanity CMS.

## Features

- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for subtle animations
- **Sanity CMS** for content management
- **Resend** for email handling
- **SEO optimized** with metadata and structured data
- **Analytics ready** (GA4, Google Ads, Meta Pixel)
- **Performance optimized** with ISR and image optimization

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Fill in your Sanity project ID, dataset, API token, and other credentials.

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Sanity Setup

1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Install Sanity CLI:
```bash
npm install -g @sanity/cli
```

3. Initialize Sanity in the project:
```bash
sanity init
```

4. Import the schemas from the `sanity/schemas` directory

## Project Structure

```
app/              # Next.js App Router pages
components/       # React components
lib/              # Utilities and helpers
sanity/           # Sanity schemas
types/            # TypeScript type definitions
```

## Deployment

The site is configured for deployment on Vercel. Connect your repository and set the environment variables in the Vercel dashboard.

## Environment Variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (default: production)
- `SANITY_API_TOKEN` - Sanity API token
- `RESEND_API_KEY` - Resend API key for emails
- `NEXT_PUBLIC_GA4_ID` - Google Analytics 4 ID
- `NEXT_PUBLIC_GOOGLE_ADS_ID` - Google Ads conversion ID
- `NEXT_PUBLIC_META_PIXEL_ID` - Meta Pixel ID
- `NEXT_PUBLIC_SITE_URL` - Your site URL

