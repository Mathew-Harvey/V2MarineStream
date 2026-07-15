# Existing Site Audit — MarineStream (V2MarineStream)

Audited 2026-07-15 on branch `claude/portfolio-website-redesign-2rkvqx`.

## 1. Stack

| Layer | What is in use |
|---|---|
| Framework | Astro 5.13 (static output, `build.format: "file"`, zero JS framework, no integrations) |
| Language | Astro components + TypeScript data modules (`src/data/*.ts`), strict tsconfig via `astro/tsconfigs/strict` |
| Styling | One hand-written global stylesheet, `src/styles/global.css` (1,059 lines), CSS custom properties, no Tailwind, no preprocessor |
| Fonts | Inter from Google Fonts (weights 400 to 700) |
| Content | Astro content collection `blog` (6 markdown posts) with zod schema; Decap CMS at `/admin` via Netlify git-gateway for editing posts |
| Hosting | Netlify (`netlify.toml`, Node 22, publishes `dist/`), Netlify Identity widget loaded on every page, Netlify Forms (`public/forms.html`, contact page) |
| Domain | `https://www.marinestream.com.au` |

## 2. Structure and pages

- `src/layouts/BaseLayout.astro`, head, SEO/OG tags, fonts, Netlify Identity script.
- `src/layouts/SiteLayout.astro`, BaseLayout + Header + Footer.
- Components: `Header.astro` (logo, dropdown nav with hover and click handling), `Footer.astro`, `PageHero.astro` (dark band + wave divider, used on every inner page), `ServiceGrid.astro`.
- Pages: home, about, news (blog listing), blog/[slug], contact, contact-success, privacy, 9 service pages under `/services/*`, and 5 legacy `/sales/*` pages that duplicate services content (Astro redirects plus Netlify redirects already map sales → services).
- Data: `src/data/navigation.ts` is the single source for the services nav and the tools menu. `sales.ts` appears vestigial. `tools.ts` is a one-line stub.
- Static islands in `public/` that are linked from the nav and must keep working:
  - `/tools/ims-species-guide/` (15 MB self-contained app)
  - `/interactive-tools/hullCalc.html` and `/interactive-tools/bfmpGen.html`
  - `/core-pages/rov-autoconnect.html`
  - `public/scripts/` and `public/styles/` serve those static tools (hero-framework.js, ms-v2-chrome.js, etc.). None of these scripts are referenced by the Astro pages; they belong to the legacy V1 pages kept under `public/`.

## 3. Current visual language

- Palette: brand orange `#ff6600` on near-black `#111111` and white, blue `#1e40af` reserved for links. Franmarine-style all-caps headings, orange eyebrow kickers, short orange accent rules, a wave SVG divider under each hero.
- Imagery is almost absent. The home hero is one background JPG under a 90 percent black gradient; most pages are text-only. The only photos in use live in `public/images/photos/` (10 files, several are low-grade PNG screenshots).
- Home page is 11 stacked text sections with no photography, no case-study proof, and repeated "About us" content.

## 4. What is worth keeping

- Astro static stack, content collections, and Netlify pipeline. Fast, free of framework lock-in, and well suited to a photo-led marketing site (Astro has first-class `<Image>`/`<Picture>` optimisation we are not yet using).
- The IA and URL map (redirects are already in place and indexed). Header/footer component structure and `navigation.ts` as the nav source of truth.
- Decap CMS blog workflow and the 6 existing posts.
- The standalone tools in `public/`, linked, self-contained, and out of scope to rebuild.
- Accessibility basics already present: skip link, aria-expanded nav, semantic sections.

## 5. What is dated or weak

- Visually text-heavy and photo-poor; the work itself (Navy vessels, ROVs, divers, filtration units) is invisible. For a company whose credibility is field work, this is the biggest gap.
- `global.css` mixes tokens, layout, and page-specific rules in one 1,059-line file; workable but should be extended, not fought.
- Images are unoptimised static `public/` files (no responsive sizes, no AVIF/WebP, some heavy PNGs).
- Duplicate `/sales/*` page sources still build real pages that shadow the redirects (Astro renders the .astro files; the config redirect only covers the bare paths). They should be removed or left as thin redirects, flagged before deletion.
- Netlify Identity widget loads on every page for the tiny admin use case, a render-blocking third-party script on the critical path.
- The wave divider and uppercase-everything treatment reads mid-2010s corporate; typography has no display contrast (Inter only, single weight axis in practice).

## 6. Constraints

- Stay on Astro + Netlify (locked in by hosting, redirects, Decap CMS, and the static tools). No case made for changing stack; the redesign should be a reskin plus new sections and image pipeline on the existing framework.
- Keep every existing URL working (SEO redirects are live).
- Keep the static tools and `/admin` untouched.
- Brand: MarineStream orange `#ff6600` is the established brand accent (matches logo) and should survive the redesign; the photo-derived palette needs to harmonise with it rather than replace it.

## 7. Recommendation

Redesign in place: extend `global.css` tokens, rework layouts/components, introduce Astro's built-in image optimisation for the new photography, add gallery/case-study sections. No new framework, no new build tooling.
