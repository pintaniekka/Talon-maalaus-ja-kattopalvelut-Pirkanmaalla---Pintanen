import fs from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { test, expect, sitemapPaths, pathSlug, open } from "./fixtures";

/**
 * Axe-ajo jokaiselle sitemapin sivulle molemmilla leveyksillä. Tulokset kirjoitetaan
 * test-results/axe/<projekti>/<sivu>.json (CI lataa ne artefaktiksi). Testi kaatuu vain
 * vakavista (critical, serious) löydöksistä, jotka eivät ole tiedostossa tests/e2e/axe-sallitut.json.
 * Lievät (moderate, minor) kirjataan raporttiin docs/saavutettavuus-2026-10-28.md.
 */
const allowed: Record<string, string> = fs.existsSync(path.resolve("tests/e2e/axe-sallitut.json"))
  ? JSON.parse(fs.readFileSync(path.resolve("tests/e2e/axe-sallitut.json"), "utf-8"))
  : {};

for (const route of sitemapPaths()) {
  test(`axe ${route}`, async ({ page, contact }, testInfo) => {
    await open(page, route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();

    const outDir = path.resolve("test-results/axe", testInfo.project.name);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(
      path.join(outDir, `${pathSlug(route)}.json`),
      JSON.stringify(
        {
          route,
          project: testInfo.project.name,
          violations: results.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            help: v.help,
            helpUrl: v.helpUrl,
            nodes: v.nodes.slice(0, 10).map((n) => ({ target: n.target, html: n.html.slice(0, 300), summary: n.failureSummary })),
            count: v.nodes.length,
          })),
          incomplete: results.incomplete.map((v) => ({ id: v.id, impact: v.impact, count: v.nodes.length })),
        },
        null,
        2,
      ),
    );

    const serious = results.violations.filter((v) => (v.impact === "critical" || v.impact === "serious") && !(v.id in allowed));
    expect(
      serious.map((v) => `${v.id} (${v.impact}, ${v.nodes.length} kpl): ${v.help}`),
      `vakavia saavutettavuuslöydöksiä sivulla ${route}`,
    ).toEqual([]);
  });
}
