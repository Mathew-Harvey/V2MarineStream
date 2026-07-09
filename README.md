# MarineStream™ Website (V2)

Punchy marketing site for [marinestream.com.au](https://www.marinestream.com.au) — enabling partners to deliver **IMO-compliant biofouling inspections and cleans**.

Built with **Astro**, hosted on **Netlify**, blog edited via **Decap CMS**.

## Quick start

```bash
npm install
npm run dev
```

Site: http://localhost:4321  
CMS (local): run `npx decap-server` in another terminal, then open http://localhost:4321/admin/

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |

## Content / CMS

- Blog posts live in `src/content/blog/*.md`
- Decap admin UI: `/admin/` (after Netlify Identity + Git Gateway are enabled)
- Media uploads go to `public/images/blog/`

### Netlify CMS setup (after first deploy)

1. Enable **Identity** in the Netlify site settings
2. Enable **Git Gateway** under Identity → Services
3. Invite editors under Identity → Invite users
4. Open `https://<your-site>/admin/` and sign in

## Contact form

The contact page uses **Netlify Forms** (`name="contact"`). Submissions appear in the Netlify dashboard under Forms.

## Stack notes

- Design cues from [franmarine.com.au](https://www.franmarine.com.au/) (navy / orange / topo sections)
- Old `/core-pages/*` URLs redirect via `netlify.toml`
- A division of [Franmarine](https://www.franmarine.com.au/)
