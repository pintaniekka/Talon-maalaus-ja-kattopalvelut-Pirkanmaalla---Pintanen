import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import { act, render, screen, fireEvent } from "@testing-library/react";
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
    LazyMotion: ({ children }: React.PropsWithChildren) => React.createElement(React.Fragment, null, children),
    m: { div: (props: MotionProps) => React.createElement("div", strip(props), props.children) },
  };
});

const fetchMock = vi.fn();
const future = { v7_startTransition: true, v7_relativeSplatPath: true };

/** toLocaleString('fi-FI') käyttää sitovaa välilyöntiä; Testing Library normalisoi sen tavalliseksi. */
const shown = (price: string) => price.replace(/\s+/g, " ");

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

describe("etusivun chat-hintalaskuri (ChatPriceCalculator)", () => {
  /*
   * Chat käyttää botin viesteissä 1 s viivettä ja puhelinnumeron tarkistuksessa 2 s viivettä, joten
   * ajastimet korvataan ja aikaa siirretään käsin. jsdomissa ei ole IntersectionObserveria, jolloin
   * chat alkaa heti. Testing Libraryn odotusfunktiot on tuotu ennen ajastimien korvaamista, joten ne
   * käyttävät oikeita ajastimia.
   */
  beforeEach(() => {
    vi.useFakeTimers();
    Element.prototype.scrollTo = vi.fn();
  });
  afterEach(() => vi.useRealTimers());

  const renderCalculator = () =>
    render(
      <MemoryRouter future={future}>
        <ChatPriceCalculator />
      </MemoryRouter>,
    );

  /** Siirtää aikaa botin yhden viestin verran (viive 1 s + vieritys) ja antaa lupausten ratketa. */
  const tick = async (ms = 1200) => {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(ms);
    });
  };
  const start = async () => {
    renderCalculator();
    await tick(); // tervehdys
    await tick(); // "Kumpaa lähdetään laskemaan?" + kuvavalinnat
  };
  const pick = async (label: string | RegExp) => {
    fireEvent.click(screen.getByRole("button", { name: label }));
    await tick();
  };
  const send = async (label: string, value: string) => {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
    fireEvent.click(screen.getByRole("button", { name: "Lähetä" }));
    await tick();
  };
  const contact = (name: string, phone: string) => {
    fireEvent.change(screen.getByLabelText("Nimi"), { target: { value: name } });
    fireEvent.change(screen.getByLabelText("Puhelinnumero"), { target: { value: phone } });
  };
  const showPrice = () => fireEvent.click(screen.getByRole("button", { name: "Lähetä ja näytä hinta-arvio" }));

  it("alkaa tervehdyksellä, näyttää kaksi palvelua ja on ankkuroitu osoitteeseen #hintalaskuri", async () => {
    await start();
    expect(document.getElementById("hintalaskuri")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Hintalaskuri" })).toBeInTheDocument();
    expect(screen.getByText("Laske hinta-arvio katon pinnoitukselle tai talon maalaukselle. Vie noin minuutin.")).toBeInTheDocument();
    expect(screen.getByText(/Moikka!/)).toBeInTheDocument();
    expect(screen.getByText("Kumpaa lähdetään laskemaan?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tiilikaton pinnoitus/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Talon maalaus/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /puhdistus/i })).not.toBeInTheDocument(); // palvelu on loppunut
    expect(document.body.textContent).not.toMatch(/kattohuolto/i);
  });

  it("katto: hinta näytetään vasta nimen ja puhelinnumeron jälkeen, ja liidi lähtee /api/contact-osoitteeseen", async () => {
    await start();
    await pick(/Tiilikaton pinnoitus/);
    const expected = formatPriceRange(calculateRoofPrice(200, "normaali"));
    await send("esim. 200", "200");
    await pick("Ei ole");
    await pick("Löytyy kyllä");
    await pick("Normaali jyrkkyys, valjailla pärjää");
    await pick("Kyllä löytyy");
    expect(screen.getByText("Hienoa. Millä paikkakunnalla kohde on?")).toBeInTheDocument();
    await send("Paikkakunta", "Tampere");
    expect(screen.getByText(/Jätä vielä nimi ja puhelinnumero/)).toBeInTheDocument();
    expect(document.querySelector('input[name="website"]')).not.toBeNull(); // honeypot
    contact("Testi Henkilö", "40 123 4567");
    expect(screen.queryByText(shown(expected), { exact: false })).not.toBeInTheDocument(); // liidiportti: ei hintaa ennen lähetystä
    expect(fetchMock).not.toHaveBeenCalled();

    showPrice();
    await tick();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/contact");
    expect(sentBody()).toMatchObject({
      name: "Testi Henkilö",
      phone: "+358401234567",
      service: "tiilikatto",
      city: "Tampere",
      priceEstimate: expected,
      website: "",
      message: expect.stringMatching(/^Chat-hintalaskuri \(etusivu\): .*\n\nLähde: /s),
    });
    expect(sentBody().calculatorDetails).toContain("Katon koko: 200 m²");
    expect(sentBody().calculatorDetails).toContain("Jyrkkyys: Normaali");
    expect(sentBody().calculatorDetails).toContain("Kaupunki: Tampere");

    const reply = screen.getByText(shown(expected), { exact: false });
    expect(reply.textContent).toContain("Kiitos Testi!");
    expect(reply.textContent).toContain("Soitamme sinulle viimeistään seuraavana arkipäivänä. Tarkan hinnan saat, kun olemme käyneet paikalla.");
    expect(screen.queryByRole("button", { name: "Lähetä ja näytä hinta-arvio" })).not.toBeInTheDocument();
  });

  it("maalaus: hinta lasketaan seinäkaavalla kerrosten ja hilseilyn mukaan", async () => {
    await start();
    await pick(/Talon maalaus/);
    const expected = formatPriceRange(calculateWallPrice(150, "1.5", "1-2"));
    await send("esim. 150", "150");
    await pick("1,5 kerrosta");
    await pick("Vähän (1–2 seinällä)");
    await pick("Ei löydy");
    expect(screen.getByText("Selvä, sovitaan käytännöt paikan päällä. Millä paikkakunnalla kohde on?")).toBeInTheDocument();
    await send("Paikkakunta", "Nokia");
    contact("Testi", "0401234567");
    showPrice();
    await tick();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(sentBody()).toMatchObject({ service: "ulkomaalaus", city: "Nokia", priceEstimate: expected });
    expect(sentBody().calculatorDetails).toContain("Pohjaneliöt: 150 m²");
    expect(sentBody().calculatorDetails).toContain("Vesi/sähkö: Ei löydy");
    expect(screen.getByText(shown(expected), { exact: false })).toBeInTheDocument();
  });

  it("liian pieni pinta-ala pyydetään uudestaan, ja virheellinen puhelinnumero ei lähde", async () => {
    await start();
    await pick(/Tiilikaton pinnoitus/);
    await send("esim. 200", "5");
    expect(screen.getByText(/Hmm, tarkista vielä luku/)).toBeInTheDocument();
    await send("esim. 200", "180");
    await pick("1–5 rikkinäistä");
    await pick("Löytyy kyllä");
    await pick("Todella jyrkkä");
    await pick("Kyllä löytyy");
    await send("Paikkakunta", "Tampere");
    contact("Testi", "12345678");
    showPrice();
    await tick(2500); // puhelinnumeron tarkistus kestää 2 s
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText(PHONE_ERROR_MESSAGE)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Lähetä ja näytä hinta-arvio" })).toBeInTheDocument();
  });

  it("lähetysvirhe kerrotaan chatissa eikä hintaa näytetä", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ error: "Sähköpostin lähetys epäonnistui" }), { status: 502 }));
    await start();
    await pick(/Tiilikaton pinnoitus/);
    const expected = formatPriceRange(calculateRoofPrice(180, "loiva"));
    await send("esim. 200", "180");
    await pick("Ei ole");
    await pick("Löytyy kyllä");
    await pick("Loiva, melkein tasakatto");
    await pick("Kyllä löytyy");
    await send("Paikkakunta", "Tampere");
    contact("Testi", "40 123 4567");
    showPrice();
    await tick();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Hups, lähetys ei onnistunut \(Sähköpostin lähetys epäonnistui\)/)).toBeInTheDocument();
    expect(screen.queryByText(shown(expected), { exact: false })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Lähetä ja näytä hinta-arvio" })).toBeEnabled();
  });
});

describe("/hintalaskuri-sivu", () => {
  it("näyttää neljä eri arvostelua (B1) ja uuden johdannon (T39)", () => {
    render(
      <HelmetProvider>
        <MemoryRouter future={future} initialEntries={["/hintalaskuri/"]}>
          <Hintalaskuri />
        </MemoryRouter>
      </HelmetProvider>,
    );
    const captions = screen.getAllByText(/· Google-arvostelu$/).map((el) => el.textContent?.replace(/ · Google-arvostelu$/, ""));
    expect(captions).toHaveLength(4);
    expect(new Set(captions).size).toBe(4);
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

describe("laskurien tekstit (tarkastus 12.10.2026, T40–T43; chat-laskuri palautettu 13.10.2026)", () => {
  const files = ["components/laskuri/PriceWizard.tsx", "pages/Hintalaskuri.tsx"];

  it("laskurisivulla ei ole emojeja, chat-fraaseja eikä huutomerkkejä käyttöliittymän teksteissä", () => {
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
      expect(source).toContain("Jätä vielä nimi ja puhelinnumero");
      expect(source).toContain("Soitamme sinulle viimeistään seuraavana arkipäivänä.");
      expect(source).toContain("HoneypotField");
    }
    // Chat-laskuri: emojit ovat sallittuja, mutta loppunutta puhdistuspalvelua ja sanaa kattohuolto ei mainita.
    expect(calc).not.toMatch(/puhdistus|kattohuolto|tehopesu|pohjuste|primer/i);
  });
});
