# im-pro.tech

Website for Rafa Forero and im-pro.tech. Next.js (App Router) · TypeScript strict · Tailwind CSS v4 · Supabase.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: without it the live counter uses the static fallback
npm run dev
```

`npm run check` runs lint, typecheck and build. Run it before every commit.

## Where things live

- `src/content/site.ts`: **all copy**, English and Spanish. Search for `TODO:` to see what's missing.
- `supabase/migrations/`: the `site_stats` view and the Realtime broadcast (RLS explained in the file).
- `PRODUCT.md`: product facts the design relies on. `DESIGN.md` is written once a direction is chosen.
- `/lab/a`, `/lab/b`: two design prototypes (noindex). Removed once a direction is chosen.

## Routes

`/` English, `/es` Spanish, `/cv` and `/es/cv`. `/en/*` redirects to the unprefixed URL.
