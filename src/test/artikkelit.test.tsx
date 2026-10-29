import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Artikkelit, { ArtikkelitListaus, KERRALLA } from "@/pages/Artikkelit";
import { articles, getPublishedArticles, isPublished, type ArticleMeta } from "@/data/articles";
import { getRouteSeo } from "@/data/seo";

/*
 * Artikkelilistaus (29.10.2026): uusin nostona, tärkeät navyllä, kaikki julkaistut HTML:ssä ennen "Näytä lisää",
 * jonossa olevat eivät näy. Kuvat eivät lataudu jsdomissa, joten tarkistetaan rakenne ja luokat.
 */

const tee = (i: number, extra: Partial<ArticleMeta> = {}): ArticleMeta => ({
  slug: `testi-${i}`,
  title: `Testiartikkeli ${i}`,
  description: "x".repeat(140),
  lead: "Ingressi.",
  category: i % 3 === 0 ? "raha" : i % 2 === 0 ? "maalaus" : "katto",
  author: "eerik",
  publishedAt: `2026-01-${String(i).padStart(2, "0")}`,
  readingMinutes: 5,
  heroImage: "tiilikaton-pinnoitus-ylojarvi-keltainen-talo-jalkeen",
  heroAlt: "",
  ...extra,
});

const renderoi = (lista: ArticleMeta[]) =>
  render(
    <MemoryRouter>
      <ArtikkelitListaus artikkelit={lista} />
    </MemoryRouter>,
  );

describe("artikkelilistaus", () => {
  it("nosto on uusin julkaistu artikkeli ja se on navy keltaisella tagilla", () => {
    // Annetaan lista sekaisin: komponentti järjestää julkaisupäivän mukaan.
    const lista = [tee(3), tee(12, { tarkea: true }), tee(7)];
    const { container } = renderoi(lista);
    const nosto = container.querySelector('[data-kortti="nosto"]')!;
    expect(nosto).toHaveAttribute("href", "/artikkelit/testi-12/");
    expect(nosto.className).toContain("bg-navy");
    // 12 % 3 === 0 → luokka raha.
    expect(within(nosto as HTMLElement).getByText("UUSIN · HINTA")).toHaveAttribute("data-tagi", "keltainen");
  });

  it("tärkeät artikkelit ovat navy-kortteja keltaisella tagilla, muut valkoisia pastellitagilla", () => {
    const lista = Array.from({ length: 10 }, (_, i) => tee(i + 1, { tarkea: i + 1 === 2 }));
    const { container } = renderoi(lista);
    const navyt = [...container.querySelectorAll('li[data-kortti="navy"] a')];
    const valkoiset = [...container.querySelectorAll('li[data-kortti="valkoinen"] a')];
    expect(navyt.map((a) => a.getAttribute("href"))).toEqual(["/artikkelit/testi-2/"]);
    expect(valkoiset.length).toBe(8);
    for (const a of navyt) {
      expect(a.className).toContain("bg-navy");
      expect(a.querySelector("[data-tagi]")).toHaveAttribute("data-tagi", "keltainen");
    }
    for (const a of valkoiset) {
      expect(a.className).toContain("bg-card");
      expect(a.querySelector("[data-tagi]")).toHaveAttribute("data-tagi", "pastelli");
    }
  });

  it("kaikki julkaistut artikkelit ovat HTML:ssä jo ennen Näytä lisää, ja nappi paljastaa loput", () => {
    const lista = Array.from({ length: 12 }, (_, i) => tee(i + 1));
    const { container } = renderoi(lista);
    const linkit = () => [...container.querySelectorAll('a[href^="/artikkelit/testi-"]')];
    expect(linkit().length).toBe(12);
    const piilossa = () => linkit().filter((a) => a.closest("li")?.classList.contains("hidden")).length;
    expect(piilossa()).toBe(12 - KERRALLA);
    const nappi = screen.getByRole("button", { name: `Näytä lisää artikkeleita (${12 - KERRALLA})` });
    fireEvent.click(nappi);
    expect(piilossa()).toBe(0);
    expect(screen.queryByRole("button", { name: /Näytä lisää/ })).toBeNull();
  });

  it("suodatin piilottaa kortit luokalla ja nostaa valitun luokan uusimman; aria-pressed seuraa tilaa", () => {
    const lista = Array.from({ length: 6 }, (_, i) => tee(i + 1));
    const { container } = renderoi(lista);
    const raha = screen.getByRole("button", { name: /Hinta ja verotus/ });
    expect(raha).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(raha);
    expect(raha).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /Kaikki/ })).toHaveAttribute("aria-pressed", "false");
    // raha-artikkelit: 3 ja 6 → uusin 6 on nosto, 3 keskikortti; muut neljä piilossa mutta HTML:ssä.
    expect(container.querySelector('[data-kortti="nosto"]')).toHaveAttribute("href", "/artikkelit/testi-6/");
    expect(container.querySelectorAll('a[href^="/artikkelit/testi-"]').length).toBe(6);
    expect(container.querySelectorAll("li.hidden").length).toBe(4);
  });

  it("sivu näyttää vain julkaistut: jonossa olevat eivät ole linkkeinä eivätkä luvuissa", () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/artikkelit/"]}>
          <Artikkelit />
        </MemoryRouter>
      </HelmetProvider>,
    );
    const julkaistut = getPublishedArticles();
    const jonossa = articles.filter((a) => !isPublished(a));
    expect(jonossa.length).toBeGreaterThan(0);
    for (const a of jonossa) expect(container.querySelector(`a[href="/artikkelit/${a.slug}/"]`)).toBeNull();
    for (const a of julkaistut) expect(container.querySelector(`a[href="/artikkelit/${a.slug}/"]`)).not.toBeNull();
    expect(screen.getByRole("button", { name: `Kaikki ${julkaistut.length}` })).toBeInTheDocument();
    expect(container.querySelector("form")).toBeNull();
    expect(container.textContent).not.toMatch(/Pyydä|Laske hinta/);
  });

  it("tärkeitä on enintään kolmannes julkaistuista ja ne ovat olemassa olevia artikkeleita", () => {
    const julkaistut = getPublishedArticles();
    const tarkeat = julkaistut.filter((a) => a.tarkea);
    expect(tarkeat.length).toBeGreaterThan(0);
    expect(tarkeat.length).toBeLessThanOrEqual(Math.ceil(julkaistut.length / 3));
  });

  it("/artikkelit saa hero-kuvan preloadia varten", () => {
    expect(getRouteSeo("/artikkelit")?.hero?.base).toBe("talon-maalaus-ja-tiilikaton-pinnoitus-tampere-puutalo-jalkeen");
  });
});
