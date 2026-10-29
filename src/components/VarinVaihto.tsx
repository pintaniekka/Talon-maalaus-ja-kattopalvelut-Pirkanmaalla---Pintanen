import { Link } from "react-router-dom";
import ResponsiveImage from "@/components/ResponsiveImage";
import EnnenJalkeenMerkki from "@/components/EnnenJalkeenMerkki";
import { CITY_LOCAL_FACTS_CHECKED, getCityLocalFacts } from "@/data/cityLocalFacts";
import { getArticleBySlug, isPublished } from "@/data/articles";
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
      "Pinnoitus on maalaus, ja uusi väri peittää vanhan. Nowocoatin kattomaaleissa on laaja värivalikoima, ja pinta on puolihimmeä. Yleisimmät värit ovat tummanharmaa, musta, tiilenpunainen ja ruskea.",
      "Väri valitaan kuntotarkastuksen yhteydessä. Katsomme seinien ja räystäiden värin ja naapuruston katot. Värin vaihto ei nosta hintaa, koska katto maalataan aina kahteen kertaan.",
    ],
    varit: [
      { nimi: "Tummanharmaa", hex: "#3d4146" },
      { nimi: "Musta", hex: "#1f2124" },
      { nimi: "Tiilenpunainen", hex: "#9c3b2a" },
      { nimi: "Ruskea", hex: "#5a3a2a" },
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
    before: "talon-maalaus-punainen-omakotitalo-varinvaihto-ennen",
    after: "talon-maalaus-harmaa-omakotitalo-varinvaihto-jalkeen",
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
  const artikkeli = getArticleBySlug(s.artikkeli);
  const artikkeliJulkaistu = !!artikkeli && isPublished(artikkeli);
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
            {artikkeliJulkaistu && (
              <p>
                <Link to={`/artikkelit/${s.artikkeli}/`} className="font-semibold text-primary hover:underline">
                  Lue lisää värin vaihdosta
                </Link>
                .
              </p>
            )}
          </div>
          {s.varit.length > 0 && (
            <ul className="mt-6 flex list-none flex-wrap gap-x-6 gap-y-3 p-0" aria-label="Yleisimmät kattovärit">
              {s.varit.map((v) => (
                <li key={v.nimi} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="h-6 w-6 rounded-full ring-2 ring-white shadow" style={{ backgroundColor: v.hex }} aria-hidden="true" />
                  {v.nimi}
                </li>
              ))}
            </ul>
          )}
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
    </section>
  );
};

export default VarinVaihto;
