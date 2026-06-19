# EkaNova Solutions - Production Ready Next.js Platform

This project has been upgraded from a frontend-only website to a full-stack startup platform with:

- Next.js App Router backend APIs
- Supabase PostgreSQL integration
- Contact/enquiry pipeline with anti-spam and rate limiting
- Resend email notifications + auto-reply
- Admin dashboard (Google OAuth via Supabase)
- Blog system with dynamic routes
- WhatsApp integration
- Dark/light mode
- Google Analytics support
- SEO essentials (metadata, sitemap, robots)
- Vercel-ready deployment structure

## Architecture

- `app/api/contact/route.ts`: Enquiry API (validation, security, DB insert, emails)
- `app/api/admin/enquiries/route.ts`: Admin enquiry listing
- `app/api/blog/route.ts`: Blog CRUD seed endpoints
- `app/dashboard/*`: Protected admin-facing pages
- `app/blog/*`: Public SEO-friendly blog pages
- `lib/supabase/*`: Supabase clients
- `lib/validations.ts`: Zod schemas
- `services/email.ts`: Resend integration
- `services/email-templates.ts`: HTML email templates
- `utils/rate-limit.ts`: Rate limiter
- `utils/sanitize.ts`: Input sanitizer
- `supabase/schema.sql`: DB schema, indexes, RLS policies

## Environment Variables

Copy `.env.example` to `.env.local` and fill:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_GA_ID`

## Supabase Setup

1. Create a Supabase project.
2. Run SQL from `supabase/schema.sql` in the SQL editor.
3. In `admin_users`, insert your admin email:
   - `ekanovasolutionsprivatelimited@gmail.com`
4. Enable Google provider in Supabase Auth.
5. Add your site URL and redirect URL:
   - `https://your-domain.com/dashboard`

## Resend Setup

1. Create a free Resend account.
2. Generate API key and set `RESEND_API_KEY`.
3. Set `RESEND_FROM_EMAIL`.
4. If using custom domain sender, verify domain in Resend.

## Local Run

```bash
npm run dev
```

## Deploy to Vercel (Free Tier)

1. Push project to GitHub.
2. Import repo into Vercel.
3. Add all environment variables from `.env.example`.
4. Deploy.
5. In Supabase Auth, add Vercel domain to allowed redirect URLs.

## Netlify note

The repository still contains `netlify.toml`, but this setup is optimized for Vercel + Next.js App Router.

## Future Payment Integration Placeholder

- `app/api/payments/create-order/route.ts` contains a Razorpay-ready placeholder for future order creation.

## Security Features Implemented

- Zod server-side validation
- Client-side validation
- Input sanitization
- Honeypot field
- Duplicate submission prevention (`dedupe_hash`)
- Basic in-memory rate limiting

## Notes

- Replace placeholder WhatsApp number with your real business number.
- Add your favicon and OG image assets in `public/` for final brand polish.

