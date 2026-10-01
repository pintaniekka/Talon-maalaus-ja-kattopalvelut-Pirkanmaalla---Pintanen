import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { submitContactForm } from "@/lib/contactForm";

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
      message: "Viesti",
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

  it("käsittelee vastauksen, joka ei ole JSONia", async () => {
    fetchMock.mockResolvedValue(new Response("<html>virhe</html>", { status: 500 }));
    await expect(
      submitContactForm({ name: "Testi", phone: "040 1", service: "", message: "" }),
    ).rejects.toThrow("Lähetys epäonnistui (500)");
  });
});
