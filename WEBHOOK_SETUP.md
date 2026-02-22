# Make the live site update instantly when you publish in Sanity

When you **publish** in Sanity Studio, the **live site** (e.g. your Vercel/production URL) will update within seconds **only if** a webhook is set up. Follow these steps once.

## 1. Get your live site URL

Use the exact URL where your site is hosted, for example:

- `https://fabseating.com`
- `https://fabseating.vercel.app`
- or whatever your production domain is

**Do not use** `http://localhost:3000` — that only works on your computer.

## 2. Add the webhook in Sanity

1. Open **[sanity.io/manage](https://sanity.io/manage)** and sign in.
2. Select your project (e.g. **Fabseating** / `n59kaaxb`).
3. Go to **API** → **Webhooks**.
4. Click **Create webhook**.
5. Fill in:
   - **Name:** e.g. `Live site revalidate`
   - **URL:** `https://YOUR-LIVE-DOMAIN.com/api/sanity-webhook`  
     Replace `YOUR-LIVE-DOMAIN.com` with your real live domain (no trailing slash).
   - **Trigger on:** **Create**, **Update**, **Delete** (all three).
   - **Dataset:** **production** (or the dataset you use).
   - **Projection:** leave empty (or default).
   - **Secret (optional):** If you want to secure the webhook, set a long random string here, then add the same value as `SANITY_WEBHOOK_SECRET` in your live site’s environment variables (e.g. in Vercel → Project → Settings → Environment Variables). If you leave Secret empty, the webhook still works; only the endpoint is public.
6. Save the webhook.

## 3. Deploy your site

Ensure your **live** site is deployed with the latest code (so the route `/api/sanity-webhook` exists). If you use Vercel/Netlify, push to your main branch or trigger a deploy.

## 4. Test

1. In Sanity Studio, change something (e.g. edit a Team member or the Homepage) and click **Publish**.
2. Open your **live site** in a new tab and refresh (or open the homepage). You should see the new content within a few seconds.

If it doesn’t update:

- Confirm the webhook URL is exactly `https://YOUR-LIVE-DOMAIN.com/api/sanity-webhook` (no typo, no trailing slash, **https**).
- Confirm the live site is deployed and the URL loads in the browser.
- If you set a **Secret**, ensure `SANITY_WEBHOOK_SECRET` on the live site matches the webhook secret in Sanity.
