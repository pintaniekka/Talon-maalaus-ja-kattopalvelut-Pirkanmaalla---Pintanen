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
    // Kelluvat osat (chat-nappi, sivureunan nappi, alapalkki) peitetään: ne eivät kuulu sivun sisältöön
    // ja niiden sijainti riippuu vierityksestä koko sivun kuvassa.
    const mask = [page.getByRole("button", { name: "Avaa chat" }), page.getByRole("navigation", { name: "Mobiilitoiminnot" })];
    await expect(page).toHaveScreenshot(file, { fullPage: true, mask });
  });
}
