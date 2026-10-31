import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import EnnenJalkeenMerkki from "@/components/EnnenJalkeenMerkki";
import MaaliMerkki from "@/components/MaaliMerkki";
import { CITY_LOCAL_FACTS_CHECKED, getCityLocalFacts } from "@/data/cityLocalFacts";

/**
 * Talon maalauksen kaupunkisivun lyhyt värilohko (Eki 31.10.2026): otsikko "Värin voi vaihtaa talon maalaus
 * <kaupunki>", yksi kappale kunnan rakennusjärjestyksen paikallisesta datasta (cityLocalFacts.ts, lähteet
 * docs/kaupunkisivut-lahteet.md), Tikkurila-palkki, yksi ennen/jälkeen-kuva ja "Lue lisää" -linkki pääsivun
 * värilohkoon (VarinVaihto). Tiilivärejä ei ole: maalin värikartat ovat Tikkurilan sivuilla.
 */
const kuvat = [
  { base: "talon-maalaus-pirkanmaa-varinvaihto-punaisesta-harmaaksi-ennen", label: "Ennen" },
  { base: "talon-maalaus-pirkanmaa-varinvaihto-punaisesta-harmaaksi-jalkeen", label: "Jälkeen" },
];

const MaalausVarit = ({ cityName, citySlug }: { cityName: string; citySlug: string }) => {
  const facts = getCityLocalFacts(citySlug);
  return (
    <section className="section-padding osio">
      <div className="section-container">
        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[minmax(0,34rem)_minmax(16rem,22rem)] lg:justify-between lg:gap-12">
          <div>
            <h2 className="mb-4 font-heading text-3xl font-bold text-navy md:text-4xl">Värin voi vaihtaa talon maalaus {cityName}</h2>
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
              to="/talon-maalaus-pirkanmaa/#varin-vaihto"
              className="mt-5 inline-flex items-center gap-1.5 font-semibold text-accent-ink hover:underline"
            >
              Lue lisää
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <MaaliMerkki merkki="tikkurila" teksti="Maali on pääsääntöisesti Tikkurilaa. Värikartat ovat Tikkurilan sivuilla ja rautakaupoissa." />
            <figure className="kortti overflow-hidden">
              <div className="grid grid-cols-2 gap-0.5">
                {kuvat.map((side) => (
                  <div key={side.base} className="relative">
                    <ResponsiveImage
                      baseName={side.base}
                      alt={`Punainen omakotitalo ennen maalausta ja harmaana maalauksen jälkeen: ${side.label.toLowerCase()}`}
                      className="aspect-[3/4] w-full object-cover"
                      sizes="(max-width: 640px) 50vw, 200px"
                      width={400}
                      height={533}
                    />
                    <EnnenJalkeenMerkki label={side.label} className="absolute left-3 top-3" />
                  </div>
                ))}
              </div>
              <figcaption className="px-5 py-4 text-sm text-muted-foreground">Punainen talo maalattiin harmaaksi.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaalausVarit;
