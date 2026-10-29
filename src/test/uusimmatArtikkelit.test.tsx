import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RelatedArticles from "@/components/RelatedArticles";
import { articles, getPublishedArticles, isPublished } from "@/data/articles";

/*
 * Etusivun "Uusimmat artikkelit" (29.10.2026, leveät rivit): kolme uusinta julkaistua oikeassa järjestyksessä,
 * jonossa olevat eivät näy, jokainen rivi on yksi linkki oikeaan osoitteeseen. Kompakti ulkoasu säilyy muualla.
 */
const renderoi = (variant: "kompakti" | "leveat") =>
  render(
    <MemoryRouter>
      <RelatedArticles title="Uusimmat artikkelit" variant={variant} />
    </MemoryRouter>,
  );

describe("Uusimmat artikkelit (leveät rivit)", () => {
  it("näyttää kolme uusinta julkaistua artikkelia uusimmasta vanhimpaan, kukin yhtenä linkkinä", () => {
    const { container } = renderoi("leveat");
    const odotetut = getPublishedArticles().slice(0, 3);
    expect(odotetut.length).toBe(3);
    const rivit = [...container.querySelectorAll("ul > li")];
    expect(rivit.length).toBe(3);
    rivit.forEach((li, i) => {
      const linkit = li.querySelectorAll("a");
      expect(linkit.length).toBe(1);
      expect(linkit[0]).toHaveAttribute("href", `/artikkelit/${odotetut[i].slug}/`);
      expect(li.textContent).toContain(odotetut[i].title);
    });
    for (let i = 1; i < odotetut.length; i++) expect(odotetut[i - 1].publishedAt >= odotetut[i].publishedAt).toBe(true);
  });

  it("jonossa oleva artikkeli ei näy", () => {
    const { container } = renderoi("leveat");
    const jonossa = articles.filter((a) => !isPublished(a));
    expect(jonossa.length).toBeGreaterThan(0);
    for (const a of jonossa) expect(container.querySelector(`a[href="/artikkelit/${a.slug}/"]`)).toBeNull();
  });

  it("leveällä rivillä on aihetagi, metarivi ja kuva rivin päädyssä; kompakti ulkoasu pysyy erillisenä", () => {
    const leveat = renderoi("leveat").container;
    const rivi = leveat.querySelector("ul > li > a")!;
    expect(rivi.textContent).toMatch(/KATTO|SEINÄ|HINTA/);
    expect(rivi.textContent).toMatch(/\d{1,2}\.\d{1,2}\.\d{4} · \d+ min/);
    expect(rivi.querySelector("img")).toHaveAttribute("sizes", "(min-width: 768px) 190px, 96px");
    expect(leveat.querySelector("section")).toHaveAttribute("data-variant", "leveat");

    const kompakti = renderoi("kompakti").container;
    expect(kompakti.querySelector("section")).toHaveAttribute("data-variant", "kompakti");
    expect(kompakti.querySelector("ul > li > a img")).toHaveAttribute("sizes", "64px");
    expect(kompakti.textContent).not.toMatch(/KATTO|SEINÄ|HINTA/);
  });
});
