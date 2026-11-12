# DESIGN.md — im-pro.tech

Written from the built site (direction B, "the Barichara door"). Tokens live in
`src/app/globals.css`; section styles in `src/app/[lang]/site.css`. Copy never lives in components: see `src/content/site.ts`.

## The idea

**Doors onto the stage.** The page is a Barichara wall: sandstone, with añil
doors. Every door opens onto a stage. The doors are the systems im-pro.tech
builds; the photographs behind them are the shows those systems make possible.

- **Signature:** the hero is the owner's Maestro photo seen through an añil
  doorway. On load the two door leaves slide apart (750 ms, once, CSS only).
  With `prefers-reduced-motion` the door is simply open. It costs about 0.7 s of
  Lighthouse LCP (see Quality bar).
- **One scroll pattern:** the services section is a sticky diptych (the 777
  stage photo pinned, the three services scrolling past); their artifacts
  fade in with a CSS scroll timeline where supported.
- **Pictures:** ten owner photos (Camilo for 777; Gio and Kim for Proyecto
  Cocoloco) and four captures of the live sites (777impro.art,
  inspiraimprofest.art, openimpro.tech, omifarmcolombia.com), all in
  `src/assets` and mapped in `src/content/media.ts`. Alt text, captions and
  credits live in `site.ts`.

## Sections

1. Hero: Poster through the doorway.
2. Tickets, bots and dashboards: sticky diptych.
3. Four stages and a farm: a rail of client cards led by their site or a photo.
4. ~300 tickets, one festival: showcase of the Inspira site (desktop and phone) and figures.
5. Open Impro: split with the live planet graph.
6. Built on Supabase: añil bento led by the live ticket counter.
7. Who's behind it: split with Rafa on Maestro and the stage/support-queue line.
8. Contact: the night door, with photo credits.

## Colour

Committed posture: añil covers a large share of the page on purpose.

| Role | Light (day) | Dark (the door at night) |
| --- | --- | --- |
| paper | sandstone `oklch(84% 0.035 78)` | añil night `oklch(23% 0.075 262)` |
| paper-2 (band) | tapia `oklch(78.5% 0.042 70)` | warm stone well `oklch(28% 0.03 60)` |
| ink | `oklch(23% 0.025 55)` | `oklch(93% 0.02 85)` |
| accent | añil `oklch(36% 0.13 262)` | ochre `oklch(80% 0.08 85)` |
| note (people) | door green `oklch(36% 0.07 160)` | `oklch(82% 0.08 160)` |
| door | añil `oklch(36% 0.13 262)` | `oklch(17% 0.06 262)` |
| door-well (code, footer) | `oklch(22% 0.08 262)` | `oklch(13% 0.04 262)` |

Rules: no literal colours outside the `:root` token block (the OG image is the
one exception, because Satori needs hex). Dark mode is designed, not inverted.
All text pairs pass WCAG AA (Lighthouse accessibility 100).

## Type

- **Alegreya** (display and people text): headings at 600, body at 400.
- **Alegreya Sans** (tech text inside doors, nav, labels): 400 and 700.
- **JetBrains Mono** for code and the TODO placeholders only.
- No tracked capitals, no eyebrows, no italic flourishes, no mid-dot strings.
- Labels are the body face a step smaller, sentence case.

## Material

- **Door**: `background: --color-door`, inset double line
  (`box-shadow: inset 0 0 0 8px door, inset 0 0 0 9px door-line`). Panels
  inside a door repeat the molding at a smaller step.
- **Well**: darker añil for code (`.well`), with an "Illustrative" or
  "Simplified" pill when the content is not production data.
- **Stone rules**: 3px `--color-rule` between list rows (clients, services,
  timeline), 1px inside.
- Radius 2px everywhere (doors are carpentry, not pills); pills only for tags.
- Shadows: none for depth; only the inset molding lines.

## Motion

Almost none, on purpose: hover colour shifts (220 ms, ease-out) and a 1px press
on buttons. Smooth scrolling for in-page links. All of it is disabled under
`prefers-reduced-motion`. The live counter updates its number in place
(`aria-live="polite"`).

## Layout

- Container 1200px, gutters 64 / 24 / 16px.
- Section gap 128 / 96 / 72px.
- The hero fills the first screen on desktop: text left (7/12), door right (5/12).

## Slots

`[data-slot]` boxes are dashed placeholders for real material (photos,
screenshots). Each carries a visible `TODO:` from `site.ts`.

## Quality bar (checked at the last build)

- Lighthouse mobile (median of 3 runs): Accessibility, Best Practices and SEO
  100; Performance 91 on `/` and 94 on `/es` with the door animation, 93–96
  without it.
- CLS 0 on every page.
- Hallmark sloplint (render tier): 0 FAIL; waivers for 23, 26b and 82 recorded in the CSS stamp.
