import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { render } from "@testing-library/react";
import { avifKuvat } from "@/data/avifkuvat";
import { avifVastine, getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import OptimizedImage from "@/components/OptimizedImage";
import { heroPreload } from "@/data/seo";

const KUVAT = path.resolve(__dirname, "../../public/images");
const avifillinen = avifKuvat[0];

describe("AVIF-kuvat (30.10.2026)", () => {
  it("luettelossa on kuvia", () => {
    expect(avifKuvat.length).toBeGreaterThan(0);
  });

  it.each(avifKuvat)("%s: AVIF on jokaisessa srcsetin koossa, jossa WebP on", (nimi) => {
    for (const w of [400, 600, 800, 1200]) {
      const webp = path.join(KUVAT, `Pictures-${w}`, `${nimi}-${w}.webp`);
      if (!fs.existsSync(webp)) continue;
      expect(fs.existsSync(path.join(KUVAT, `Pictures-${w}`, `${nimi}-${w}.avif`))).toBe(true);
    }
  });

  it("AVIF-vastine säilyttää leveydet ja vaihtaa vain päätteen", () => {
    const srcset = getResponsiveSrcSet(avifillinen);
    const avif = avifVastine(srcset);
    expect(avif).toBe(srcset.replace(/\.webp/g, ".avif"));
    expect(avifVastine(getResponsiveSrc(avifillinen))).toBe(`/images/Pictures-1200/${avifillinen}-1200.avif`);
  });

  it("kuvalle ilman AVIF:ia ei tule vastinetta", () => {
    expect(avifVastine(getResponsiveSrcSet("tiilikaton-pinnoitus-olematon-kuva"))).toBeUndefined();
    expect(avifVastine(undefined)).toBeUndefined();
  });

  it("OptimizedImage lisää AVIF-lähteen <picture>-elementtiin ja pitää WebP:n varakuvana", () => {
    const { container } = render(
      <OptimizedImage src={getResponsiveSrc(avifillinen)} srcSet={getResponsiveSrcSet(avifillinen)} alt="" sizes="100vw" />,
    );
    const source = container.querySelector('picture > source[type="image/avif"]');
    expect(source?.getAttribute("srcset")).toContain(".avif 400w");
    expect(source?.getAttribute("sizes")).toBe("100vw");
    expect(container.querySelector("picture > img")?.getAttribute("srcset")).toContain(".webp 400w");
  });

  it("OptimizedImage ilman AVIF:ia on pelkkä <img>", () => {
    const base = "tiilikaton-pinnoitus-olematon-kuva";
    const { container } = render(<OptimizedImage src={getResponsiveSrc(base)} srcSet={getResponsiveSrcSet(base)} alt="" />);
    expect(container.querySelector("picture")).toBeNull();
    expect(container.querySelector("img")).not.toBeNull();
  });

  it("pääkuvan preload osoittaa AVIF:iin, jos kuvalla on AVIF, ja kuvasitemapin href pysyy WebP:nä", () => {
    const p = heroPreload({ base: avifillinen, sizes: "100vw" });
    expect(p.preload.type).toBe("image/avif");
    expect(p.preload.imagesrcset).toContain(".avif");
    expect(p.href).toMatch(/\.webp$/);
    const ilman = heroPreload({ base: "tiilikaton-pinnoitus-olematon-kuva", sizes: "100vw" });
    expect(ilman.preload.type).toBe("image/webp");
  });
});
