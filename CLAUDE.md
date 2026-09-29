# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/lead-gen website for Pintanen Oy, a roof-coating/cleaning and house-painting company in Pirkanmaa, Finland (pintanen.fi). It's a Vite + React + TypeScript SPA, built with shadcn-ui and Tailwind, originally scaffolded and still partly managed via [Lovable](https://lovable.dev) (see `.lovable/plan/*` for past change specs and `lovable-tagger` in the Vite plugins). Content and UI copy are in Finnish.

The site is deployed as a static SPA to GitHub Pages behind the `pintanen.fi` custom domain (see `CNAME`). On every push to `main`, `.github/workflows/sync-to-old.yml` force-pushes the repo to a `paivitys-lovablesta` branch on a second, older repo (`Pintaniekka/Talon-maalaus-ja-kattopalvelut-Pirkanmaalla---Pintanen`) — this only runs when `github.repository == 'Pintaniekka/easy-web-start-62'`.

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

When adding or renaming a route, the route list must also be mirrored in `vite-plugin-spa-routes.ts` (`getAllRoutes()`), which copies `dist/index.html` into every route's directory at build time so GitHub Pages serves 200s instead of 404s for client-side routes. The two lists (App.tsx routes and the plugin's route list) are maintained by hand and must stay in sync.

Per-city copy (SEO titles/descriptions, intro text, local "hook" paragraphs) lives alongside the city definitions in `src/data/cityData.ts`, `areaCityContent.ts`, `cityNeighborhoods.ts`, `faqData.ts`, and `testimonialsData.ts` — these are large content tables, not logic; page components pull from them via slug lookups (`getCityBySlug`, `getAreaCityContent`, etc.).

**Images are always served from a fixed Supabase Storage bucket**, never bundled locally or made relative. `src/lib/storage.ts` hardcodes `FIXED_SUPABASE_URL` for the `fndkkgfpsgghvewvoysr` Supabase project/`images` bucket — the file's own comment warns not to change this constant or make paths relative, since images must load the same way in every environment. Use `getStorageUrl`, `getResponsiveSrc`, and `getResponsiveSrcSet` (not the deprecated `getMobileImageUrl`) when referencing new images, and render them through `OptimizedImage`/`ResponsiveSupabaseImage` components rather than raw `<img>`.

**Supabase** (`src/integrations/supabase/`) is used both for image storage and a `send-contact-email` edge function (`supabase/functions/send-contact-email/index.ts`) backing the contact form. `client.ts` is marked "automatically generated. Do not edit it directly" (Lovable's Supabase integration regenerates it); the actual Supabase URL/key come from `VITE_SUPABASE_URL`/`VITE_SUPABASE_PUBLISHABLE_KEY` in `.env`, separate from the fixed image-storage URL above.

**SEO** is handled per-page via the `SEO` component (`src/components/SEO.tsx`), which sets title/description/canonical/OG tags through `react-helmet-async`, defaulting to Pintanen's site-wide title/description when a page doesn't override them.

**Build output**: `vite.config.ts` manually chunks vendor bundles (`vendor-react`, `vendor-motion`, `vendor-ui`) and layers two custom plugins on top of the React/SWC plugin: `vite-plugin-spa-routes.ts` (static route mirroring, described above) and `vite-plugin-async-css.ts` (rewrites Vite's injected CSS `<link>` tags to load asynchronously via the `media="print"` trick, with a `<noscript>` fallback, for production builds only). Most page components are lazy-loaded via `lazyWithRetry` (`src/lib/lazyWithRetry.ts`) rather than plain `React.lazy`.

## Conventions

- `@/*` resolves to `src/*` (configured in both `vite.config.ts` and `vitest.config.ts`).
- `@typescript-eslint/no-unused-vars` is explicitly turned off in `eslint.config.js`.
- UI primitives under `src/components/ui/` are shadcn-ui components; domain components live flat under `src/components/`, with `maalaus/` and `pinnoitus/` subfolders for service-specific pieces.
