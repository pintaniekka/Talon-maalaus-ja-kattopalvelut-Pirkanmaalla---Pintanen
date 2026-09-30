# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/lead-gen website for Pintanen Oy, a roof-coating/cleaning and house-painting company in Pirkanmaa, Finland (pintanen.fi). It's a Vite + React + TypeScript SPA, built with shadcn-ui and Tailwind, originally scaffolded and still partly managed via [Lovable](https://lovable.dev) (see `.lovable/plan/*` for past change specs and `lovable-tagger` in the Vite plugins). Content and UI copy are in Finnish.

The site is a static SPA served behind Cloudflare at `pintanen.fi` (production responds with `server: cloudflare` and honours `public/_redirects`, so the 301s there are real server-side redirects). On every push to `main`, `.github/workflows/sync-to-old.yml` force-pushes the repo to a `paivitys-lovablesta` branch on a second, older repo (`Pintaniekka/Talon-maalaus-ja-kattopalvelut-Pirkanmaalla---Pintanen`) — this only runs when `github.repository == 'Pintaniekka/easy-web-start-62'`. The owner then opens a PR from that branch to the old repo's `main`, and production builds from there. The `CNAME` file is a leftover from GitHub Pages and is harmless.

## Commands

```sh
npm run dev          # start Vite dev server on port 8080
npm run build         # production build
npm run build:dev     # build in development mode (unminified, for debugging build output)
npm run lint           # eslint .
npm run test           # vitest run (single run)
npm run test:watch     # vitest in watch mode
```

To run a single test file: `npx vitest run src/test/example.test.ts` (or any path matching `src/**/*.{test,spec}.{ts,tsx}`). Test environment is jsdom, with `src/test/setup.ts` loaded globally (see `vitest.config.ts`).

`.npmrc` sets `engine-strict=true` and `package.json` requires Node >=18 — use a matching Node version or installs will fail.

Note: `git` on this machine currently errors via `xcode-select` because Xcode Command Line Tools aren't installed; run `xcode-select --install` if git commands fail.

## Architecture

**Routing is generated from city data, not hand-written per page.** `src/data/cityData.ts` exports `cities` (8 "full-service" cities with dedicated pinnoitus/puhdistus/maalaus subpages) and `allCities` (24 cities total, all get a unified area page). `src/App.tsx` maps over these arrays to produce `<Route>` entries for:
- 3 static service pages for the Pirkanmaa region (`/tiilikaton-pinnoitus-pirkanmaa`, `/katon-puhdistus-pirkanmaa`, `/talon-maalaus-pirkanmaa`)
- Per-city service pages for full-service cities (`KattopalvelutPinnoitusCity`, `KattopalvelutPuhdistusCity`, `TalonMaalausCity`, parameterized by `citySlug` prop, not a router param)
- Per-city area pages for all 24 cities via one shared template, `ServiceAreaPage`
- A block of `<Navigate replace>` redirects from old URL patterns (`/kattopalvelut/...`, `/alue/:city`, `/hinnat/...`) to the new slugs above

**When adding or renaming a route, add it to `src/data/routes.ts` as well.** That file is the single source for `vite-plugin-spa-routes.ts`, which at build time copies `dist/index.html` into every route's directory (so static hosting serves 200s for deep links), strips the home-only hero preload (`data-home-only` in `index.html`) from subpage copies, writes `dist/404.html` (= index.html, so unknown paths render the SPA's Finnish 404 page with a real 404 status) and generates `dist/sitemap.xml`. `src/test/routes.test.ts` fails if a literal `path="..."` in `App.tsx` is missing from `routes.ts`. There is no hand-maintained `public/sitemap.xml` any more.

Per-city copy (SEO titles/descriptions, intro text, local "hook" paragraphs) lives alongside the city definitions in `src/data/cityData.ts`, `areaCityContent.ts`, `cityNeighborhoods.ts`, `faqData.ts`, and `testimonialsData.ts` — these are large content tables, not logic; page components pull from them via slug lookups (`getCityBySlug`, `getAreaCityContent`, etc.).

**Images are always served from a fixed Supabase Storage bucket**, never bundled locally or made relative. `src/lib/storage.ts` hardcodes `FIXED_SUPABASE_URL` for the `fndkkgfpsgghvewvoysr` Supabase project/`images` bucket — the file's own comment warns not to change this constant or make paths relative, since images must load the same way in every environment. Use `getStorageUrl`, `getResponsiveSrc`, and `getResponsiveSrcSet` (not the deprecated `getMobileImageUrl`) when referencing new images, and render them through `OptimizedImage`/`ResponsiveSupabaseImage` components rather than raw `<img>`.

**Supabase** (`src/integrations/supabase/`) is used both for image storage and a `send-contact-email` edge function (`supabase/functions/send-contact-email/index.ts`) backing the contact form. `client.ts` is marked "automatically generated. Do not edit it directly" (Lovable's Supabase integration regenerates it); the actual Supabase URL/key come from `VITE_SUPABASE_URL`/`VITE_SUPABASE_PUBLISHABLE_KEY` in `.env`, separate from the fixed image-storage URL above.

**SEO** is handled per-page via the `SEO` component (`src/components/SEO.tsx`), which sets title/description/canonical/OG tags through `react-helmet-async`, defaulting to Pintanen's site-wide title/description when a page doesn't override them. Pass `noindex` for pages that must not be indexed (404).

**Forms & privacy**: every lead form (`ServiceContactSection`, `DesktopQuoteDrawer`, `ChatLeadForm`, `ChatPriceCalculator`) goes through `submitContactForm` in `src/lib/contactForm.ts` to the `send-contact-email` edge function, which emails `myynti@pintanen.fi` via Resend and forwards the lead to the CRM (`app.pintanen.fi`). The edge function only accepts requests whose `Origin` matches pintanen.fi, localhost or Lovable preview hosts, and silently drops submissions where the hidden honeypot field `website` is filled (`HoneypotField` in `src/components/FormPrivacyNote.tsx`). Forms show `FormPrivacyNote` linking to `/tietosuoja` (`src/pages/Tietosuoja.tsx`); keep that page accurate if data processing changes. Fonts are self-hosted via `@fontsource/*` imports in `src/main.tsx` (no Google Fonts requests). Changes to the edge function must be deployed separately (`supabase functions deploy send-contact-email`) — they are not part of the site build.

**Build output**: `vite.config.ts` manually chunks vendor bundles (`vendor-react`, `vendor-motion`, `vendor-ui`) and layers two custom plugins on top of the React/SWC plugin: `vite-plugin-spa-routes.ts` (static route mirroring, described above) and `vite-plugin-async-css.ts` (rewrites Vite's injected CSS `<link>` tags to load asynchronously via the `media="print"` trick, with a `<noscript>` fallback, for production builds only). Most page components are lazy-loaded via `lazyWithRetry` (`src/lib/lazyWithRetry.ts`) rather than plain `React.lazy`.

## Conventions

- `@/*` resolves to `src/*` (configured in both `vite.config.ts` and `vitest.config.ts`).
- `@typescript-eslint/no-unused-vars` is explicitly turned off in `eslint.config.js`.
- UI primitives under `src/components/ui/` are shadcn-ui components; domain components live flat under `src/components/`, with `maalaus/` and `pinnoitus/` subfolders for service-specific pieces.

## Articles (`/artikkelit`)

Articles are data-driven and deliberately text-first: no hero, no CTA buttons, no trust stats, no contact form. One shared template renders every article.

- `src/data/articles.ts` — metadata for every article (slug, title, lead, description, category, author, `publishedAt`, `updatedAt`, reading time, hero image). Must stay free of component imports: the Vite plugin reads it in Node at build time.
- `src/content/articles/<slug>.tsx` — the body, default-exported. Write plain `h2`/`h3`/`p`/`ul`/`ol`/`blockquote` plus the helpers in `src/components/article/ArticleKit.tsx` (`Figure`, `KeyPoints`, `Note`, `ArticleFaq`). Internal links are inline `<Link>`s in the prose. Do not add buttons, stat grids or forms.
- `src/content/articles/index.ts` — registers the body under its slug (lazy-loaded).
- `src/components/article/ArticleLayout.tsx` — the template: breadcrumb, category, H1, lead, byline (author, dates, reading time), hero figure, auto-generated table of contents from the body's `h2`s, prose (`.article-prose` styles in `src/index.css`), one quiet closing paragraph per category, author box, "Lue myös". Emits `Article` + `BreadcrumbList` JSON-LD.
- `src/pages/Artikkeli.tsx` serves `/artikkelit/:slug`; `src/pages/Artikkelit.tsx` lists published articles.

**Scheduling**: an article whose `publishedAt` is in the future is "queued". The build still creates its route directory, but the page renders the 404 and the list hides it until that date (Finnish time), so it goes live on its date without a new deploy. It enters `sitemap.xml` on the first build after its publish date. `src/test/routes.test.ts` checks that every article has a body file, a registry entry and valid metadata. A queued article can be read before its date at `/artikkelit/<slug>/?esikatselu=1` (rendered `noindex` with a preview banner).

**Fact rule for article content**: never invent anything about Pintanen Oy. Company facts (prices, warranty, process, materials, durations) must come from what the site already states (`src/data/faqData.ts`, the price pages, the calculators). General facts (tax rules, paint manufacturers' limits) must be checked against a source on the web before writing; if a fact cannot be verified, leave it out. Cadence: one article per week.
