# SANITY API TOKEN SETUP

## Option 1: Check Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your Fab Seating project
3. Go to Settings → Environment Variables
4. Look for SANITY_API_WRITE_TOKEN

## Option 2: Create New Token in Sanity
1. Go to https://www.sanity.io/manage
2. Select project: n59kaaxb (Fabseating Website)
3. Click API tab
4. Click "Add API Token"
5. Name: "Fab Seating Write Access"
6. Permissions: "Write"
7. Copy the generated token

## Option 3: Use Existing Token
If you already have tokens, they'll be listed in the API tab.

## After Getting Token:
1. Create .env.local file in project root
2. Add: SANITY_API_WRITE_TOKEN=your_token_here
3. Run: node import-case-studies.js
