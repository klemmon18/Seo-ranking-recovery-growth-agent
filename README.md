# SEO Agent App

Minimal Next.js app for a Custom GPT Action that fetches and structures SEO ranking data from Semrush.

## What it does

This app exposes one endpoint:

- `POST /api/seo-snapshot`

It:
1. Accepts a domain
2. Pulls organic keyword data from Semrush
3. Applies lightweight rules
4. Returns JSON your Custom GPT can analyze

## Local setup

1. Install dependencies

```bash
npm install
```

2. Create local env file

Copy `.env.example` to `.env.local`

```bash
cp .env.example .env.local
```

3. Add your keys

- `SEMRUSH_API_KEY`
- `SEMRUSH_DATABASE`
- `APP_API_KEY`

4. Run locally

```bash
npm run dev
```

## Test locally

```bash
curl -X POST http://localhost:3000/api/seo-snapshot \
  -H "Content-Type: application/json" \
  -H "x-api-key: replace_with_your_internal_api_key" \
  -d '{
    "domain": "sjwickcpa.com",
    "database": "us",
    "topN": 50
  }'
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo into Vercel
3. Add the environment variables from `.env.example`
4. Deploy

## Connect to Custom GPT

Add your deployed URL to the OpenAPI spec in `openapi.json`, then paste that schema into the GPT Action setup.
