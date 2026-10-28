import fs from "node:fs";
import path from "node:path";
import { test, expect, sitemapPaths, pathSlug, settle } from "./fixtures";

/**
 * Koko sivun kuvakaappaus jokaisesta sitemapin sivusta kahdella leveydellä ja vertailu
 * tests/e2e/vertailukuvat/<projekti>/<sivu>.png-tiedostoon.
 *
 * Vertailukuvat otetaan vain CI:ssä Playwrightin Docker-kuvassa (fontit täsmäävät), ei paikallisesti:
 * .github/workflows/e2e.yml, workflow_dispatch-syöte "paivita-vertailukuvat". Jos sivulle ei ole vielä
 * vertailukuvaa (uusi sivu tai kuvia ei ole koskaan otettu), testi ohitetaan selkeällä viestillä
 * eikä kaadu. Päivitysajossa (--update-snapshots) kuva kirjoitetaan aina.
 */
for (const route of sitemapPaths()) {
  test(`kuva ${route}`, async ({ page, contact }, testInfo) => {
    const file = `${pathSlug(route)}.png`;
    const baseline = path.resolve("tests/e2e/vertailukuvat", testInfo.project.name, file);
    const updating = testInfo.config.updateSnapshots === "all" || testInfo.config.updateSnapshots === "changed";
    test.skip(!updating && !fs.existsSync(baseline), `vertailukuvaa ei ole: ${path.relative(process.cwd(), baseline)} (ota kuvat e2e-työn syötteellä paivita-vertailukuvat)`);

    await page.goto(route);
    await settle(page);
    // Kiinteät osat: otsake kiinnitetään sivun yläreunaan ja muut (chat-nappi, sivureunan nappi, alapalkki,
    // evästebanneri) piilotetaan. Kiinteä elementti piirtyy koko sivun kuvaan eri kohtaan joka otolla, eikä
    // kuva vakiinnu (perusajo 28.10.2026: "Failed to take two consecutive stable screenshots").
    await page.evaluate(() => {
      for (const el of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
        if (getComputedStyle(el).position !== "fixed") continue;
        if (el.tagName === "HEADER") {
          el.style.setProperty("position", "absolute", "important");
          el.style.setProperty("top", "0", "important");
        } else {
          el.style.setProperty("visibility", "hidden", "important");
        }
      }
    });
    await expect(page).toHaveScreenshot(file, { fullPage: true });
  });
}
