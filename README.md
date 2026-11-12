# im-pro.tech

Website for Rafa Forero and im-pro.tech. Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 · Supabase.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: without it the live counter uses the static fallback
npm run dev
```

`npm run check` runs lint, typecheck and build. Run it before every commit.

## Where things live

| What | Where |
| --- | --- |
| All copy (EN + ES), every `TODO:` | `src/content/site.ts` |
| Sections | `src/components/sections/` |
| Tokens and base styles | `src/app/globals.css` |
| Section styles | `src/app/[lang]/site.css` |
| Live counter (server read, Realtime client) | `src/lib/stats.ts`, `src/components/shared/LiveCounter.tsx` |
| Supabase SQL | `supabase/migrations/` |
| Client logos | `public/clients/` (then set `logo` in `site.ts`) |
| Product facts / design system | `PRODUCT.md`, `DESIGN.md` |

## Routes

`/` English, `/es` Spanish. `/en/*` redirects (308) to the unprefixed URL.
Also `/sitemap.xml`, `/robots.txt`, and per-language Open Graph images.

## The live counter (Supabase)

1. Adapt the placeholder `public.tickets` table in
   `supabase/migrations/20261111120000_site_stats.sql` to your real table and columns
   (search for `TODO`), then apply it: `supabase db push` (or paste it in the SQL editor).
2. In Supabase → Realtime settings, make sure private channels / Realtime Authorization
   are enabled (the counter uses the private channel `site-stats`).
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon or publishable
   key, **never** service_role) in Vercel → Project → Settings → Environment Variables,
   and in `.env.local` for local work.

Without the env vars, or if Supabase is down, the page shows the static fallback from
`site.ts` (`stack.counter.fallbackValue`). It never breaks the page.

## Deploy (Vercel)

1. vercel.com → Add New → Project → import `eserafasi/impro.tech`. Framework: Next.js; no
   build settings to change.
2. Add the env vars above (Production and Preview), plus `NEXT_PUBLIC_SITE_URL=https://im-pro.tech`.
3. Every push to a branch gets a Preview URL; `main` deploys to production.

## DNS for im-pro.tech

In Vercel → Project → Settings → Domains, add `im-pro.tech` and `www.im-pro.tech`
(redirect `www` → apex). Then at your DNS provider:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Vercel's Domains panel shows the exact values for your project; if it lists different
ones (it sometimes gives a project-specific A record or CNAME), use those. Remove any
other A/AAAA records on `@`. If you have CAA records, add `0 issue "letsencrypt.org"`.
Propagation usually takes minutes; Vercel issues the HTTPS certificate automatically.
