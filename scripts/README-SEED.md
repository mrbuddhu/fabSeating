# Create Sanity documents for the client (one-time)

Run this **once** so the client sees **Homepage**, **Contact Page**, **Site Settings**, and **Team** in Sanity Studio and only has to edit text/images (no need to create documents).

## 1. Get a write token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Open your project
3. **API** → **Tokens** → **Add API token**
4. Name it e.g. "Seed script", role **Editor**, then create and copy the token

## 2. Run the seed

From the project root, with your env loaded (e.g. from `.env.local`):

**Windows (PowerShell):**
```powershell
$env:SANITY_API_TOKEN="your_token_here"
$env:NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
npm run seed-sanity
```

**Mac/Linux:**
```bash
SANITY_API_TOKEN=your_token_here NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id npm run seed-sanity
```

Or create a `.env.local` with `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_API_TOKEN`, then run (Mac/Linux):

```bash
export $(grep -v '^#' .env.local | xargs) && npm run seed-sanity
```

## 3. After it runs

- Open Sanity Studio; you’ll see **Homepage**, **Contact Page**, **Site Settings**, and **Team** (3 members).
- The client can then change copy, upload images for reels/solutions/contact strip/team/logo, and add or edit team members.
