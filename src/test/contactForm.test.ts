import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { submitContactForm, formErrorMessage, GENERIC_FORM_ERROR } from "@/lib/contactForm";

// fetch korvataan testissä: mitään ei lähetetä oikeaan palveluun.
const fetchMock = vi.fn();

describe("submitContactForm", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("lähettää lomakkeen tiedot osoitteeseen /api/contact", async () => {
    const result = await submitContactForm({
      name: " Testi Henkilö ",
      phone: "040 123 4567",
      email: "",
      service: "tiilikatto",
      message: "Viesti",
      address: "Katu 1, 33100",
      city: "Tampere",
      website: "",
    });
    expect(result).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/contact");
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe("application/json");
    expect(JSON.parse(init.body as string)).toMatchObject({
      name: "Testi Henkilö",
      phone: "040 123 4567",
      service: "tiilikatto",
      message: expect.stringMatching(/^Viesti\n\nLähde: /),
      address: "Katu 1, 33100",
      city: "Tampere",
    });
  });

  it("ei lähetä mitään, jos nimi tai yhteystieto puuttuu", async () => {
    await expect(submitContactForm({ name: "", phone: "040", service: "", message: "" })).rejects.toThrow();
    await expect(submitContactForm({ name: "Testi", phone: "", email: "", service: "", message: "" })).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("välittää funktion virheilmoituksen kutsujalle", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ error: "Sähköpostin lähetys epäonnistui" }), { status: 502 }));
    await expect(
      submitContactForm({ name: "Testi", phone: "040 1", service: "", message: "" }),
    ).rejects.toThrow("Sähköpostin lähetys epäonnistui");
  });

  it("validointivirheestä näytetään kävijälle sen oma viesti, ei yleistä virhettä (auditointi osa 2, löydös 1)", async () => {
    const errors: string[] = [];
    for (const payload of [
      { name: "Testi", phone: "", email: "", service: "", message: "" },
      { name: "Testi", phone: "", email: "ei-osoite", service: "", message: "" },
    ]) {
      try {
        await submitContactForm(payload);
      } catch (err) {
        errors.push(formErrorMessage(err));
      }
    }
    expect(errors).toEqual(["Anna puhelinnumero tai sähköposti", "Virheellinen sähköposti"]);
    expect(formErrorMessage(new Error("Sähköpostin lähetys epäonnistui"))).toBe("Sähköpostin lähetys epäonnistui");
    expect(formErrorMessage("x")).toBe(GENERIC_FORM_ERROR);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("käsittelee vastauksen, joka ei ole JSONia", async () => {
    fetchMock.mockResolvedValue(new Response("<html>virhe</html>", { status: 500 }));
    await expect(
      submitContactForm({ name: "Testi", phone: "040 1", service: "", message: "" }),
    ).rejects.toThrow("Lähetys epäonnistui (500)");
  });
});
