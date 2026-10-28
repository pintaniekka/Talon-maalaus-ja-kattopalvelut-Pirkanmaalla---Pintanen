import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VahennysE from "@/components/vahennys/VahennysE";
import { pinnoitusPrices } from "@/data/prices";
import { hintaVahennyksenJalkeen } from "@/components/vahennys/vahennysData";

/*
 * Vähennysesimerkki (Eerik 14.10.2026: urakka 4 000 €; Eerik 28.10.2026: rivit hinta, työn osuus, vähennys ja
 * hinta vähennyksen jälkeen) laskee samalla säännöllä kuin hintalaskuri ja hintakortit: työn osuus 80 %,
 * siitä 40 %, enintään 2 100 €, omavastuuta ei vähennetä (Eerik 26.10.2026). Omavastuu kerrotaan esimerkin alla.
 */
describe("kotitalousvähennyksen esimerkkilaskelma", () => {
  it("näyttää 4 000 € → 3 200 € → −1 280 € → 2 720 € ja kertoo omavastuun alla", () => {
    render(
      <MemoryRouter>
        <VahennysE />
      </MemoryRouter>,
    );
    expect(screen.getByText("4 000 €")).toBeInTheDocument();
    expect(screen.getByText("3 200 €")).toBeInTheDocument();
    expect(screen.getByText("−1 280 €")).toBeInTheDocument();
    expect(screen.getByText("2 720 €")).toBeInTheDocument();
    expect(screen.getByText("Hinta vähennyksen jälkeen")).toBeInTheDocument();
    expect(screen.queryByText("Omavastuu")).not.toBeInTheDocument();
    expect(screen.queryByText("Materiaalit")).not.toBeInTheDocument();
    expect(screen.getByText(/Omavastuu 150 € vuodessa, jos et ole käyttänyt sitä muihin töihin\./)).toBeInTheDocument();
  });

  it("käyttää samaa kaavaa kuin hintakorttien alk.-luvut", () => {
    expect(hintaVahennyksenJalkeen(4000)).toBe(2720);
    for (const card of pinnoitusPrices.cards) {
      expect(hintaVahennyksenJalkeen(card.normalMin)).toBe(card.afterFrom);
    }
  });
});
