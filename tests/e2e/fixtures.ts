import { test as base, expect, type Page, type Request } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

/** Evästevalinnan avain (src/lib/analytics.ts). */
export const CONSENT_KEY = "pintanen-evasteet";

export interface ContactMock {
  /** Kaikki /api/contact-pyynnöt, jotka lomakkeet yrittivät lähettää (JSON-runko). */
  requests: Record<string, unknown>[];
}

/**
 * Korvaa /api/contact-vastauksen: oikeaa pyyntöä ei lähde koskaan, ei edes esikatselussa, koska liidi
 * menisi oikeaan sähköpostiin ja CRM:ään. Palauttaa saman vastauksen kuin functions/api/contact.ts.
 */
export const mockContact = async (page: Page): Promise<ContactMock> => {
  const mock: ContactMock = { requests: [] };
  await page.route("**/api/contact", async (route) => {
    const request = route.request();
    if (request.method() === "POST") {
      try {
        mock.requests.push(JSON.parse(request.postData() ?? "{}"));
      } catch {
        mock.requests.push({ raw: request.postData() });
      }
    }
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
  });
  return mock;
};

type Fixtures = {
  /** Sivu, jolla /api/contact on korvattu ja evästevalinta on jo tehty (banneri ei peitä sisältöä). */
  contact: ContactMock;
  /** Hyväksytäänkö evästeet ennen sivun latausta. Evästebannerin omat testit asettavat tämän pois. */
  consentGiven: boolean;
};

export const test = base.extend<Fixtures>({
  consentGiven: [true, { option: true }],
  contact: async ({ page, consentGiven }, provide) => {
    const mock = await mockContact(page);
    if (consentGiven) {
      await page.addInitScript((key) => {
        try {
          window.localStorage.setItem(key, "denied");
        } catch {
          /* yksityinen selaus */
        }
      }, CONSENT_KEY);
    }
    await provide(mock);
  },
});

export { expect };

/**
 * Avaa sivun ja odottaa, että React on korvannut esirenderöidyn tilannekuvan (src/main.tsx:
 * data-prerender-snapshot) ja verkko on hiljentynyt. Ennen sitä lomakkeet ja napit ovat pelkkää HTML:ää.
 */
export const open = async (page: Page, route: string) => {
  await page.goto(route);
  await expect(page.locator("[data-prerender-snapshot]")).toHaveCount(0);
  await page.waitForLoadState("networkidle");
};

/**
 * Chat-kupla avautuu 25 s kuluttua ja sulkemisen jälkeen 40 s kuluttua (src/components/ChatLeadForm.tsx).
 * Testissä ei odoteta: nämä kaksi ajastinta lyhennetään 50 ms:iin ennen sivun latausta. Playwrightin
 * keinotekoinen kello (page.clock) ei käy, koska framer-motionin poistumisanimaatiot jäävät sillä kesken.
 */
export const shortenChatTimers = async (page: Page) => {
  await page.addInitScript(() => {
    const original = window.setTimeout;
    const shortened = new Set([25_000, 40_000]);
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) =>
      original(handler, timeout !== undefined && shortened.has(timeout) ? 50 : timeout, ...args)) as typeof window.setTimeout;
  });
};

/** Sitemapin polut rakennetusta sivustosta (dist/sitemap.xml). */
export const sitemapPaths = (): string[] => {
  const file = path.resolve("dist/sitemap.xml");
  if (!fs.existsSync(file)) throw new Error("dist/sitemap.xml puuttuu: aja npm run build ennen testejä");
  const xml = fs.readFileSync(file, "utf-8");
  return [...xml.matchAll(/<loc>https:\/\/pintanen\.fi([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
};

/** Tiedostonimeksi kelpaava tunniste polusta: "/" → "etusivu", "/artikkelit/x/" → "artikkelit-x". */
export const pathSlug = (p: string): string => p.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "etusivu";

/** Odottaa, että sivu on asettunut: verkko hiljenee, fontit ladattu ja laiskat kuvat haettu. */
export const settle = async (page: Page) => {
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Vieritä loppuun ja takaisin, jotta loading="lazy"-kuvat latautuvat koko sivun kuvaan.
    const step = Math.max(400, window.innerHeight);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    window.scrollTo(0, 0);
    const images = Array.from(document.images);
    await Promise.all(
      images.map((img) =>
        img.complete ? Promise.resolve() : new Promise<void>((r) => { img.addEventListener("load", () => r(), { once: true }); img.addEventListener("error", () => r(), { once: true }); }),
      ),
    );
  });
  await page.waitForLoadState("networkidle");
};

/** Varmistaa, ettei yksikään pyyntö suuntautunut oikeaan /api/contact-osoitteeseen (mockin ohi). */
export const assertNoRealContactRequest = (requests: Request[]) => {
  const leaked = requests.filter((r) => /\/api\/contact/.test(r.url()) && !r.url().startsWith("http://127.0.0.1"));
  expect(leaked, "pyyntö yritti oikeaan /api/contact-osoitteeseen").toHaveLength(0);
};
