import { describe, it, expect, vi, beforeEach } from "vitest";

// Supabase-asiakas korvataan testissä: mitään ei lähetetä oikeaan palveluun.
const invoke = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { functions: { invoke: (...args: unknown[]) => invoke(...args) } },
}));

import { submitContactForm } from "@/lib/contactForm";

describe("submitContactForm", () => {
  beforeEach(() => {
    invoke.mockReset();
    invoke.mockResolvedValue({ data: { success: true }, error: null });
  });

  it("lähettää lomakkeen tiedot send-contact-email-funktiolle", async () => {
    await submitContactForm({
      name: " Testi Henkilö ",
      phone: "040 123 4567",
      email: "",
      service: "tiilikatto",
      message: "Viesti",
      address: "Katu 1, 33100",
      city: "Tampere",
      website: "",
    });
    expect(invoke).toHaveBeenCalledTimes(1);
    const [fn, options] = invoke.mock.calls[0] as [string, { body: Record<string, unknown> }];
    expect(fn).toBe("send-contact-email");
    expect(options.body).toMatchObject({
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
    expect(invoke).not.toHaveBeenCalled();
  });

  it("välittää funktion virheen kutsujalle", async () => {
    invoke.mockResolvedValue({ data: { error: "Sähköpostin lähetys epäonnistui" }, error: null });
    await expect(
      submitContactForm({ name: "Testi", phone: "040 1", service: "", message: "" }),
    ).rejects.toThrow("Sähköpostin lähetys epäonnistui");
  });
});
