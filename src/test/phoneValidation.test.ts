import { describe, it, expect } from "vitest";
import { formatToInternational, isValidFinnishMobile, laskurinPuhelinVirhe, phoneErrorMessage, phoneProblem } from "@/lib/phoneValidation";

describe("puhelinnumeron tarkistus (31.10.2026)", () => {
  it("hyväksyy tavalliset muodot, myös +358 ja 00358", () => {
    for (const n of ["040 123 4567", "401234567", "040-1234567", "(040) 123 4567", "+358 40 123 4567", "00358401234567", "358401234567", "050 12345", "03 1234 567"]) {
      expect(isValidFinnishMobile(n), n).toBe(true);
    }
    expect(formatToInternational("+358 40 123 4567")).toBe("+358401234567");
    expect(formatToInternational("040 123 4567")).toBe("+358401234567");
    expect(formatToInternational("00358401234567")).toBe("+358401234567");
  });

  it("kertoo, mikä numerossa on vialla", () => {
    expect(phoneProblem("")).toBe("tyhja");
    expect(phoneProblem("040 abc 4567")).toBe("merkit");
    expect(phoneProblem("123")).toBe("lyhyt");
    expect(phoneProblem("0401234567890")).toBe("pitka");
    expect(phoneProblem("0000000000")).toBe("epaily");
    expect(phoneProblem("12345678")).toBe("epaily");
    expect(phoneProblem("987654321")).toBe("epaily");
    expect(phoneErrorMessage("123")).toMatch(/puuttuu numeroita/);
    expect(phoneErrorMessage("040 123 4567")).toBeNull();
  });

  it("hintalaskuri: tyhjä kenttä kerrotaan, varmasti väärä numero on aina 'Numero ei käytössä.' (Eki 31.10.2026)", () => {
    expect(laskurinPuhelinVirhe("")).toMatch(/Kirjoita puhelinnumero/);
    for (const n of ["123", "040 abc 4567", "0401234567890", "0000000000", "12345678", "0041234567"]) {
      expect(laskurinPuhelinVirhe(n), n).toBe("Numero ei käytössä.");
    }
    for (const n of ["040 123 4567", "+358 40 123 4567", "050 12345", "09 1234567", "020 123 4567"]) {
      expect(laskurinPuhelinVirhe(n), n).toBeNull();
    }
  });
});
