import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import FAQSection from "@/components/FAQSection";
import RelatedArticles from "@/components/RelatedArticles";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import ServiceContactSection from "@/components/ServiceContactSection";
import { PriceSectionHeading, Checklist } from "@/components/hinnat/PriceSections";
import { staticSeo, HERO_BASE } from "@/data/seo";
import { KOTITALOUSVAHENNYS, TAKUU } from "@/data/company";
import { PINNOITUS_HINTA } from "@/data/tyovaiheet";

/**
 * Ilmainen tiilikaton kuntotarkastus (yöajo 27.10.2026, paketti 5). Kaikki tiedot ovat samoja kuin
 * pinnoitus- ja hintasivuilla: mitä tarkastetaan, mitä asiakas saa ja milloin tulemme. Etätarjous on mahdollinen
 * (Eerik 27.10.2026): kuvat ja arvio katon koosta riittävät yleensä, tarkat mitat tai kuntoraportti ovat iso plussa.
 */
const tarkastettavat = [
  "Tiilet: kuluneisuus, halkeamat ja lohkeamat. Rikkinäiset tiilet vaihdamme uusiin pinnoituksen yhteydessä.",
  "Saumat ja harjat.",
  "Piipun ympärys.",
  "Läpiviennit, kuten tuuletusputket.",
  "Aluskate: pienet vauriot korjaamme pinnoituksen yhteydessä.",
  "Kasvusto: sammal, jäkälä ja lika.",
  "Sadevesikourut.",
];

const faqItems = [
  {
    question: "Maksaako kuntotarkastus jotain?",
    answer: "Ei. Kuntotarkastus ja kirjallinen tarjous ovat ilmaisia.",
  },
  {
    question: "Pitääkö minun olla paikalla?",
    answer: "Ei välttämättä. On hyvä olla paikalla, koska käymme katon ja tarjouksen läpi yhdessä. Sovimme ajan, joka sopii sinulle, myös iltaisin ja viikonloppuisin.",
  },
  {
    question: "Saanko tarjouksen etänä kuvien perusteella?",
    answer:
      "Kyllä. Yleensä kuvat katosta ja arvio katon koosta riittävät. Tarkat mitat tai kuntoraportti ovat iso plussa. Ilmainen kuntotarkastus paikan päällä on silti tarkin tapa.",
  },
  {
    question: "Saanko hinta-arvion jo ennen käyntiä?",
    answer:
      'Kyllä. <a href="/hintalaskuri/?palvelu=pinnoitus">Hintalaskuri</a> antaa suuntaa antavan arvion katon koon ja jyrkkyyden mukaan. Tarkan, kiinteän hinnan saat kirjallisessa tarjouksessa kuntotarkastuksen jälkeen.',
  },
  {
    question: "Mitä jos katto ei tarvitse pinnoitusta?",
    answer:
      "Sanomme sen suoraan. Jos tiilen pinta on vielä ehjä, pinnoitus ei ole ajankohtainen. Jos taas aluskate vuotaa tai tiiliä on rikki laajalti, kerromme, että katto kannattaa uusia.",
  },
  {
    question: "Milloin tiilikaton pinnoitus on ajankohtainen?",
    answer:
      "Yleensä noin 15 vuoden iässä, kun tiilen väri on haalistunut, pinta tuntuu karhealta ja sammal kasvaa nopeasti. Pinnoitettu katto kestää jopa 15 vuotta pidempään.",
  },
  {
    question: "Katsotteko samalla myös seinät?",
    answer:
      'Kyllä, jos haluat tarjouksen myös <a href="/talon-maalaus-pirkanmaa/">talon maalauksesta</a>. Katto ja seinät samalla kertaa on edullisempi pakettihinta.',
  },
  {
    question: "Miten maksu tapahtuu?",
    answer: "Kun hyväksyt tarjouksen, lähetämme ennakkolaskun, joka on 10 % hinnasta. Loput laskutamme, kun työ on valmis ja olemme käyneet sen yhdessä läpi.",
  },
];

const crumbs = [{ name: "Tiilikaton pinnoitus", path: "/tiilikaton-pinnoitus-pirkanmaa" }, { name: "Ilmainen kuntotarkastus" }];

const IlmainenKuntotarkastus = () => {
  const seo = staticSeo["/ilmainen-kuntotarkastus"];
  return (
    <>
      <SEO {...seo} breadcrumbs={crumbs} />

      <PageHero
        eyebrow="Ilmainen kuntotarkastus · Pirkanmaa"
        title={
          <>
            Ilmainen tiilikaton kuntotarkastus <span className="text-accent-ink">Pirkanmaalla</span>
          </>
        }
        lead={
          <>
            Tulemme katsomaan kattosi ilmaiseksi, yleensä samalla viikolla. Käynnin jälkeen saat kirjallisen tarjouksen kiinteällä
            hinnalla. Tiilikaton pinnoitus maksaa yleensä <strong className="text-foreground">{PINNOITUS_HINTA}</strong>, ja takuu on{" "}
            {TAKUU.pinnoitus}.
          </>
        }
        primary={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
        secondary={{ to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" }}
        trust="pinnoitus"
        image={{ base: HERO_BASE.meista, alt: "Eerik Pitkänen tiilikatolla kuntotarkastuksessa" }}
        badge={{ title: "Eerik tekee työn", text: "Tarkastaa katon itse ja vastaa jäljestä." }}
        breadcrumbs={crumbs}
      />

      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <PriceSectionHeading
            title="Mitä kuntotarkastuksessa katsotaan?"
            intro="Eerik käy katon läpi itse. Katsomme seitsemän asiaa."
          />
          <Checklist items={tarkastettavat} />
        </div>
      </section>

      <section className="section-padding bg-accent-light">
        <div className="section-container max-w-3xl mx-auto">
          <PriceSectionHeading title="Mitä saat käynnin jälkeen?" />
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Saat kirjallisen tarjouksen kiinteällä hinnalla. Hintaan kuuluu koko työ: pesu, kasvustontorjunta-aine, rikkinäisten
              tiilien vaihto uusiin, pohjamaali ja pintamaali ruiskulla sekä siivous. Ylimääräisiä kuluja ei tule.
            </p>
            <p>
              Työn osuus on laskussa eriteltynä, joten{" "}
              <Link to="/kotitalousvahennys/" className="text-primary font-semibold hover:underline">
                kotitalousvähennyksen
              </Link>{" "}
              hakeminen on helppoa. {KOTITALOUSVAHENNYS}
            </p>
            <p>
              Pinnoitukselle saat {TAKUU.pinnoitus} kirjallisen takuun. Hintaesimerkit näet sivulta{" "}
              <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/" className="text-primary font-semibold hover:underline">
                tiilikaton pinnoituksen hinta
              </Link>
              , ja työn vaiheet kerromme sivulla{" "}
              <Link to="/tiilikaton-pinnoitus-pirkanmaa/" className="text-primary font-semibold hover:underline">
                tiilikaton pinnoitus Pirkanmaalla
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <PriceSectionHeading title="Milloin tulemme?" />
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Kuntotarkastus onnistuu yleensä samalla viikolla, myös iltaisin ja viikonloppuisin. Sovimme ajan, joka sopii sinulle,
              koska käymme katon ja tarjouksen läpi yhdessä.
            </p>
            <p>
              Pinnoitukset teemme huhti–toukokuusta elo–syyskuuhun. Työn ajankohta sovitaan kirjallisesti, kun olet hyväksynyt
              tarjouksen. Toimimme Pirkanmaalla ja lähikunnissa.
            </p>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} />

      <RelatedArticles categories={["katto"]} />

      <ToimintaAlueetBanner service="pinnoitus" />
      <ServiceContactSection variant="katto" />
    </>
  );
};

export default IlmainenKuntotarkastus;
