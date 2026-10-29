import { describe, it, expect } from "vitest";
import { calculateRidgeSealPrice, calculateRoofPrice, HARJATIIVISTE_HINTA } from "@/lib/priceCalc";
import { calculatorQuestions } from "@/components/laskuri/PriceWizard";

/*
 * Harjatiiviste laskurissa (Eerik 29.10.2026): 15 €/m pinnoituksen yhteydessä, 25 €/m erikseen, harjan pituus
 * kysytään vain jos tiiviste puuttuu, ja tulos on euromäärä eriteltynä (ei metrihintaa).
 */
describe("harjatiiviste", () => {
  it("laskee hinnan harjan pituudesta", () => {
    expect(HARJATIIVISTE_HINTA).toEqual({ pinnoituksenYhteydessa: 15, erikseen: 25 });
    expect(calculateRidgeSealPrice(12)).toBe(180);
    expect(calculateRidgeSealPrice(12, true)).toBe(300);
    expect(calculateRidgeSealPrice(0)).toBe(0);
    expect(calculateRidgeSealPrice(-5)).toBe(0);
  });

  it("ei muuta pinnoituksen peruskaavaa", () => {
    expect(calculateRoofPrice(200, "normaali")).toEqual({ min: 3600, max: 4200 });
  });

  it("kysyy harjatiivisteen kyllä/ei jyrkkyyden jälkeen, pituus kentästä samassa vaiheessa", () => {
    const qs = calculatorQuestions.pinnoitus;
    const ridge = qs.find((q) => q.key === "ridgeSeal");
    expect(ridge?.options?.map((o) => o.value)).toEqual(["kylla", "ei"]);
    expect(qs.some((q) => q.key === "ridgeMeters")).toBe(false);
    // Harjatiiviste kysytään jyrkkyyden jälkeen ja ennen vettä ja sähköä.
    const keys = qs.map((q) => q.key);
    expect(keys.indexOf("ridgeSeal")).toBe(keys.indexOf("slope") + 1);
    expect(keys.indexOf("utilities")).toBe(keys.indexOf("ridgeSeal") + 1);
    // Maalauksen laskuri ei kysy harjatiivistettä.
    expect(calculatorQuestions.maalaus.some((q) => q.key === "ridgeSeal")).toBe(false);
  });
});
