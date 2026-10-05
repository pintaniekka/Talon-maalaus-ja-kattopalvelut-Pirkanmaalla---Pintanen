import { Check } from "lucide-react";
import { Award, Users, Target } from "@/components/icons/BrandIcons";
import PageHero from "@/components/PageHero";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import SEO from "@/components/SEO";
import { generalFAQ } from "@/data/faqData";
import { HERO_BASE, staticSeo } from "@/data/seo";
import { LUVUT, TAKUU, TOIMINTA_ALUE } from "@/data/company";
import { getStorageUrl } from "@/lib/storage";

const eerikImage = getStorageUrl("Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp");
const eemilImage = getStorageUrl("Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp");

const values = [
  { icon: Award, title: "Laatu", description: "Pohjatyöt tehdään kunnolla. Siksi maali kestää." },
  { icon: Users, title: "Suora puhe", description: "Kerromme suoraan, mitä katto tai seinä tarvitsee ja mitä ei." },
  { icon: Target, title: "Luotettavuus", description: "Pidämme kiinni sovitusta hinnasta ja aikataulusta." },
];

/** Yksi lukusarja koko sivustolle (V23, korjaus 8). */
const facts = [
  { number: LUVUT.kohteet, label: "kohdetta" },
  { number: LUVUT.pinnoitetutKatot, label: "pinnoitettua kattoa" },
  { number: LUVUT.maalatutTalot, label: "maalattua taloa" },
  { number: "2–5 v", label: "takuu työlle" },
];

const faktalaatikko = [
  ["Yritys", "Pintanen Oy"],
  ["Y-tunnus", "3525786-9"],
  ["Yrittäjät", "Eerik Pitkänen (katot) ja Eemil Pitkänen (seinät)"],
  ["Toiminta-alue", `${TOIMINTA_ALUE.charAt(0).toUpperCase()}${TOIMINTA_ALUE.slice(1)}`],
  ["Palvelut", "Tiilikaton pinnoitus ja talon ulkomaalaus"],
  ["Takuu", `Pinnoitus ${TAKUU.pinnoitus}, maalaus ${TAKUU.maalaus}`],
];

/**
 * Meistä. Yksi totuus yrityksestä (korjaus 8): tamperelainen yritys (Eerikin päätös 5.10.2026: Oulua ei mainita), työt Pirkanmaalla ja Kanta-Hämeessä,
 * vain ulkotyöt omakotitaloihin, paritaloihin ja mökkeihin. Tekstit lyhennetty (S27–S29).
 */
const Meista = () => {
  const crumbs = [{ name: "Meistä" }];
  return (
    <div>
      <SEO {...staticSeo["/meista"]} breadcrumbs={crumbs} />

      <PageHero
        eyebrow="Pintanen Oy · perheyritys"
        title={
          <>
            Veljekset, jotka tekevät työn <span className="text-accent-ink">itse</span>
          </>
        }
        lead={
          <>
            Pintanen on perheyritys, joka toimii Pirkanmaalla ja Kanta-Hämeessä. <strong className="text-foreground">Eerik pinnoittaa tiilikatot</strong>{" "}
            ja <strong className="text-foreground">Eemil maalaa talot</strong>. Ei välikäsiä eikä alihankkijoita.
          </>
        }
        primary={{ to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" }}
        secondary={{ to: "/referenssit/", label: "Katso kuvia töistämme" }}
        trust="yleinen"
        image={{ base: HERO_BASE.meista, alt: "Eerik Pitkänen tiilikatolla Tampereella" }}
        breadcrumbs={crumbs}
      />

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6">Mikä on Pintanen?</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Pintanen on nuori tamperelainen perheyritys. Teemme töitä Pirkanmaalla ja Kanta-Hämeessä. Yritys on uusi, mutta
                olemme molemmat tehneet tätä työtä yli viisi vuotta.
              </p>
              <p>
                Me olemme veljekset <strong className="text-foreground">Eerik ja Eemil</strong>. Eerik hoitaa tiilikatot ja Eemil seinät. Kun katto-
                ja seinäosaaminen yhdistyivät, syntyi Pintanen.
              </p>
              <p>
                Meillä ei ole välikäsiä eikä toimistoa. Siksi hinta on kohtuullinen ja tiedät aina, kuka työn tekee. Sama henkilö, joka antaa
                tarjouksen, tulee myös tekemään työn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-accent-light">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-8 text-center">Kaksi veljestä, kaksi työtä</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
                <img src={eerikImage} alt="Eerik Pitkänen" width={112} height={112} className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 mb-4" loading="lazy" decoding="async" />
                <h3 className="text-xl font-bold text-foreground mb-2">Eerik pinnoittaa tiilikatot</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Eerik pesee katon painepesulla, vaihtaa rikkinäiset tiilet uusiin ja maalaa katon ruiskulla kahteen kertaan. Ahtaat paikat
                  hän maalaa telalla tai käsin. Takuu on 5 vuotta.
                </p>
              </div>
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
                <img src={eemilImage} alt="Eemil Pitkänen" width={112} height={112} className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 mb-4" loading="lazy" decoding="async" />
                <h3 className="text-xl font-bold text-foreground mb-2">Eemil maalaa talojen ulkoseinät</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Eemil pesee seinät homepesuaineella, kaapii irtoavan maalin, pohjamaalaa paljaat kohdat ja maalaa pintamaalin pensselillä.
                  Takuu on 2 vuotta.
                </p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-6">
              Teemme omakotitalojen, paritalojen ja mökkien ulkotyöt.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {facts.map((fact) => (
              <div key={fact.label} className="card-elevated text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{fact.number}</div>
                <div className="text-sm text-muted-foreground">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4">Arvomme</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="card-elevated text-center bg-card">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-6">Miksi tilata meiltä?</h2>
              <div className="space-y-3">
                {[
                  "Yrittäjät tekevät työn itse",
                  "Kirjallinen takuu kaikille töille",
                  "Ilmainen arviokäynti",
                  "Kiinteä hinta tarjouksessa",
                  "Nopea vastaus yhteydenottoihin",
                  "Siivoamme aina jälkemme",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-3 bg-card rounded-xl">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-accent-ink" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-6">Faktat</h2>
              <dl className="bg-card rounded-2xl border border-border/50 divide-y divide-border">
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
    </div>
  );
};

export default Meista;
