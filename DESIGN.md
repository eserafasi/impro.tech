# DESIGN.md — im-pro.tech

Written from the built site (direction B, "the Barichara door"). Tokens live in
`src/app/globals.css`; section styles in `src/app/[lang]/site.css`. Copy never lives in components: see `src/content/site.ts`.

## The idea

Barichara's añil-painted doors hold the systems; its sandstone and tapia hold
the people. Every technical section is a door (an añil panel with an inset
molding line); every human section sits on stone. Reading down the page you
walk past a wall: stone, door, stone, door.

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

- Lighthouse mobile: Accessibility 100, Best Practices 100, SEO 100, Performance
  95–99 (median of 3 runs on `/` and `/es`: 95).
- CLS 0 on every page.
- Hallmark sloplint: 0 FAIL apart from gate 58 (words per screen), left open on
  purpose because the incident report is the owner's copy; Reflex
  waivers are recorded in the CSS stamp.
