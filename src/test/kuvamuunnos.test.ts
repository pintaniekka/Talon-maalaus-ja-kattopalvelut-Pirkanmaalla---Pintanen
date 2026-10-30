import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { alkuperaiset } from "@/data/alkuperaiset";
import { getResponsiveSrcSet, kuvamuunnosKaytossa, kuvamuunnosUrl } from "@/lib/storage";

const KUVAT = path.resolve(__dirname, "../../public/images");

describe("Cloudflaren kuvamuunnos", () => {
  it("on päällä vain Cloudflaren tuotantobuildissa", () => {
    expect(kuvamuunnosKaytossa({ CF_PAGES_BRANCH: "main" })).toBe(true);
    expect(kuvamuunnosKaytossa({ CF_PAGES_BRANCH: "claude/jotain" })).toBe(false);
    expect(kuvamuunnosKaytossa({})).toBe(false);
    expect(kuvamuunnosKaytossa({ CF_PAGES_BRANCH: "main", KUVAMUUNNOS: "0" })).toBe(false);
    expect(kuvamuunnosKaytossa({ KUVAMUUNNOS: "1" })).toBe(true);
  });

  it("muunnososoite osoittaa alkuperäiseen saman domainin kuvaan", () => {
    expect(kuvamuunnosUrl("talon-maalaus-esimerkki", 800)).toBe(
      "/cdn-cgi/image/width=800,quality=82,format=auto,fit=scale-down,onerror=redirect/images/alkuperaiset/talon-maalaus-esimerkki.jpg"
    );
  });

  it("testeissä ja esikatseluissa käytetään WebP-varakokoja", () => {
    const nimi = alkuperaiset[0];
    expect(getResponsiveSrcSet(nimi)).toContain(`/images/Pictures-800/${nimi}-800.webp 800w`);
    expect(getResponsiveSrcSet(nimi)).not.toContain("/cdn-cgi/");
  });

  it.each(alkuperaiset)("%s: alkuperäinen ja kaikki WebP-koot löytyvät", (nimi) => {
    expect(fs.existsSync(path.join(KUVAT, "alkuperaiset", `${nimi}.jpg`))).toBe(true);
    for (const w of [400, 600, 800, 1200]) {
      expect(fs.existsSync(path.join(KUVAT, `Pictures-${w}`, `${nimi}-${w}.webp`))).toBe(true);
    }
  });
});
