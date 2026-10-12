import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ChatPriceCalculator from "@/components/ChatPriceCalculator";
import Hintalaskuri from "@/pages/Hintalaskuri";
import { calculateRoofPrice, calculateWallPrice, formatPriceRange } from "@/lib/priceCalc";
import { PHONE_ERROR_MESSAGE } from "@/lib/phoneValidation";

/*
 * Laskurit testataan ilman oikeaa lähetystä: fetch korvataan, joten mitään ei mene myynnin
 * sähköpostiin eikä CRM:ään. Kuntavalitsin (Radix Popover + cmdk) korvataan tavallisella kentällä,
 * ja framer-motion tavallisilla elementeillä, jotta jsdom riittää.
 */
vi.mock("@/components/CityCombobox", async () => {
  const React = await import("react");
  const CityCombobox = ({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) =>
    React.createElement("input", {
      "aria-label": "Paikkakunta",
      value,
      placeholder,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    });
  return { default: CityCombobox };
});

vi.mock("framer-motion", async () => {
  const React = await import("react");
  type MotionProps = React.PropsWithChildren<Record<string, unknown>>;
  const strip = ({ initial, animate, exit, transition, whileInView, viewport, ...rest }: MotionProps) => rest;
  return {
    AnimatePresence: ({ children }: React.PropsWithChildren) => React.createElement(React.Fragment, null, children),
    motion: { div: (props: MotionProps) => React.createElement("div", strip(props), props.children) },
  };
});

const fetchMock = vi.fn();
const future = { v7_startTransition: true, v7_relativeSplatPath: true };

/** toLocaleString('fi-FI') käyttää sitovaa välilyöntiä; Testing Library normalisoi sen tavalliseksi. */
const shown = (price: string) => price.replace(/\s+/g, " ");

const fill = (label: string, value: string) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
const choose = (label: string) => fireEvent.click(screen.getByLabelText(label));
const submit = () => fireEvent.click(screen.getByRole("button", { name: "Näytä hinta-arvio" }));
const sentBody = () => JSON.parse((fetchMock.mock.calls[0] as [string, RequestInit])[1].body as string);

beforeAll(() => {
  // jsdom ei toteuta scrollIntoView-metodia, jota PriceWizard kutsuu vaiheen vaihtuessa.
  Element.prototype.scrollIntoView = vi.fn();
});

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

describe("etusivun hintalaskuri (ChatPriceCalculator)", () => {
  const renderCalculator = () =>
    render(
      <MemoryRouter future={future}>
        <ChatPriceCalculator />
      </MemoryRouter>,
    );

  it("on tavallinen lomake ilman chat-kuoria, ja kysymykset tulevat näkyviin vasta palvelun valinnan jälkeen", () => {
    renderCalculator();
    expect(screen.getByRole("heading", { level: 2, name: "Hintalaskuri" })).toBeInTheDocument();
    expect(screen.getByText("Laske hinta-arvio katon pinnoitukselle tai talon maalaukselle. Vie noin minuutin.")).toBeInTheDocument();
    expect(screen.queryByText("Kuinka suuri katto on?")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Näytä hinta-arvio" })).not.toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/\p{Extended_Pictographic}/u);
    expect(document.body.textContent).not.toMatch(/Moikka|Mahtavaa|raksutta/);

    choose("Tiilikaton pinnoitus");
    expect(screen.getByLabelText("Kuinka suuri katto on?")).toBeInTheDocument();
    expect(screen.getByText("Millä paikkakunnalla kohde on?")).toBeInTheDocument();
    expect(screen.getByText("Jätä vielä nimi ja puhelinnumero, niin näytämme arvion.")).toBeInTheDocument();
  });

  it("katto: hinta näytetään vasta nimen ja puhelinnumeron jälkeen, ja liidi lähtee /api/contact-osoitteeseen", async () => {
    renderCalculator();
    choose("Tiilikaton pinnoitus");

    // Tyhjä lomake ei lähde mihinkään.
    submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getAllByText("Valitse vaihtoehto.").length).toBeGreaterThan(0);
    expect(screen.getByText("Kirjoita nimesi.")).toBeInTheDocument();

    const expected = formatPriceRange(calculateRoofPrice(200, "normaali"));
    fill("Kuinka suuri katto on?", "200");
    choose("Ei ole");
    choose("Löytyy kyllä");
    choose("Normaali jyrkkyys, valjailla pärjää");
    choose("Kyllä löytyy");
    fill("Paikkakunta", "Tampere");
    fill("Nimi", "Testi Henkilö");
    fill("Puhelinnumero", "40 123 4567");
    expect(screen.queryByText(shown(expected))).not.toBeInTheDocument(); // liidiportti: ei hintaa ennen lähetystä

    submit();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/contact");
    expect(sentBody()).toMatchObject({
      name: "Testi Henkilö",
      phone: "+358401234567",
      service: "tiilikatto",
      city: "Tampere",
      priceEstimate: expected,
      website: "",
      message: expect.stringMatching(/^Hintalaskuri \(etusivu\): .*\n\nLähde: /s),
    });
    expect(sentBody().calculatorDetails).toContain("Katon koko: 200 m²");
    expect(sentBody().calculatorDetails).toContain("Jyrkkyys: Normaali jyrkkyys, valjailla pärjää");
    expect(sentBody().calculatorDetails).toContain("Kaupunki: Tampere");

    expect(await screen.findByText(shown(expected))).toBeInTheDocument();
    expect(screen.getByText("Soitamme sinulle viimeistään seuraavana arkipäivänä. Tarkan hinnan saat, kun olemme käyneet paikalla.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Näytä hinta-arvio" })).not.toBeInTheDocument();
  });

  it("maalaus: hinta lasketaan seinäkaavalla kerrosten ja hilseilyn mukaan", async () => {
    renderCalculator();
    choose("Talon maalaus");
    const expected = formatPriceRange(calculateWallPrice(150, "1.5", "1-2"));
    fill("Kuinka monta pohjaneliötä talossa on?", "150");
    choose("1,5 kerrosta");
    choose("Vähän (1–2 seinällä)");
    choose("Ei löydy");
    expect(screen.getByText("Ilman vettä ja sähköä sovimme käytännöt paikan päällä.")).toBeInTheDocument();
    fill("Paikkakunta", "Nokia");
    fill("Nimi", "Testi");
    fill("Puhelinnumero", "0401234567");

    submit();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(sentBody()).toMatchObject({ service: "ulkomaalaus", city: "Nokia", priceEstimate: expected });
    expect(sentBody().calculatorDetails).toContain("Pohjaneliöt: 150 m²");
    expect(sentBody().calculatorDetails).toContain("Vesi/sähkö: Ei löydy");
    expect(await screen.findByText(shown(expected))).toBeInTheDocument();
  });

  it("virheellinen puhelinnumero tai liian pieni pinta-ala ei lähde, ja virhe näkyy kentän vieressä", () => {
    renderCalculator();
    choose("Tiilikaton pinnoitus");
    fill("Kuinka suuri katto on?", "5");
    choose("Ei ole");
    choose("Löytyy kyllä");
    choose("Todella jyrkkä");
    choose("Kyllä löytyy");
    fill("Paikkakunta", "Tampere");
    fill("Nimi", "Testi");
    fill("Puhelinnumero", "12345678");

    submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText("Anna pinta-ala numerona, esimerkiksi 200.")).toBeInTheDocument();
    expect(screen.getByText(PHONE_ERROR_MESSAGE)).toBeInTheDocument();
    expect(screen.getByLabelText("Kuinka suuri katto on?")).toHaveAttribute("aria-invalid", "true");
  });

  it("lähetysvirhe näytetään lomakkeessa eikä hintaa väitetä lähetetyksi", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ error: "Sähköpostin lähetys epäonnistui" }), { status: 502 }));
    renderCalculator();
    choose("Tiilikaton pinnoitus");
    const expected = formatPriceRange(calculateRoofPrice(180, "loiva"));
    fill("Kuinka suuri katto on?", "180");
    choose("1–5 rikkinäistä");
    choose("Löytyy kyllä");
    choose("Loiva, melkein tasakatto");
    choose("Kyllä löytyy");
    fill("Paikkakunta", "Tampere");
    fill("Nimi", "Testi");
    fill("Puhelinnumero", "40 123 4567");

    submit();
    expect(await screen.findByText("Sähköpostin lähetys epäonnistui")).toBeInTheDocument();
    expect(screen.queryByText(shown(expected))).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Näytä hinta-arvio" })).toBeEnabled();
  });
});

describe("/hintalaskuri-sivu", () => {
  it("näyttää kaksi eri arvostelua (B1) ja uuden johdannon (T39)", () => {
    render(
      <HelmetProvider>
        <MemoryRouter future={future} initialEntries={["/hintalaskuri/"]}>
          <Hintalaskuri />
        </MemoryRouter>
      </HelmetProvider>,
    );
    const captions = screen.getAllByText(/· Google-arvostelu$/).map((el) => el.textContent?.replace(/ · Google-arvostelu$/, ""));
    expect(captions).toHaveLength(2);
    expect(new Set(captions).size).toBe(2);
    expect(screen.getByText("Laskuri kysyy katon tai talon koon ja kunnon ja antaa hinta-arvion. Tarkan hinnan saat, kun olemme käyneet paikalla.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Mitä haluat laskea?" })).toBeInTheDocument();
  });

  it("laskurisivun ohjattu laskuri kysyy paikkakunnan ja yhteystiedot samoin sanoin kuin etusivun lomake", () => {
    render(
      <HelmetProvider>
        <MemoryRouter future={future} initialEntries={["/hintalaskuri/?palvelu=pinnoitus"]}>
          <Hintalaskuri />
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Kuinka suuri katto on?" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Kuinka suuri katto on?"), { target: { value: "200" } });
    fireEvent.click(screen.getByRole("button", { name: "Jatka" }));
    for (const label of ["Ei ole", "Löytyy kyllä", "Normaali jyrkkyys, valjailla pärjää", "Kyllä löytyy"]) {
      fireEvent.click(screen.getByRole("button", { name: label }));
    }
    expect(screen.getByRole("heading", { level: 2, name: "Millä paikkakunnalla kohde on?" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Jatka" }));
    expect(screen.getByText("Jätä vielä nimi ja puhelinnumero, niin näytämme arvion.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Näytä hinta-arvio" })).toBeInTheDocument();
    expect(document.querySelector('input[name="website"]')).not.toBeNull(); // honeypot
  });
});

describe("laskurien tekstit (tarkastus 12.10.2026, T40–T43)", () => {
  const files = ["components/ChatPriceCalculator.tsx", "components/laskuri/PriceWizard.tsx", "pages/Hintalaskuri.tsx"];

  it("ei emojeja, chat-fraaseja eikä huutomerkkejä käyttöliittymän teksteissä", () => {
    for (const file of files) {
      const source = fs.readFileSync(path.resolve(__dirname, "..", file), "utf-8");
      expect(source, file).not.toMatch(/\p{Extended_Pictographic}/u);
      expect(source, file).not.toMatch(/Moikka|Mahtavaa|raksuttamaan|Hienoa!|Kiitos!|pikaisesti|Selvä juttu|Aloitetaan!/);
      // Huutomerkki JSX-tekstissä tai merkkijonossa (ei koodissa, esim. !py-4 tai !service).
      expect(source, file).not.toMatch(/[a-zäö]![\s"'<]/);
    }
  });

  it("käyttää tarkastuksen ehdottamia lauseita", () => {
    const calc = fs.readFileSync(path.resolve(__dirname, "../components/ChatPriceCalculator.tsx"), "utf-8");
    const wizard = fs.readFileSync(path.resolve(__dirname, "../components/laskuri/PriceWizard.tsx"), "utf-8");
    expect(calc).toContain("Laske hinta-arvio katon pinnoitukselle tai talon maalaukselle. Vie noin minuutin.");
    for (const source of [calc, wizard]) {
      expect(source).toContain("Millä paikkakunnalla kohde on?");
      expect(source).toContain("Jätä vielä nimi ja puhelinnumero, niin näytämme arvion.");
      expect(source).toContain("Soitamme sinulle viimeistään seuraavana arkipäivänä.");
      expect(source).toContain("HoneypotField");
    }
  });
});
