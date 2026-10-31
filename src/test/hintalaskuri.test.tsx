import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ChatPriceCalculator from "@/components/ChatPriceCalculator";
import Hintalaskuri from "@/pages/Hintalaskuri";
import { calculateRoofPrice, calculateWallPrice, formatPriceRange } from "@/lib/priceCalc";
import { LASKURI_NUMERO_VIRHE } from "@/lib/phoneValidation";
import { hintaVahennyksenJalkeen, vahennysArvio } from "@/components/vahennys/vahennysData";

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
    await pick("Ei puutu");
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

    // Tulos on navy-kortti: hinta isolla, vähennys alennuksena, vähän tekstiä (Eki 31.10.2026).
    const tulos = document.querySelector("[data-tulos]")!;
    expect(tulos).not.toBeNull();
    const reply = shown(tulos.textContent ?? "");
    expect(reply).toContain("Kiitos Testi!");
    expect(reply).toContain(shown(expected));
    expect(reply).toContain("Soitamme sinulle viimeistään seuraavana arkipäivänä.");
    expect(reply).not.toContain("Tarkan hinnan saat");
    expect(reply).not.toContain("Omavastuu");
    expect(screen.queryByRole("button", { name: "Lähetä ja näytä hinta-arvio" })).not.toBeInTheDocument();
    // Sama vähennys kuin /hintalaskuri-sivulla: alennuksena hintavälin keskikohdasta, "~X €".
    const price = calculateRoofPrice(200, "normaali");
    expect(reply).toContain("Kotitalousvähennys");
    expect(reply).toContain(shown(`~${vahennysArvio(price.min, price.max).toLocaleString("fi-FI")} €`));
    expect(screen.getByRole("link", { name: "Pyydä ilmainen kuntotarkastus" })).toHaveAttribute("href", "/ilmainen-katon-kuntotarkastus/");
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
    expect(shown(document.querySelector("[data-tulos]")?.textContent ?? "")).toContain(shown(expected));
    expect(screen.getByRole("link", { name: "Pyydä ilmainen arviokäynti" })).toHaveAttribute("href", "/ilmainen-julkisivun-kuntoarvio/");
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
    await pick("Ei puutu");
    await pick("Kyllä löytyy");
    await send("Paikkakunta", "Tampere");
    contact("Testi", "12345678");
    showPrice();
    await tick(2500); // puhelinnumeron tarkistus kestää 2 s
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText(LASKURI_NUMERO_VIRHE)).toBeInTheDocument();
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
    await pick("Ei puutu");
    await pick("Kyllä löytyy");
    await send("Paikkakunta", "Tampere");
    contact("Testi", "40 123 4567");
    showPrice();
    await tick();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Hups, lähetys ei onnistunut \(Sähköpostin lähetys epäonnistui\)/)).toBeInTheDocument();
    expect(screen.queryByText(shown(expected), { exact: false })).not.toBeInTheDocument();
    expect(document.querySelector("[data-tulos]")).toBeNull();
    expect(screen.getByRole("button", { name: "Lähetä ja näytä hinta-arvio" })).toBeEnabled();
  });

  /* Reset-nappi (Eerik 29.10.2026): otsikkopalkin oikeassa yläkulmassa, vain kun chat on alkanut. */
  const resetButton = () => screen.queryByRole("button", { name: "Aloita alusta" });

  it("reset-nappi ei näy ennen kuin chat on alkanut, ja näkyy sen jälkeen", async () => {
    renderCalculator();
    expect(resetButton()).toBeNull();
    await tick();
    expect(resetButton()).not.toBeNull();
  });

  it("reset tyhjentää viestit ja botti aloittaa alusta", async () => {
    await start();
    await pick(/Tiilikaton pinnoitus/);
    expect(screen.getByText(/Kuinka suuri katto on neliöinä/)).toBeInTheDocument();
    fireEvent.click(resetButton()!);
    expect(screen.queryByText(/Kuinka suuri katto on neliöinä/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Moikka!/)).not.toBeInTheDocument();
    await tick();
    await tick();
    expect(screen.getAllByText(/Moikka!/)).toHaveLength(1);
    expect(screen.getByText("Kumpaa lähdetään laskemaan?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tiilikaton pinnoitus/ })).toBeInTheDocument();
    expect(screen.queryByText(/Kuinka suuri katto on neliöinä/)).not.toBeInTheDocument();
  });

  it("reset kesken botin kirjoittamisen ei jätä kummitusviestejä eikä vanhan ajon vaihetta", async () => {
    await start();
    fireEvent.click(screen.getByRole("button", { name: /Tiilikaton pinnoitus/ }));
    await tick(300); // botti kirjoittaa vielä (viive 1 s)
    fireEvent.click(resetButton()!);
    await tick(); // vanhan ajon viive laukeaa: ei saa lisätä viestiä
    await tick();
    const moikat = screen.getAllByText(/Moikka!/);
    expect(moikat).toHaveLength(1);
    expect(screen.queryByText(/Kuinka suuri katto on neliöinä/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText("esim. 200")).not.toBeInTheDocument(); // vanhan ajon numerokenttä ei ilmesty
    expect(screen.getByRole("button", { name: /Talon maalaus/ })).toBeInTheDocument();
  });

  it("reset ei lähetä mitään ja tyhjentää nimen ja puhelinnumeron", async () => {
    await start();
    await pick(/Talon maalaus/);
    await send("esim. 150", "150");
    await pick("1 kerros");
    await pick("Ei ollenkaan");
    await pick("Kyllä löytyy");
    await send("Paikkakunta", "Tampere");
    contact("Testi", "0401234567");
    expect((screen.getByLabelText("Nimi") as HTMLInputElement).value).toBe("Testi");
    fireEvent.click(resetButton()!);
    await tick();
    await tick();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByLabelText("Nimi")).not.toBeInTheDocument();
    // Uusi laskenta kysyy nimen ja numeron uudelleen tyhjinä (liidiportti pysyy).
    await pick(/Talon maalaus/);
    await send("esim. 150", "120");
    await pick("1 kerros");
    await pick("Ei ollenkaan");
    await pick("Kyllä löytyy");
    await send("Paikkakunta", "Nokia");
    expect((screen.getByLabelText("Nimi") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("Puhelinnumero") as HTMLInputElement).value).toBe("");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reset tuloksen jälkeen tyhjentää näkymän eikä lähetä uudelleen", async () => {
    await start();
    await pick(/Tiilikaton pinnoitus/);
    await send("esim. 200", "200");
    await pick("Ei ole");
    await pick("Löytyy kyllä");
    await pick("Normaali jyrkkyys, valjailla pärjää");
    await pick("Ei puutu");
    await pick("Kyllä löytyy");
    await send("Paikkakunta", "Tampere");
    contact("Testi", "40 123 4567");
    showPrice();
    await tick();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(document.querySelector("[data-tulos]")).not.toBeNull();
    fireEvent.click(resetButton()!);
    expect(document.querySelector("[data-tulos]")).toBeNull();
    await tick();
    await tick();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Kumpaa lähdetään laskemaan?")).toBeInTheDocument();
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
    for (const label of ["Ei ole", "Löytyy kyllä", "Normaali jyrkkyys, valjailla pärjää", "Ei puutu", "Kyllä löytyy"]) {
      fireEvent.click(screen.getByRole("button", { name: label }));
    }
    expect(screen.getByRole("heading", { level: 2, name: "Millä paikkakunnalla kohde on?" })).toBeInTheDocument();
    // Ilman kuntaa ei pääse eteenpäin (Eki 31.10.2026): virhe näkyy kentän alla.
    fireEvent.click(screen.getByRole("button", { name: "Jatka" }));
    expect(screen.getByText("Valitse kunta listasta.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Millä paikkakunnalla kohde on?" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Paikkakunta"), { target: { value: "Tampere" } });
    expect(screen.queryByText("Valitse kunta listasta.")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Jatka" }));
    expect(screen.getByText("Jätä vielä nimi ja puhelinnumero, niin näytämme arvion.")).toBeInTheDocument();
    // Tyhjä lähetys: molemmat virheet kentän alla, mitään ei lähetetä.
    fireEvent.click(screen.getByRole("button", { name: "Näytä hinta-arvio" }));
    expect(screen.getByText("Kirjoita nimesi.")).toBeInTheDocument();
    expect(screen.getByText("Kirjoita puhelinnumero, niin voimme soittaa sinulle.")).toBeInTheDocument();
    expect(screen.getAllByLabelText("Nimi")[0]).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Näytä hinta-arvio" })).toBeInTheDocument();
    expect(document.querySelector('input[name="website"]')).not.toBeNull(); // honeypot
  });

  it("laskurisivu näyttää hinnan myös kotitalousvähennyksen jälkeen (Eerik 26.10.2026)", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter future={future} initialEntries={["/hintalaskuri/?palvelu=pinnoitus"]}>
          <Hintalaskuri />
        </MemoryRouter>
      </HelmetProvider>,
    );
    fireEvent.change(screen.getByLabelText("Kuinka suuri katto on?"), { target: { value: "200" } });
    fireEvent.click(screen.getByRole("button", { name: "Jatka" }));
    for (const label of ["Ei ole", "Löytyy kyllä", "Normaali jyrkkyys, valjailla pärjää", "Ei puutu", "Kyllä löytyy"]) {
      fireEvent.click(screen.getByRole("button", { name: label }));
    }
    fireEvent.change(screen.getByLabelText("Paikkakunta"), { target: { value: "Tampere" } });
    fireEvent.click(screen.getByRole("button", { name: "Jatka" }));
    // Sivulla on myös yhteydenottolomake, jossa on toinen Nimi-kenttä; laskurin kentät ovat ensimmäiset.
    fireEvent.change(screen.getAllByLabelText("Nimi")[0], { target: { value: "Testi Henkilö" } });
    fireEvent.change(screen.getAllByLabelText("Puhelinnumero")[0], { target: { value: "40 123 4567" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Näytä hinta-arvio" }));
    });
    const price = calculateRoofPrice(200, "normaali");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(shown(formatPriceRange(price)))).toBeInTheDocument();
    // Vähennys alennuksena keskikohdasta (Eki 31.10.2026): 200 m² normaali = 3 600–4 200 €, keskikohta 3 900 €,
    // työn osuus 80 % ja siitä 40 % = 1 248 € → ~1 250 €.
    expect(vahennysArvio(price.min, price.max)).toBe(1250);
    expect(screen.getByText("Kotitalousvähennys")).toBeInTheDocument();
    expect(screen.getByText(shown("~" + (1250).toLocaleString("fi-FI") + " €"))).toBeInTheDocument();
    expect(document.querySelector("[data-tulos]")?.textContent).not.toMatch(/Omavastuu/);
    expect(vahennysArvio(9000, 11000)).toBe(2100); // enimmäismäärä
    // 40 % työn osuudesta (80 % hinnasta), enintään 2 100 €; omavastuuta ei vähennetä (Eerik 26.10.2026).
    expect(hintaVahennyksenJalkeen(2850)).toBe(1940);
    expect(hintaVahennyksenJalkeen(3500)).toBe(2380);
    expect(hintaVahennyksenJalkeen(5000)).toBe(3400);
    expect(hintaVahennyksenJalkeen(7000)).toBe(4900);
    expect(hintaVahennyksenJalkeen(11000)).toBe(8900);
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
