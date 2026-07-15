# Phase 5 — Design Direction (for approval before build)

## 1. Visual concept

**"Show the work."** A photography-led, deep-ocean design: dark navy surfaces bookend generous light content sections, the underwater cobalt-and-cyan imagery does the emotional lifting, and the established MarineStream orange stays as the single call-to-action colour. Evidence over adjectives.

## 2. Colour palette (drawn from the photos)

Extends the existing CSS custom properties in `global.css`; brand orange survives unchanged.

| Token | Hex | Use | Source photos |
|---|---|---|---|
| `--ocean-ink` | `#0A1721` | Dark section base, footer, hero underlay (replaces flat `#111111`) | GOPR shadow blues, studio blacks |
| `--ocean-deep` | `#16465F` | Dark section gradient partner, hover states on dark | GOPR3147 mid-water |
| `--brand-blue` | `#0161B2` | Links, secondary buttons, info accents (replaces `#1e40af`) | ROV -26/-27 cobalt |
| `--cyan` | `#3CB4E0` | Eyebrows/kickers on dark, data accents, focus rings on dark | GOPR highlights |
| `--teal` | `#139FA3` | Supporting accent, tags, icon strokes | SAIPEM cleaning teals |
| `--steel-100` | `#EEF2F4` | Soft section background (replaces `#f9f9f9`) | derived from steel greys |
| `--steel-300` | `#A7B3BC` | Borders, muted text on dark | DJI_0248 sea greys |
| `--steel-500` | `#616971` | Secondary text | DJI deck greys |
| `--brand-orange` | `#FF6600` | CTAs and key accents only, unchanged | matches photographed hi-vis PPE |
| `--buoy-yellow` | `#E0A728` | Rare micro-accents (stat highlights); never near orange CTAs | mooring buoys, crawlers |

Rules: orange is exclusively for actions and the accent rule; cyan/teal never used for buttons; golden-hour warmth enters only through photography.

## 3. Typography

- **Display: Space Grotesk** (Google Fonts, 500/700). Technical, slightly engineered character that matches the hardware photography; replaces all-caps Inter headings. Headings drop the all-caps treatment except eyebrows.
- **Body: Inter** (already loaded, 400/500/600). No change to reading text.
- Scale: fluid clamp() steps, h1 2.6 to 4rem, h2 1.8 to 2.4rem, h3 1.2rem, body 1rem/1.65.
- Eyebrows stay uppercase, letterspaced, but switch from orange-on-white everywhere to cyan-on-dark and orange-on-light, so orange stays scarce.

## 4. Spacing and shape

- Keep the existing token approach; extend to an 8-point scale (`--space-2xs` 0.5rem through `--space-3xl` 8rem).
- Wider max content width for photographic bands (`--max-wide: 80rem`) while text stays at the current 68/42rem measures.
- Radius 0.75rem on cards and images; hairline `--steel-300` borders instead of drop shadows on light; the wave divider retires.

## 5. Page structure (home wireframe)

1. **Hero.** Full-bleed GOPR3147 (ROV lamps beside fouled chain), gradient from `--ocean-ink` at left for legibility. Eyebrow, one-line headline, one-sentence lead, primary CTA (Contact) + secondary (Services). Slim stat strip pinned to the hero base: Navy operations, 120+ vessels, 80% less reporting time.
2. **Trust bar.** Classification society logos (ABS, BV, DNV, LR, NK) and ISO 9001/14001/45001 badges, greyscale, on white.
3. **What we do.** Three photo cards: Inspect (GOPR3144), Clean (IMG_1543), Capture (462579733). Each links to its service page.
4. **How it works.** Measure, Clean, Record flow retained from the current site, now with small authentic HUD evidence thumbnails (SAIPEM#U00a0 5 progress frame).
5. **Technology (dark band).** JCD01182 black-on-black ROV floats on `--ocean-ink`; copy on hardware plus platform. Secondary tile: _DN14990 recovery shot.
6. **Field proof (dark continues).** Case-study strip: Colins Class Clean 1, DJI_0233, DJI_0248 with short captions; links to portfolio.
7. **People.** Two-up: d5bc1e5a portrait and a short "division of Franmarine" story; link to About.
8. **Gallery.** Lazy-loaded responsive grid of the 20-strong shortlist with lightbox-free simple focus states (no JS gallery library).
9. **Closing CTA.** image000005 golden-hour band, dark scrim, single orange CTA.
10. **Footer** on `--ocean-ink`.

Inner pages: `PageHero` gains an optional photographic background (per-section image from the shortlist) with the same ink gradient; services pages each get their mapped banner image and one supporting photo. Blog/portfolio, tools, admin untouched structurally.

## 6. Imagery handling

- Shortlisted photos move into `src/assets/photos/` and render through Astro's `<Picture>` with AVIF/WebP plus responsive widths; hero preloaded, everything below the fold lazy-loaded with `decoding="async"`.
- Rotate the two sideways files (IMG_5358, processed-BF4189EF) before use; crop HUD strips off any telemetry frame used outside evidence contexts.
- Duplicates, placeholders, and the flagged outliers stay out of the build.
- `photo-review/` stays in the repo as documentation but its `source/` directory is not shipped to `public/`.

## 7. Motion and interaction

- Scroll-triggered fade/rise reveals via IntersectionObserver, 300ms, disabled under `prefers-reduced-motion`.
- Hero image: subtle 12s scale from 1.0 to 1.05, once, CSS only.
- Cards: translateY(-4px) plus border-colour shift on hover; no parallax, no carousels, no cursor effects.
- Sticky header gains a translucent `--ocean-ink` blur backdrop after scroll.

## 8. Build notes (Phase 6 scope, after approval)

- Stays on Astro 5 + Netlify; extends `global.css` tokens rather than replacing the styling approach; existing URL map, redirects, Decap CMS, and the four static tools untouched.
- The five vestigial `/sales/*.astro` page sources shadow the redirects; I propose deleting them (redirects already cover the URLs). Flagging now, will not remove without your OK.
- Netlify Identity script moves to the admin page only (performance); flagging as it changes login-from-homepage behaviour.
- Copy updated where sections change: tight, professional, Oxford-standard English, no em or en dashes as connectors.
- Preview via `npm run dev`; I will list every changed file when done.

## 9. Open questions

1. Home hero: underwater ROV story (GOPR3147, recommended) or offshore aerial (DJI_0248)?
2. May I delete the `/sales/*.astro` sources as above?
3. The Screenshot 2025-06-18 bow-crawler shot is remarkable but 545 px; do you have the original?
4. Any photos showing people or client vessels (Pacific Centurion, MED MONARCH 2, submarine) that we must not publish? I will hold the training/event set out of the build until confirmed.
