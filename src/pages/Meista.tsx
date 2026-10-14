import PageHero from "@/components/PageHero";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
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

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6">Mikä on Pintanen?</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Me olemme veljekset Eerik ja Eemil. Eerik aloitti kattotyöt 2022 ja perusti Pintanen Oy:n Tampereelle 2025. Eemil hoitaa
                seinäpuolen itsenäisesti.
              </p>
              <p>Meillä ei ole välikäsiä eikä raskasta kulurakennetta. Soitat suoraan Eerikille tai Eemilille.</p>
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
                  Pesen ja maalaan kattoja kesäkaudet, noin 30–40 kattoa kesässä. Talvet kuluvat koulun penkillä ja urakoita myydessä.
                  Aloitin kattotyöt 2022 toisen yrityksen työntekijänä ja perustin Pintanen Oy:n 2025. Kattokaluston olen hankkinut itse,
                  ja se on yrityksen omaa. Vakuutukset ja työturvallisuuskortti ovat kunnossa.
                </p>
              </div>
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
                <img src={eemilImage} alt="Eemil Pitkänen" width={112} height={112} className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 mb-4" loading="lazy" decoding="async" />
                <h3 className="text-xl font-bold text-foreground mb-2">Eemil maalaa talojen ulkoseinät</h3>
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

      <section className="section-padding bg-accent-light">
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
