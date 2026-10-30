import { defineConfig, devices } from "@playwright/test";

/**
 * Päästä päähän -testit rakennettua sivustoa vastaan (tests/e2e).
 *
 * Testit ajetaan `dist`-kansiosta `vite preview` -palvelimella, eivät dev-palvelimella: näin ne
 * näkevät saman esirenderöidyn HTML:n, ohjaussäännöt ja sitemapin kuin Cloudflare. Aja ensin
 * `npm run build`. Kaksi leveyttä: puhelin 390 px ja työpöytä 1280 px.
 *
 * Lomakkeet eivät koskaan lähetä oikeaa pyyntöä: tests/e2e/fixtures.ts korvaa /api/contact-vastauksen
 * jokaisessa testissä (page.route). Esikatselupalvelimella ei ole Pages-funktioita, joten pyyntö ei
 * edes voisi mennä perille, mutta mock on ensisijainen suoja.
 *
 * E2E_BASE_URL (esim. https://pintanen.fi) ajaa samat testit julkaistua sivustoa vastaan ilman omaa
 * palvelinta (.github/workflows/e2e-julkaisun-jalkeen.yml). Silloin fixtures.ts katkaisee lisäksi kaikki
 * muut /api/-pyynnöt ja Google Analyticsin, ja dist/sitemap.xml haetaan kohteesta ennen ajoa.
 */
const PORT = 4173;
const REMOTE_URL = process.env.E2E_BASE_URL?.replace(/\/+$/, "");

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never" }], ["json", { outputFile: "e2e-tulos/tulos.json" }]]
    : [["list"]],
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: REMOTE_URL ?? `http://127.0.0.1:${PORT}`,
    trace: "retain-on-failure",
    locale: "fi-FI",
    timezoneId: "Europe/Helsinki",
    colorScheme: "light",
  },
  projects: [
    {
      name: "puhelin",
      use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 },
    },
    {
      name: "tyopoyta",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 },
    },
  ],
  webServer: REMOTE_URL
    ? undefined
    : {
        command: `npx vite preview --host 127.0.0.1 --port ${PORT} --strictPort`,
        url: `http://127.0.0.1:${PORT}/`,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
