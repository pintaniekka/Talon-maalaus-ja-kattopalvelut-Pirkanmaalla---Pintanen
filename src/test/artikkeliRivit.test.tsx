import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ArtikkeliRivit from "@/components/ArtikkeliRivit";
import { articles, getPublishedArticles, isPublished } from "@/data/articles";
import { authors } from "@/data/authors";

/*
 * Ohut artikkelirivi (Eerik 29.10.2026): sama komponentti kaikissa lyhyissä artikkelilistoissa. Oikea määrä
 * rivejä oikeassa järjestyksessä, otsikko ei käytä linkin väriä, metarivissä vain etunimi, jonossa oleva ei näy,
 * rivi on yksi linkki, eikä repossa ole toista artikkelilistan renderöintiä.
 */
const renderoi = (props: Parameters<typeof ArtikkeliRivit>[0] = {}) =>
  render(
    <MemoryRouter>
      <ArtikkeliRivit {...props} />
    </MemoryRouter>,
  );

describe("ArtikkeliRivit", () => {
  it("renderöi neljä uusinta julkaistua oikeassa järjestyksessä, kukin yhtenä linkkinä", () => {
    const { container } = renderoi({ title: "Uusimmat artikkelit" });
    const odotetut = getPublishedArticles().slice(0, 4);
    const rivit = [...container.querySelectorAll("ul > li")];
    expect(rivit.length).toBe(4);
    rivit.forEach((li, i) => {
      const linkit = li.querySelectorAll("a");
      expect(linkit.length).toBe(1);
      expect(linkit[0]).toHaveAttribute("href", `/artikkelit/${odotetut[i].slug}/`);
      expect(li.querySelector("[data-otsikko]")?.textContent).toBe(odotetut[i].title);
    });
  });

  it("kategoriat ja excludeSlug rajaavat samoin kuin ennen", () => {
    const { container } = renderoi({ categories: ["raha"], max: 2 });
    const raha = getPublishedArticles().filter((a) => a.category === "raha").slice(0, 2);
    expect([...container.querySelectorAll("ul > li a")].map((a) => a.getAttribute("href"))).toEqual(raha.map((a) => `/artikkelit/${a.slug}/`));
    const uusin = getPublishedArticles()[0];
    const toinen = renderoi({ title: "Lue myös", excludeSlug: uusin.slug }).container;
    expect(toinen.querySelector(`a[href="/artikkelit/${uusin.slug}/"]`)).toBeNull();
    expect(toinen.querySelectorAll("ul > li").length).toBe(4);
  });

  it("otsikko on tumma eikä käytä linkin väriä; metarivissä vain etunimi", () => {
    const { container } = renderoi();
    const a = getPublishedArticles()[0];
    const otsikko = container.querySelector("[data-otsikko]")!;
    expect(otsikko.className).toContain("text-[#0b1a33]");
    expect(otsikko.className).toContain("visited:text-[#0b1a33]");
    expect(otsikko.className).not.toContain("text-primary");
    const meta = container.querySelector("[data-meta]")!.textContent!;
    const etunimi = authors[a.author].name.split(" ")[0];
    expect(meta.startsWith(`${etunimi} · `)).toBe(true);
    expect(meta).not.toContain(authors[a.author].name);
    expect(meta).toMatch(/· \d{1,2}\.\d{1,2}\.\d{4} · \d+ min$/);
    expect(container.querySelector("ul > li img")).toHaveAttribute("sizes", "120px");
  });

  it("jonossa oleva artikkeli ei näy millään rajauksella", () => {
    const jonossa = articles.filter((a) => !isPublished(a));
    expect(jonossa.length).toBeGreaterThan(0);
    for (const props of [{}, { categories: ["katto", "maalaus", "raha"] as const, max: 100 }]) {
      const { container } = renderoi(props as Parameters<typeof ArtikkeliRivit>[0]);
      for (const a of jonossa) expect(container.querySelector(`a[href="/artikkelit/${a.slug}/"]`)).toBeNull();
    }
  });

  it("repossa ei ole toista lyhyen artikkelilistan renderöintiä", () => {
    const src = path.resolve(__dirname, "..");
    const tiedostot: string[] = [];
    const kerää = (dir: string) => {
      for (const f of fs.readdirSync(dir)) {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) kerää(p);
        else if (/\.(ts|tsx)$/.test(f) && !p.includes(`${path.sep}test${path.sep}`)) tiedostot.push(p);
      }
    };
    kerää(src);
    // getPublishedArticles saa olla vain datassa, listaussivulla ja jaetussa rivikomponentissa.
    const sallitut = ["data/articles.ts", "data/routes.ts", "pages/Artikkelit.tsx", "components/ArtikkeliRivit.tsx"].map((p) => path.resolve(src, p));
    const kayttajat = tiedostot.filter((p) => fs.readFileSync(p, "utf-8").includes("getPublishedArticles("));
    expect(kayttajat.filter((p) => !sallitut.includes(p))).toEqual([]);
    expect(fs.existsSync(path.resolve(src, "components/RelatedArticles.tsx"))).toBe(false);
    for (const p of tiedostot) {
      const s = fs.readFileSync(p, "utf-8");
      expect(s.includes("RelatedArticles"), `${p} viittaa RelatedArticlesiin`).toBe(false);
      // Oma lista = silmukka julkaistuista artikkeleista, jossa rakennetaan /artikkelit/<slug>/-linkkejä.
      if (!sallitut.includes(p)) expect(/\.map\(\(a\) =>[\s\S]{0,400}\/artikkelit\/\$\{a\.slug\}/.test(s), `${p} renderöi oman artikkelilistan`).toBe(false);
    }
  });
});
