import { Link } from "react-router-dom";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ResponsiveImage from "@/components/ResponsiveImage";
import EnnenJalkeenMerkki from "@/components/EnnenJalkeenMerkki";
import { getHintakohteet } from "@/data/hintakohteet";
import { getCityBySlug } from "@/data/cityData";
import type { ProjectService } from "@/data/projects";
import { fmtEur } from "@/data/prices";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

const sisalto: Record<ProjectService, { title: string; intro: string }> = {
  pinnoitus: {
    title: "Mitä tiilikaton pinnoitus maksoi oikeasti",
    intro:
      "Omia kohteitamme ja niiden urakkahinnat. Hinnat sisältävät alv:n ja ovat ennen kotitalousvähennystä. Jokainen katto on erilainen, joten oman kattosi hinnan saat kirjallisena ilmaisen kuntotarkastuksen jälkeen.",
  },
  maalaus: {
    title: "Mitä talon maalaus maksoi oikeasti",
    intro:
      "Omia kohteitamme ja niiden urakkahinnat. Hinnat sisältävät alv:n ja ovat ennen kotitalousvähennystä. Jokainen talo on erilainen, joten oman talosi hinnan saat kirjallisena ilmaisen arviokäynnin jälkeen.",
  },
};

/** Hintatägi kuvan päällä: keltainen pilleri, sama keltainen kuin näyttämöiden korostuksissa. */
const HintaTagi = ({ hinta }: { hinta: number }) => (
  <span className="pointer-events-none absolute bottom-3 right-3 z-10 inline-flex rounded-full bg-paint-yellow px-4 py-2 font-heading text-lg font-extrabold text-paint-yellow-foreground shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
    {fmtEur(hinta)}
  </span>
);

/**
 * Toteutuneita hintoja kuvineen hintasivuille (Eerik 28.10.2026: hinnat nimettöminä, hintatägi kuvan päällä).
 * Kohteet ja hinnat tulevat tiedostosta src/data/hintakohteet.ts.
 */
const HintaKohteet = ({ service }: { service: ProjectService }) => {
  const items = getHintakohteet(service);
  if (items.length === 0) return null;
  const s = sisalto[service];
  return (
    <section className="section-padding osio" aria-labelledby="hintakohteet-otsikko">
      <div className="section-container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="lohko-otsake mb-3">Toteutuneita hintoja</span>
          <h2 id="hintakohteet-otsikko" className="mb-4 font-heading text-3xl font-bold text-navy md:text-4xl">
            {s.title}
          </h2>
          <p className="text-lg text-muted-foreground">{s.intro}</p>
        </div>
        <ul className="mx-auto grid max-w-6xl list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((k) => {
            const cityName = getCityBySlug(k.city)?.name ?? k.city;
            const tyo =
              k.services.length > 1 ? "Katto ja seinät" : service === "pinnoitus" ? "Tiilikaton pinnoitus" : "Talon maalaus";
            return (
              <li key={k.pair ?? k.image ?? k.after} className="kortti flex flex-col overflow-hidden">
                <div className="relative">
                  {k.pair ? (
                    <BeforeAfterSlider
                      className="rounded-none shadow-none"
                      beforeImage={getResponsiveSrc(`${k.pair}-ennen`)}
                      beforeSrcSet={getResponsiveSrcSet(`${k.pair}-ennen`)}
                      afterImage={getResponsiveSrc(`${k.pair}-jalkeen`)}
                      afterSrcSet={getResponsiveSrcSet(`${k.pair}-jalkeen`)}
                      beforeAlt={`${k.alt}: ennen`}
                      afterAlt={`${k.alt}: jälkeen`}
                      aspectRatio="4/3"
                    />
                  ) : k.before && k.after ? (
                    <div className="grid grid-cols-2 gap-0.5">
                      {[
                        { base: k.before, label: "Ennen" },
                        { base: k.after, label: "Jälkeen" },
                      ].map((side) => (
                        <div key={side.base} className="relative">
                          <ResponsiveImage
                            baseName={side.base}
                            alt={`${k.alt}: ${side.label.toLowerCase()}`}
                            className="aspect-[3/4] w-full object-cover"
                            sizes="(max-width: 640px) 50vw, 200px"
                            width={400}
                            height={533}
                          />
                          <EnnenJalkeenMerkki label={side.label} className="absolute left-3 top-3" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ResponsiveImage
                      baseName={k.image!}
                      alt={k.alt}
                      className="aspect-[4/3] w-full object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      width={800}
                      height={600}
                    />
                  )}
                  <HintaTagi hinta={k.hinta} />
                </div>
                <div className="flex flex-1 flex-col px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {cityName} · {tyo}
                  </p>
                  <p className="mt-1.5 text-sm text-foreground">{k.kuvaus}</p>
                  <p className="mt-auto pt-3 text-xs text-muted-foreground">
                    Urakkahinta {fmtEur(k.hinta)} sis. alv, ennen kotitalousvähennystä.
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 text-center">
          <Link to="/referenssit/" className="font-semibold text-primary hover:underline">
            Katso lisää referenssejä
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HintaKohteet;
