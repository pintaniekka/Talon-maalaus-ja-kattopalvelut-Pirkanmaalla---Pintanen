# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/lead-gen website for Pintanen Oy, a roof-coating/cleaning and house-painting company in Pirkanmaa, Finland (pintanen.fi). It's a Vite + React + TypeScript SPA, built with shadcn-ui and Tailwind, whose pages are prerendered to static HTML at build time. Content and UI copy are in Finnish. The site was originally built with Lovable; since October 2026 it has no Lovable or Supabase dependency: images are local files and the contact form is a Cloudflare Pages Function.

## Repository and deployment

- **One repository**: `Pintaniekka/Talon-maalaus-ja-kattopalvelut-Pirkanmaalla---Pintanen` (public). Local clone: `~/GitHub/pintanen-fi`. Keep the clone **outside** `~/Documents`: iCloud sync creates "file 2" duplicates there, also inside `.git`, which breaks git.
- **Cloudflare Pages** project `talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen` is connected to this repo by Git integration. A merge to `main` deploys to `https://pintanen.fi`. Every other branch gets a preview at `https://<branch>.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev` (served with `x-robots-tag: noindex`).
- **Workflow**: branch `claude/…` → PR to `main` → wait for the "Cloudflare Pages" check → verify the preview → merge → verify production. `python3 scripts/verify_live.py <url> <dir>` followed by `python3 scripts/verify_dist.py <dir>` checks all sitemap pages without JavaScript (status, head values, links, images, llms.txt, schema).
- Cloudflare installs dependencies with **bun** (`bun.lock`). When dependencies change, update both `bun.lock` and `package-lock.json`, or the Cloudflare build fails on the frozen lockfile.
- `public/_redirects` holds real server-side 301s; `public/_headers` sets security and cache headers; `public/_routes.json` limits Pages Functions to `/api/*`.
- The old working repo `Pintaniekka/easy-web-start-62` and its sync workflow are retired. Do not push there.
- Secrets (`RESEND_API_KEY`, `LEAD_INTAKE_SECRET`) live in the Pages project settings. Never print, paste or commit secret values; the owner runs secret-related commands himself.

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

## Architecture

**Routing is generated from city data, not hand-written per page.** `src/data/cityData.ts` exports `cities` (8 "full-service" cities with dedicated pinnoitus/puhdistus/maalaus subpages) and `allCities` (24 cities total, all get a unified area page). `src/App.tsx` maps over these arrays to produce `<Route>` entries for:
- 3 static service pages for the Pirkanmaa region (`/tiilikaton-pinnoitus-pirkanmaa`, `/katon-puhdistus-pirkanmaa`, `/talon-maalaus-pirkanmaa`)
- Per-city service pages for full-service cities (`KattopalvelutPinnoitusCity`, `KattopalvelutPuhdistusCity`, `TalonMaalausCity`, parameterized by `citySlug` prop, not a router param)
- Per-city area pages for all 24 cities via one shared template, `ServiceAreaPage`
- A block of `<Navigate replace>` redirects from old URL patterns (`/kattopalvelut/...`, `/alue/:city`, `/hinnat/...`) to the new slugs above

**When adding or renaming a route, add it to `src/data/routes.ts` as well.** That file is the single source for `vite-plugin-spa-routes.ts`, which at build time copies `dist/index.html` into every route's directory (so static hosting serves 200s for deep links), strips the home-only hero preload (`data-home-only` in `index.html`) from subpage copies, writes `dist/404.html` (= index.html, so unknown paths render the SPA's Finnish 404 page with a real 404 status) and generates `dist/sitemap.xml`. `src/test/routes.test.ts` fails if a literal `path="..."` in `App.tsx` is missing from `routes.ts`. There is no hand-maintained `public/sitemap.xml` any more.

Per-city copy (SEO titles/descriptions, intro text, local "hook" paragraphs) lives alongside the city definitions in `src/data/cityData.ts`, `areaCityContent.ts`, `cityNeighborhoods.ts`, `faqData.ts`, and `testimonialsData.ts` — these are large content tables, not logic; page components pull from them via slug lookups (`getCityBySlug`, `getAreaCityContent`, etc.).

**Images are the site's own files in `public/images/`**, served at `/images/…` (30-day cache, see `public/_headers`). Folders: `Pictures-400|800|1200|1500/` (responsive WebP, file name `<base>-<width>.webp`), `Pictures-200/` (portraits), `Eerik-maalaa/` (home hero, AVIF), `Icons/`, plus logo, favicon and map in the root. `src/lib/storage.ts` builds the URLs: use `getStorageUrl`, `getResponsiveSrc` and `getResponsiveSrcSet`, and render through `OptimizedImage`/`ResponsiveImage` rather than raw `<img>`. Social tags, JSON-LD and the image sitemap need absolute URLs: use `toAbsoluteUrl`. To add an image, add the 400, 800 and 1200 px files and refer to it by base name; `src/test/seo.test.ts` fails if a size is missing. New photos: Eerik drops originals in `~/GitHub/uudet-kuvat/`; run `python3 scripts/lisaa_kuva.py <original> <base-name>` to generate the 400/800/1200(/1500) WebP sizes (strips EXIF/location, handles HEIC), then reference the image by base name.

**Page metadata lives in `src/data/seo.ts`** (title + description per route, `getRouteSeo(path)`, hero image per template). Pages spread it into `<SEO>`, and the build plugin writes the same values into each route's static HTML (title, description, canonical, og/twitter tags, hero-image preload with srcset) so readers that do not run JavaScript see page-specific data. `src/main.tsx` removes those static tags before React renders, so the rendered DOM never has duplicates. The plugin also generates `sitemap.xml` (articles carry `lastmod`), `image-sitemap.xml` (each page's real hero image) and `llms.txt`. `public/_headers` sets security and cache headers on Cloudflare Pages. `ServiceSchema` adds `Service` JSON-LD on service and city pages; `SEO` adds a two-level `BreadcrumbList`; the business entity in `index.html` has `@id` `https://pintanen.fi/#yritys`. `RelatedArticles` links service and price pages to published articles. `src/test/seo.test.ts` and `routes.test.ts` guard all of this (every route has metadata, unique titles, hard-coded internal links resolve).

**SEO** is handled per-page via the `SEO` component (`src/components/SEO.tsx`), which sets title/description/canonical/OG tags through `react-helmet-async`, defaulting to Pintanen's site-wide title/description when a page doesn't override them. Pass `noindex` for pages that must not be indexed (404).

**Forms & privacy**: every lead form (`ServiceContactSection`, `DesktopQuoteDrawer`, `ChatLeadForm`, `ChatPriceCalculator`) goes through `submitContactForm` in `src/lib/contactForm.ts`, which POSTs JSON to `/api/contact`. That is a Cloudflare Pages Function, `functions/api/contact.ts`: it emails `myynti@pintanen.fi` via Resend (reply-to = the customer) and forwards the lead to the CRM (`https://app.pintanen.fi/api/public/vastaanota-liidi`, bearer `LEAD_INTAKE_SECRET`). A CRM failure never fails the form (the email still goes out and the error is logged); a Resend failure returns an error so the form does not claim success. The function only accepts requests whose `Origin` is pintanen.fi, localhost or this project's `*.pages.dev` previews, and silently drops submissions where the hidden honeypot field `website` is filled (`HoneypotField` in `src/components/FormPrivacyNote.tsx`). Checks run in the order origin → method → body → honeypot → fields → secrets, so rejections can be tested where no secrets exist. The function deploys with the site; there is nothing to deploy separately. **Never send a real test submission without the owner's permission**: it reaches the real sales inbox and the CRM. Test with rejected requests instead (wrong origin → 403, honeypot → silent success, missing name → 400); `src/test/contactFunction.test.ts` covers the rest with `fetch` mocked. Forms show `FormPrivacyNote` linking to `/tietosuoja` (`src/pages/Tietosuoja.tsx`); keep that page accurate if data processing changes. Fonts are self-hosted via `@fontsource/*` imports in `src/main.tsx`. The site makes no requests to third-party hosts.

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

**Writing style for articles** (Finnish): write as the tradesman whose byline is on the article, in first person plural ("teemme", "annamme", "meillä"), in plain, direct Finnish. Avoid formulaic AI phrasing: no "tässä artikkelissa käydään läpi", no "ei vain X, vaan Y", no rhetorical set-ups, no padded summaries. For search engines and AI answers: the lead and `KeyPoints` answer the title's question directly with concrete numbers; `h2`s are phrased as the questions people search for; prices go in a `Table`; every article ends with `ArticleFaq`, and externally sourced facts are listed with `Sources`. Mention Pirkanmaa where it is natural. `ArticleKit` also exports `Table` and `Sources`.

**Fact rule for article content**: never invent anything about Pintanen Oy. Company facts (prices, warranty, process, materials, durations) must come from what the site already states (`src/data/faqData.ts`, the price pages, the calculators). General facts (tax rules, paint manufacturers' limits) must be checked against a source on the web before writing; if a fact cannot be verified, leave it out. Cadence: one article per week. Content mix: about 65 % roof topics, 35 % walls/facades; no further roof-cleaning articles. After the painting season ends, titles use the coming season's year.
