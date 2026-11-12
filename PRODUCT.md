# PRODUCT.md — im-pro.tech

Durable product truth for the im-pro.tech website. Visual decisions live in
`DESIGN.md` (written after the build). Copy lives in `src/content/site.ts`.
Nothing here may be invented: if a fact is missing it is a `TODO:` in `site.ts`.

## What it is

This is the **im-pro.tech business site**, not a personal CV site. There is no
`/cv` page.

im-pro.tech is the tech company of Rafael Andrés Forero Alvarado (Rafa), software
engineer, improviser and actor-trainer in Bogotá, Colombia (UTC-5). It was founded in May 2025 after leaving Unity
Technologies. It runs all the technology for a small group of Bogotá improv
companies and for his family's agri-business. Its main product is Open Impro,
an open-source ticketing and community platform for independent improv
companies (Next.js + Supabase).

## Audiences and focus

The page shares **what im-pro.tech is doing in tech right now**: the systems it
builds and runs, the clients it runs them for, and Open Impro. It speaks to all
three audiences at once, none of them first:

- **Improv and theater companies** that might want im-pro.tech to run their
  tech. Scene: phone, arriving from Instagram.
- **The improv community**, who should recognise the people behind it.
- **Engineers and recruiters**, who find the proof in the case study, the
  live Supabase counter and the stack, without the page being aimed at them.

## Surfaces and modes

- `/` and `/es`: single scrolling page. Mode: **Persuade** (the visitor should
  believe the engineering is real and get in touch).

## Primary actions

1. Read the work (services, clients, the Inspira case study, Open Impro).
2. Contact (email, `TODO` in `site.ts`).

## Proof we have (and only this)

- Inspira Impro Fest ticketing: ~300 tickets, Mercado Pago, QR at the door.
- Open Impro: 3 member companies, each ~100 tickets/month; public repo planned
  for end of 2026.
- Founder: ex-Unity Senior Lead Developer Support Engineer (2021 – 2025).

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
