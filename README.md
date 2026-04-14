# Nova Maternity Hospital Platform

Production-style Next.js 14 App Router project for a digital-first maternity hospital website, patient portal, and admin dashboard.

## Features

- Public conversion-focused website with booking flow
- Patient portal with appointments, history, notifications, and profile
- Admin dashboard for operations and doctor schedule visibility
- API routes for appointments, auth, notifications, schedules, and payments
- Supabase-ready auth/data integration with demo-safe fallbacks
- Stripe-ready payment endpoint with demo mode when keys are absent
- SEO metadata, sitemap, robots, and schema markup

## Run locally

1. Install dependencies:

   `npm install`

2. Copy environment variables:

   `Copy-Item .env.example .env.local`

3. Start the dev server:

   `npm run dev`

4. Open:

   [http://localhost:3000](http://localhost:3000)

## Production checks

- `npm run build`
- `npm run typecheck`

## Environment notes

- Without Supabase keys, auth endpoints run in demo mode.
- Without Stripe keys, payment endpoint returns a demo success response.
- Without Resend keys, notification endpoint still completes in demo mode.
- Use `supabase/schema.sql` to provision the core database tables.
