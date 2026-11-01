import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TiiliVari from "@/components/TiiliVari";
import MaaliMerkki from "@/components/MaaliMerkki";
import { NOWOCOAT_VARIT } from "@/data/nowocoatVarit";
import { CITY_LOCAL_FACTS_CHECKED, getCityLocalFacts } from "@/data/cityLocalFacts";

/**
 * Kaupunkisivun lyhyt värilohko (Eki 31.10.2026): otsikko "Värin voi vaihtaa tiilikaton pinnoitus <kaupunki>",
 * yksi kappale kunnan rakennusjärjestyksen paikallisesta datasta (cityLocalFacts.ts, lähteet
 * docs/kaupunkisivut-lahteet.md), pelkät tiilivärikuvat, Nowocoat-maalipalkki ja "Lue lisää" -linkki pinnoituksen
 * pääsivun värilohkoon. Pitkä versio (ennen/jälkeen-kuvat, artikkelilinkki) on pääsivulla (VarinVaihto).
 * Otsikko noudattaa sivun H1:n muotoa: "Tiilikaton pinnoitus <kaupunki>".
 */
const PinnoitusVarit = ({ cityName, citySlug }: { cityName: string; citySlug: string }) => {
  const facts = getCityLocalFacts(citySlug);
  return (
    <section className="section-padding osio">
      <div className="section-container">
        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[minmax(0,42rem)_16rem] lg:justify-between lg:gap-12">
          <div>
            <h2 className="mb-4 font-heading text-3xl font-bold text-navy md:text-4xl">Värin voi vaihtaa tiilikaton pinnoitus {cityName}</h2>
            {facts && (
              <>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {facts.saanto} {facts.tilanne}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Lähde:{" "}
                  <a href={facts.lahde} target="_blank" rel="noopener noreferrer" className="underline">
                    kunnan rakennusjärjestys ja rakennusvalvonnan sivut
                  </a>
                  , luettu {CITY_LOCAL_FACTS_CHECKED}.
                </p>
              </>
            )}
            <Link
              to="/tiilikaton-pinnoitus-pirkanmaa/#varin-vaihto"
              className="mt-5 inline-flex items-center gap-1.5 font-semibold text-accent-ink hover:underline"
            >
              Lue lisää tiilikaton värin vaihdosta
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <MaaliMerkki merkki="nowocoat" teksti="Nowocoatin värikartassa on 16 tiilikattoväriä. Katto maalataan kahteen kertaan." />
        </div>
        <ul className="mx-auto mt-8 grid max-w-5xl list-none grid-cols-4 gap-x-2 gap-y-3 p-0 sm:grid-cols-8 lg:gap-x-4" aria-label="Nowocoatin kattovärit">
          {NOWOCOAT_VARIT.map((v) => (
            <li key={v.nimi} className="flex flex-col items-center text-center">
              <TiiliVari hex={v.hex} className="w-full max-w-[64px] drop-shadow-sm" />
              <span className="mt-1 text-[11px] leading-tight text-muted-foreground">{v.nimi}</span>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-2 max-w-5xl text-xs text-muted-foreground">Värit ovat suuntaa antavia.</p>
      </div>
    </section>
  );
};

export default PinnoitusVarit;
