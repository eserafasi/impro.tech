# PRODUCT.md — im-pro.tech

Durable product truth for the im-pro.tech website. Visual decisions live in
`DESIGN.md` (written after the build). Copy lives in `src/content/site.ts`.
Nothing here may be invented: if a fact is missing it is a `TODO:` in `site.ts`.

## What it is

The personal-company site of Rafael Andrés Forero Alvarado (Rafa), software
engineer, improviser and actor-trainer in Bogotá, Colombia (UTC-5).

im-pro.tech is his tech company, founded May 2025 after leaving Unity
Technologies. It runs all the technology for a small group of Bogotá improv
companies and for his family's agri-business. Its main product is Open Impro,
an open-source ticketing and community platform for independent improv
companies (Next.js + Supabase).

## Audiences, in priority order

1. **Technical recruiters and engineers** (now: Supabase Support). In under 60
   seconds: an experienced developer-support engineer who builds and runs real
   production apps on Supabase and Postgres; May 2025 → now is serious
   engineering work, not a gap. Scene: laptop, skimming between tabs.
2. **Improv and theater companies** that might want im-pro.tech to run their
   tech. Scene: phone, arriving from Instagram.
3. **The improv community**, who should recognise the human side.

## Surfaces and modes

- `/` and `/es`: single scrolling page. Mode: **Persuade** (the visitor should
  believe the engineering is real and reach the CV or contact).
- `/cv` and `/es/cv`: HTML CV, print-friendly, PDF download. Mode: **Read**.

## Primary actions

1. Recruiter: open the CV (`/cv`) or read the incident case study.
2. Company: contact (email, `TODO` in `site.ts`).

## Proof we have (and only this)

- Inspira Impro Fest ticketing: ~300 tickets, Mercado Pago, QR at the door.
- WhatsApp bot incident (`wa-777-tickets`): ~100 conversations/month, Grok
  usage limit hit, ~1 hour downtime until a deterministic bot shipped.
- Open Impro: 3 member companies, each ~100 tickets/month; public repo planned
  for end of 2026.
- Unity (Jun 2021 – May 2025): led 6 engineers; +9% CSAT and 21% faster
  response/solve with an AI-assisted Zendesk plugin; zero-downtime migration for
  ~500k users.
- vLex (2020–2021): Jira automation cut tier-3 tickets by 25%, satisfaction 96%.

## Absent (never fake)

Client logos (placeholders until supplied), testimonials, photos, screenshots,
contact email, URLs for Cocoloco / Lugoschol / Omi Farm.

## Voice

Warm, precise, a little playful, never corporate. English default, full
Spanish (Colombian, *tú*).

## Constraints

- Lighthouse ≥ 95 on all four categories (mobile). AA contrast. No CLS.
- Light and dark are both first-class.
- Only the Supabase anon key in the browser; never service_role.
- No analytics, no cookies.
