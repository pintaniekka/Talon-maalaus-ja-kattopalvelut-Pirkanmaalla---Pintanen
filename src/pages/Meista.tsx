import { Link } from "react-router-dom";
import Rytmi from "@/components/Rytmi";
import ArvosteluNosto from "@/components/ArvosteluNosto";
import PageHero from "@/components/PageHero";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import { merkitse } from "@/components/Rytmi";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import SEO from "@/components/SEO";
import { generalFAQ } from "@/data/faqData";
import { HERO_BASE, staticSeo } from "@/data/seo";
import { LUVUT, TAKUU, TOIMINTA_ALUE, VASTAUSLUPAUS } from "@/data/company";
import { getStorageUrl } from "@/lib/storage";

const eerikImage = getStorageUrl("Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp");
const eemilImage = getStorageUrl("Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp");

/**
 * Yksi lukusarja koko sivustolle (V23, korjaus 8). Eerik 13.10.2026: 130 + 80 riittää, ei erikseen 200; arvosana on jo herossa.
 * Eerik 14.10.2026: "yli 5 vuotta kokemusta" korvattu kattomäärällä kesässä (Eerik aloitti kattotyöt 2022).
 */
const facts = [
  { number: LUVUT.pinnoitetutKatot, label: "pinnoitettua kattoa" },
  { number: LUVUT.maalatutTalot, label: "maalattua taloa" },
  { number: "30–40", label: "kattoa kesässä" },
  { number: "5 v / 2 v", label: "takuu: katto / seinät" },
];

/** Luvut tummansinisenä näyttämönä (Rytmi): keltaiset luvut ja valkoiset selitteet. */
const MeistaLuvut = () => (
  <section className="section-padding osio" aria-label="Pintanen lukuina">
    <div className="section-container">
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dd className="luku-korostus font-heading text-4xl md:text-5xl font-extrabold leading-none">{fact.number}</dd>
            <dt className="mt-2 text-[11px] md:text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{fact.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
merkitse(MeistaLuvut, "navy");

const faktalaatikko = [
  ["Yritys", "Pintanen Oy"],
  ["Y-tunnus", "3525786-9"],
  ["Yrittäjät", "Eerik Pitkänen (katot) ja Eemil Pitkänen (seinät)"],
  ["Toiminta-alue", `${TOIMINTA_ALUE.charAt(0).toUpperCase()}${TOIMINTA_ALUE.slice(1)}`],
  ["Palvelut", "Tiilikaton pinnoitus ja talon ulkomaalaus"],
  ["Takuu", `Pinnoitus ${TAKUU.pinnoitus}, maalaus ${TAKUU.maalaus}`],
];

/**
 * Meistä. Yksi totuus yrityksestä (korjaus 8): tamperelainen yritys (Eerikin päätös 5.10. ja 11.10.2026: muuta kotipaikkaa ei mainita), työt Pirkanmaalla ja Kanta-Hämeessä,
 * vain ulkotyöt omakotitaloihin, paritaloihin ja mökkeihin. Tekstit lyhennetty (S27–S29). Arvomme-kolmikko poistettu ja
 * ruksilista muutettu kappaleeksi (tarkastus 12.10.2026, T33–T35).
 */
const Meista = () => {
  const crumbs = [{ name: "Meistä" }];
  return (
    <div>
      <Rytmi>
      <SEO {...staticSeo["/meista"]} breadcrumbs={crumbs} />

      <PageHero
        eyebrow="Pintanen Oy · perheyritys"
        title={
          <>
            Veljekset, jotka maalaavat <span className="text-accent-ink">itse</span>
          </>
        }
        lead={
          <>
            Pintanen on perheyritys, joka toimii Pirkanmaalla ja lähikunnissa. <strong className="text-foreground">Eerik pinnoittaa tiilikatot</strong>{" "}
            ja <strong className="text-foreground">Eemil maalaa talot</strong>. Ei välikäsiä.
          </>
        }
        primary={{ to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" }}
        secondary={{ to: "/referenssit/", label: "Katso kuvia töistämme" }}
        trust="yleinen"
        image={{ base: HERO_BASE.meista, alt: "Eerik Pitkänen tiilikatolla Tampereella" }}
        breadcrumbs={crumbs}
      />

      <section className="section-padding osio">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6">Mikä on Pintanen?</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Me olemme veljekset Eerik ja Eemil. Eerik aloitti kattotyöt 2022 ja perusti Pintanen Oy:n Tampereelle 2025. Eemil hoitaa
                seinäpuolen itsenäisesti. Yli 200 kohdetta, yli 130 kattoa ja yli 80 taloa, on kertynyt vuodesta 2022, viimeiset
                kaksi vuotta Pintasen nimissä.
              </p>
              <p>Meillä ei ole välikäsiä eikä raskasta kulurakennetta. Soitat suoraan Eerikille tai Eemilille.</p>
              <p>
                Kotikaupungissamme Eerik{" "}
                <Link to="/tiilikaton-pinnoitus-tampere/" className="text-primary font-semibold hover:underline">
                  pinnoittaa tiilikattoja Tampereella
                </Link>{" "}
                ja Eemil{" "}
                <Link to="/talon-maalaus-tampere/" className="text-primary font-semibold hover:underline">
                  maalaa puutaloja Tampereella
                </Link>
                . Samalla tavalla teemme työt Pirkanmaalla ja lähikunnissa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding osio">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-8 text-center">Kaksi veljestä, kaksi työtä</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="kortti p-7 md:p-9 text-center">
                <img loading="lazy" decoding="async" src={eerikImage} alt="Eerik Pitkänen" width={144} height={144} className="w-36 h-36 rounded-full object-cover ring-4 ring-accent-light mx-auto mb-5" />
                <span className="lohko-otsake mb-2">Katot</span>
                <h3 className="font-heading text-xl md:text-2xl font-extrabold text-navy mb-3">Eerik pinnoittaa tiilikatot</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pesen ja maalaan kattoja kesäkaudet, noin 30–40 kattoa kesässä. Talvet kuluvat koulun penkillä ja urakoita myydessä.
                  Aloitin kattotyöt 2022 toisen yrityksen työntekijänä ja perustin Pintanen Oy:n 2025. Kattokaluston olen hankkinut itse,
                  ja se on yrityksen omaa. Vakuutukset ja työturvallisuuskortti ovat kunnossa.
                </p>
              </div>
              <div className="kortti p-7 md:p-9 text-center">
                <img loading="lazy" decoding="async" src={eemilImage} alt="Eemil Pitkänen" width={144} height={144} className="w-36 h-36 rounded-full object-cover ring-4 ring-accent-light mx-auto mb-5" />
                <span className="lohko-otsake mb-2">Seinät</span>
                <h3 className="font-heading text-xl md:text-2xl font-extrabold text-navy mb-3">Eemil maalaa talojen ulkoseinät</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Maalaan kaikki Pintasen talot, aina maalausparini kanssa. Aloitin maalauksen muualla, ja pian taito riitti yrittämiseen.
                  Talvella opiskelen ja valmistaudun seuraavaan kesään. Seinäkalusto on omaa. Vakuutukset ja rekisterit ovat kunnossa.
                </p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-6">
              Teemme omakotitalojen, paritalojen ja mökkien ulkotyöt.
            </p>
          </div>
        </div>
      </section>

      {/* Arvostelunosto: sijoitus ja valinta src/data/arvostelusijoitus.ts */}
      <ArvosteluNosto polku="/meista" />

      <TestimonialsMarquee title="Mitä asiakkaat sanovat meistä?" />

      <MeistaLuvut />

      <section className="section-padding osio">
        <div className="section-container">
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-6">Miksi tilata meiltä?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Eerik ja Eemil tekevät työn itse. Arviokäynti on ilmainen, ja tarjouksessa on kiinteä hinta. Työlle annamme kirjallisen
                takuun. {VASTAUSLUPAUS} Lopuksi siivoamme jälkemme.
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-6">Faktat</h2>
              <dl className="kortti overflow-hidden divide-y divide-border">
                {faktalaatikko.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 px-4 py-3 text-sm">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-foreground font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={generalFAQ} />
      <ServiceContactSection variant="general" />
      <ToimintaAlueetBanner />
      </Rytmi>
    </div>
  );
};

export default Meista;
