// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { onRequest, isAllowedOrigin, toCrmServiceKey } from "../../functions/api/contact";

const ENV = { RESEND_API_KEY: "test-resend", LEAD_INTAKE_SECRET: "test-lead" };
const ORIGIN = "https://pintanen.fi";

const call = (body: unknown, init: { origin?: string | null; method?: string; env?: Record<string, string> } = {}) => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (init.origin !== null) headers.Origin = init.origin ?? ORIGIN;
  const method = init.method ?? "POST";
  const request = new Request("https://pintanen.fi/api/contact", {
    method,
    headers,
    body: method === "POST" ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
  });
  return onRequest({ request, env: init.env ?? ENV });
};

const valid = { name: "Testi Henkilö", phone: "040 123 4567", email: "testi@example.com", service: "tiilikatto, puhdistus", message: "Rivi 1\nRivi <2>", address: "Katu 1, 33100", city: "Tampere" };

describe("lomakefunktio /api/contact", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockImplementation(async () => new Response(JSON.stringify({ id: "x" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("hylkää väärän tai puuttuvan originin ennen mitään muuta", async () => {
    expect((await call(valid, { origin: "https://evil.example" })).status).toBe(403);
    expect((await call(valid, { origin: null })).status).toBe(403);
    expect((await call(valid, { origin: "https://pintanen.fi.evil.example" })).status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sallii tuotannon, www:n, localhostin ja Pages-esikatselut, ei Lovablea", () => {
    expect(isAllowedOrigin("https://pintanen.fi")).toBe(true);
    expect(isAllowedOrigin("https://www.pintanen.fi")).toBe(true);
    expect(isAllowedOrigin("http://localhost:8080")).toBe(true);
    expect(isAllowedOrigin("https://abc123.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev")).toBe(true);
    expect(isAllowedOrigin("https://x.lovable.app")).toBe(false);
    expect(isAllowedOrigin("https://muu-projekti.pages.dev")).toBe(false);
  });

  it("vastaa OPTIONS-pyyntöön ja hylkää muut metodit", async () => {
    const options = await call(null, { method: "OPTIONS" });
    expect(options.status).toBe(204);
    expect(options.headers.get("Access-Control-Allow-Origin")).toBe(ORIGIN);
    expect((await call(null, { method: "GET" })).status).toBe(405);
  });

  it("honeypot: vastaa onnistuneesti mutta ei lähetä mitään", async () => {
    const res = await call({ ...valid, website: "http://spam.example" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("tarkistaa kentät ennen kuin salaisuuksia tarvitaan", async () => {
    const noSecrets = { env: {} };
    expect((await call({ ...valid, name: " " }, noSecrets)).status).toBe(400);
    expect((await call({ name: "A", phone: "", email: "" }, noSecrets)).status).toBe(400);
    expect((await call({ name: "A", email: "ei-osoite" }, noSecrets)).status).toBe(400);
    expect((await call("{rikki", noSecrets)).status).toBe(400);
    expect((await call("x".repeat(25_000), noSecrets)).status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("ilman Resend-avainta ei lähetä mitään ja kertoo puhelinnumeron", async () => {
    const res = await call(valid, { env: {} });
    expect(res.status).toBe(500);
    expect((await res.json()).error).toContain("040 964 0066");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("lähettää sähköpostin Resendillä ja liidin CRM:ään", async () => {
    const res = await call(valid);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const calls = Object.fromEntries(fetchMock.mock.calls.map(([url, init]) => [url as string, init as RequestInit]));
    const mail = calls["https://api.resend.com/emails"];
    expect((mail.headers as Record<string, string>).Authorization).toBe("Bearer test-resend");
    const mailBody = JSON.parse(mail.body as string);
    expect(mailBody.from).toBe("Pintanen.fi <noreply@pintanen.fi>");
    expect(mailBody.to).toEqual(["myynti@pintanen.fi"]);
    expect(mailBody.reply_to).toBe("testi@example.com");
    expect(mailBody.subject).toBe("Tarjouspyyntö: Testi Henkilö – Tiilikaton pinnoitus, Katon puhdistus");
    expect(mailBody.html).toContain("Rivi 1<br>Rivi &lt;2&gt;");
    expect(mailBody.html).toContain("Katu 1, 33100, Tampere");

    const crm = calls["https://app.pintanen.fi/api/public/vastaanota-liidi"];
    expect((crm.headers as Record<string, string>).Authorization).toBe("Bearer test-lead");
    expect(JSON.parse(crm.body as string)).toEqual({
      nimi: "Testi Henkilö",
      puhelin: "040 123 4567",
      sahkoposti: "testi@example.com",
      osoite: "Katu 1, 33100",
      kaupunki: "Tampere",
      palvelu: "tiilikatto",
      kuvaus: "Rivi 1\nRivi <2>",
    });
  });

  it("hintalaskurin liidi saa oman otsikon", async () => {
    await call({ name: "A", phone: "040", service: "ulkomaalaus", priceEstimate: "5 000 – 6 000 €", calculatorDetails: "Pohja 120 m²" });
    const mail = fetchMock.mock.calls.find(([url]) => url === "https://api.resend.com/emails")!;
    const body = JSON.parse((mail[1] as RequestInit).body as string);
    expect(body.subject).toBe("Hintalaskuri: A – Ulkomaalaus");
    expect(body.reply_to).toBeUndefined();
    expect(body.html).toContain("5 000 – 6 000 €");
  });

  it("CRM-virhe ei kaada lomaketta: sähköposti lähtee ja vastaus on onnistunut", async () => {
    fetchMock.mockImplementation(async (url: string) =>
      url.includes("app.pintanen.fi") ? new Response("virhe", { status: 500 }) : new Response("{}", { status: 200 }),
    );
    expect((await call(valid)).status).toBe(200);

    fetchMock.mockImplementation(async (url: string) => {
      if (url.includes("app.pintanen.fi")) throw new Error("verkkovirhe");
      return new Response("{}", { status: 200 });
    });
    expect((await call(valid)).status).toBe(200);
  });

  it("Resend-virhe palauttaa virheen, jotta lomake ei väitä lähetyksen onnistuneen", async () => {
    fetchMock.mockImplementation(async (url: string) =>
      url.includes("resend.com") ? new Response("nope", { status: 422 }) : new Response("{}", { status: 200 }),
    );
    const res = await call(valid);
    expect(res.status).toBe(502);
    expect((await res.json()).error).toBe("Sähköpostin lähetys epäonnistui");
  });

  it("palveluavaimet muunnetaan CRM:n muotoon", () => {
    expect(toCrmServiceKey("puhdistus")).toBe("katon_puhdistus");
    expect(toCrmServiceKey("Arviokäynti")).toBe("muu");
    expect(toCrmServiceKey("ulkomaalaus, tiilikatto")).toBe("ulkomaalaus");
  });
});
