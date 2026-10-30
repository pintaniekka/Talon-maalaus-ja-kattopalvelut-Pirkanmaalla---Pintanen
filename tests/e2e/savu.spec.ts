import { test, expect } from "./fixtures";

/**
 * Savutesti: nopea tarkistus ennen julkaisua niille PR:ille, jotka eivät koske lomakkeita, laskuria,
 * chattia tai muita kriittisiä toimintoja (.github/workflows/ci.yml, työ e2e, tila "savu").
 * Jokainen sivupohja aukeaa, React ottaa esirenderöidyn sivun haltuun ilman virheitä, H1 näkyy ja
 * chat-nappi latautuu. Raskas ajo (toiminnot + axe kaikille sivuille) tehdään julkaisun jälkeen.
 */
const SIVUT: { polku: string; h1: RegExp }[] = [
  { polku: "/", h1: /./ },
  { polku: "/tiilikaton-pinnoitus-pirkanmaa/", h1: /pinnoitus/i },
  { polku: "/talon-maalaus-pirkanmaa/", h1: /maalaus/i },
  { polku: "/tiilikaton-pinnoitus-tampere/", h1: /Tampere/ },
  { polku: "/talon-maalaus-tampere/", h1: /Tampere/ },
  { polku: "/maalauspalvelut-nokia/", h1: /Nokia/ },
  { polku: "/tiilikaton-pinnoitus-hinta-pirkanmaa/", h1: /hinta/i },
  { polku: "/artikkelit/", h1: /./ },
  { polku: "/kokemuksia/", h1: /./ },
];

for (const { polku, h1 } of SIVUT) {
  test(`savu ${polku}`, async ({ page, contact }) => {
    const virheet: string[] = [];
    page.on("pageerror", (e) => virheet.push(e.message));
    page.on("console", (m) => {
      // Katkaistut pyynnöt (GA, varaverkko) näkyvät "Failed to load resource" -riveinä: ne eivät ole sivun virheitä.
      if (m.type() === "error" && !/Failed to load resource/.test(m.text())) virheet.push(m.text());
    });
    const vastaus = await page.goto(polku);
    expect(vastaus?.status(), `HTTP-tila ${polku}`).toBe(200);
    // Sama odotus kuin fixtures.ts:n open(): React on korvannut esirenderöidyn tilannekuvan.
    await expect(page.locator("[data-prerender-snapshot]")).toHaveCount(0);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(h1);
    await expect(page.getByRole("button", { name: "Avaa chat" })).toBeVisible();
    expect(virheet, `virheitä selaimen konsolissa sivulla ${polku}`).toEqual([]);
  });
}

test("savu tuntematon polku on 404-sivu", async ({ page, contact }) => {
  const vastaus = await page.goto("/ei-tallaista-sivua-ole/");
  // vite preview palauttaa tuntemattomalle polulle 200; Cloudflare palvelee dist/404.html:n tilalla 404.
  if (process.env.E2E_BASE_URL) expect(vastaus?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sivua ei löytynyt");
});
