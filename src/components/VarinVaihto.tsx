import { Link } from "react-router-dom";
import ResponsiveImage from "@/components/ResponsiveImage";
import EnnenJalkeenMerkki from "@/components/EnnenJalkeenMerkki";
import TiiliVari from "@/components/TiiliVari";
import { CITY_LOCAL_FACTS_CHECKED, getCityLocalFacts } from "@/data/cityLocalFacts";
import JulkaistuArtikkeli from "@/components/JulkaistuArtikkeli";
import type { ProjectService } from "@/data/projects";

/**
 * Värin vaihto omana lohkonaan katolle ja seinille (Eerik 28.10.2026: "katolle ja seinälle oma
 * värinvaihtoblockki"). Korvaa kaupunkisivujen yhteisen "katon tai seinän" -lohkon (CityLocalRules).
 * Faktat ovat sivuston omia: faqData.ts ja artikkelit tiilikaton-varin-vaihto-pinnoituksessa ja
 * talon-maalaus-varin-vaihto (Nowocoatin värivalikoima, väri valitaan kuntotarkastuksessa, värin vaihto ei
 * nosta hintaa; peittävä maali peittää vanhan, peittävyys katsotaan arviokäynnillä, väri kirjataan tarjoukseen).
 * Kaupunkisivulla lupakappale tulee cityLocalFacts.ts:stä (lähteet docs/kaupunkisivut-lahteet.md),
 * pääsivulla yleinen kehotus kysyä rakennusvalvonnasta.
 */
interface Sisalto {
  otsikko: (cityIn?: string) => string;
  kappaleet: string[];
  varit: { nimi: string; hex: string }[];
  before: string;
  after: string;
  alt: string;
  kuvateksti: string;
  artikkeli: string;
}

const sisalto: Record<ProjectService, Sisalto> = {
  pinnoitus: {
    otsikko: (cityIn) => `Katon värin voi vaihtaa pinnoituksessa${cityIn ? ` ${cityIn}` : ""}`,
    kappaleet: [
      "Pinnoitus on maalaus, ja uusi väri peittää vanhan. Nowocoatin värikartassa on 16 väriä, ja pinta on puolihimmeä. Väri valitaan kuntotarkastuksessa, ja värin vaihto ei nosta hintaa, koska katto maalataan aina kahteen kertaan.",
    ],
    // Nowocoatin värikartta, 16 tiilikattoväriä (Coating Source 29.10.2026, docs/nowocoat-lahteet-2026-10-29.md).
    // Nimet valmistajan englanninkielisinä (Eerik 29.10.2026). Hex-arvot ovat suuntaa antavia värikartasta luettuja.
    varit: [
      { nimi: "Pale Grey", hex: "#e4e2d6" },
      { nimi: "Anthracite", hex: "#4a5058" },
      { nimi: "Anthracite Dark", hex: "#3a3d42" },
      { nimi: "Slate Grey", hex: "#54595e" },
      { nimi: "Grey", hex: "#777a7c" },
      { nimi: "Black", hex: "#1f2022" },
      { nimi: "Blue-Black", hex: "#26292d" },
      { nimi: "Tile Red", hex: "#c9562a" },
      { nimi: "Tupapunainen", hex: "#a3432f" },
      { nimi: "Swedish Red", hex: "#8f3a2e" },
      { nimi: "Special Red", hex: "#a4402f" },
      { nimi: "Red Brown", hex: "#7a3b2b" },
      { nimi: "Oxide Red", hex: "#a13d2c" },
      { nimi: "Bordeaux", hex: "#6b2f28" },
      { nimi: "Mocca", hex: "#6b4330" },
      { nimi: "Dark Brown", hex: "#4a3128" },
    ],
    before: "tiilikaton-pinnoitus-lempaala-harmaa-tiilikatto-ennen",
    after: "tiilikaton-pinnoitus-lempaala-tummanharmaa-tiilikatto-jalkeen",
    alt: "Harmaa tiilikatto ennen pinnoitusta ja tummanharmaana pinnoituksen jälkeen, Lempäälä",
    kuvateksti: "Harmaa katto pinnoitettiin tummanharmaaksi, Lempäälä.",
    artikkeli: "tiilikaton-varin-vaihto-pinnoituksessa",
  },
  maalaus: {
    otsikko: (cityIn) => `Talon värin voi vaihtaa maalauksessa${cityIn ? ` ${cityIn}` : ""}`,
    kappaleet: [
      "Peittävä maali peittää vanhan värin. Työvaiheet ovat samat kuin muussa maalauksessa: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.",
      "Vaalea maali peittää tumman pohjan heikommin kuin tumma vaalean. Arviokäynnillä katsomme, riittääkö peittävyys, ja kirjaamme värin ja maalin tarjoukseen. Värikartat ovat Tikkurilan sivuilla ja rautakaupoissa.",
    ],
    varit: [],
    before: "talon-maalaus-pirkanmaa-varinvaihto-punaisesta-harmaaksi-ennen",
    after: "talon-maalaus-pirkanmaa-varinvaihto-punaisesta-harmaaksi-jalkeen",
    alt: "Punainen omakotitalo ennen maalausta ja harmaana maalauksen jälkeen",
    kuvateksti: "Punainen talo maalattiin harmaaksi.",
    artikkeli: "talon-maalaus-varin-vaihto",
  },
};

interface Props {
  service: ProjectService;
  /** Kaupunkisivulla kunnan oma lupasääntö ja lähde. */
  citySlug?: string;
  cityIn?: string;
}

const VarinVaihto = ({ service, citySlug, cityIn }: Props) => {
  const s = sisalto[service];
  const facts = citySlug ? getCityLocalFacts(citySlug) : undefined;
  return (
    <section className="section-padding osio">
      <div className="section-container grid items-start gap-10 lg:grid-cols-[minmax(0,40rem)_minmax(18rem,26rem)] lg:justify-center lg:gap-16">
        <div>
          <span className="lohko-otsake mb-3">Värin vaihto</span>
          <h2 className="mb-5 font-heading text-3xl font-bold text-navy md:text-4xl">{s.otsikko(cityIn)}</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            {s.kappaleet.map((k) => (
              <p key={k}>{k}</p>
            ))}
            {facts ? (
              <>
                <p>
                  Maalaus samaan väriin on yleensä tavallista huoltoa, johon ei tarvita lupaa. Jos väri vaihtuu, kunnan
                  rakennusjärjestys kertoo, tarvitaanko lupaa. {facts.saanto}
                </p>
                <p>{facts.tilanne}</p>
                <p className="text-sm">
                  Lähde:{" "}
                  <a href={facts.lahde} target="_blank" rel="noopener noreferrer" className="underline">
                    kunnan rakennusjärjestys ja rakennusvalvonnan sivut
                  </a>
                  , luettu {CITY_LOCAL_FACTS_CHECKED}.
                </p>
              </>
            ) : (
              <p>
                Maalaus samaan väriin on yleensä tavallista huoltoa, johon ei tarvita lupaa. Monessa kunnassa värin vaihto voi
                vaatia ilmoituksen tai luvan, varsinkin asemakaava-alueella. Kysy oman kuntasi rakennusvalvonnasta ennen kuin
                päätät värin.
              </p>
            )}
            <JulkaistuArtikkeli slug={s.artikkeli}>
              <p>
                <Link to={`/artikkelit/${s.artikkeli}/`} className="font-semibold text-primary hover:underline">
                  Lue lisää värin vaihdosta
                </Link>
                .
              </p>
            </JulkaistuArtikkeli>
          </div>
        </div>
        <figure className="kortti overflow-hidden">
          <div className="grid grid-cols-2 gap-0.5">
            {[
              { base: s.before, label: "Ennen" },
              { base: s.after, label: "Jälkeen" },
            ].map((side) => (
              <div key={side.base} className="relative">
                <ResponsiveImage
                  baseName={side.base}
                  alt={`${s.alt}: ${side.label.toLowerCase()}`}
                  className="aspect-[3/4] w-full object-cover"
                  sizes="(max-width: 640px) 50vw, 200px"
                  width={400}
                  height={533}
                />
                <EnnenJalkeenMerkki label={side.label} className="absolute left-3 top-3" />
              </div>
            ))}
          </div>
          <figcaption className="px-5 py-4 text-sm text-muted-foreground">{s.kuvateksti}</figcaption>
        </figure>
      </div>
      {/* Nowocoatin värikartta tiilen muotoisina värimalleina yhtenä tiiviinä rivinä (Eerik 29.10.2026). */}
      {s.varit.length > 0 && (
        <div className="section-container mt-10">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Nowocoatin värikartta: 16 kattoväriä
            <span className="ml-2 font-normal text-muted-foreground">Värit ovat suuntaa antavia.</span>
          </p>
          <ul className="grid list-none grid-cols-4 gap-x-2 gap-y-3 p-0 sm:grid-cols-8 lg:gap-x-4" aria-label="Nowocoatin kattovärit">
            {s.varit.map((v) => (
              <li key={v.nimi} className="flex flex-col items-center text-center">
                <TiiliVari hex={v.hex} className="w-full max-w-[64px] drop-shadow-sm" />
                <span className="mt-1 text-[11px] leading-tight text-muted-foreground">{v.nimi}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default VarinVaihto;
