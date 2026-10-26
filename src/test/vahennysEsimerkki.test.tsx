import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VahennysE from "@/components/vahennys/VahennysE";

/*
 * Hintasivujen vähennysesimerkki (Eerik 14.10.2026: urakka 4 000 €, materiaalit 1 000 €) laskee samalla
 * säännöllä kuin hintalaskuri: 40 % työn osuudesta, enintään 2 100 €, omavastuuta ei vähennetä
 * (Eerik 26.10.2026). Omavastuu kerrotaan esimerkin alla.
 */
describe("kotitalousvähennyksen esimerkkilaskelma", () => {
  it("näyttää 1 200 € ilman omavastuuriviä ja kertoo omavastuun alla", () => {
    render(
      <MemoryRouter>
        <VahennysE />
      </MemoryRouter>,
    );
    expect(screen.getByText("4 000 €")).toBeInTheDocument();
    expect(screen.getByText("3 000 €")).toBeInTheDocument();
    // 40 % työstä ja lopputulos ovat nyt sama luku, koska omavastuuta ei vähennetä.
    expect(screen.getAllByText("1 200 €")).toHaveLength(2);
    expect(screen.queryByText("Omavastuu")).not.toBeInTheDocument();
    expect(screen.queryByText("1 050 €")).not.toBeInTheDocument();
    expect(screen.getByText(/Omavastuu 150 € vuodessa, jos et ole käyttänyt sitä muihin töihin\./)).toBeInTheDocument();
  });
});
