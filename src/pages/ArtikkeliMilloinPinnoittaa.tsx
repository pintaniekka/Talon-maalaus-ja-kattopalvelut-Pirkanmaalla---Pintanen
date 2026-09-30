import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import ServicePageHero from '@/components/ServicePageHero';
import ServiceContactSection from '@/components/ServiceContactSection';
import ToimintaAlueetBanner from '@/components/ToimintaAlueetBanner';
import FAQSection from '@/components/FAQSection';

import { getResponsiveSrc, getResponsiveSrcSet, type ResponsiveWidth } from '@/lib/storage';

const ARTICLE_WIDTHS: ResponsiveWidth[] = [400, 800, 1200];
const srcSet = (base: string) => getResponsiveSrcSet(base, ARTICLE_WIDTHS);

const heroBase = 'punainen-tiilikatto-kattopinnoitus-ja-huolto-jalkeen';
const img1 = 'haalistunut-punainen-tiilikatto-ennen-pinnoitusta';
const img2 = 'sammaleinen-tiilikatto-ennen-mekaanista-puhdistusta';
const img3 = 'uutta-vastaava-tiilikatto-pesu-ja-suojakasittely';
const imgWide = 'tummanharmaa-tiilikaton-pinnoitus-ja-huolto-jalkeen';

const trustStats = [
  { value: '5,0 / 5', label: 'Google-arvostelut' },
  { value: 'Yli 100', label: 'Pinnoitettua kattoa' },
  { value: '5 vuotta', label: 'Kirjallinen takuu' },
];

const faqItems = [
  {
    question: 'Kuinka paljon tiilikaton pinnoitus maksaa?',
    answer:
      'Hinta riippuu aina katon pinta-alasta, jyrkkyydestä ja nykykunnosta, mutta se on poikkeuksetta vain murto-osa täysin uuden katon asennuksen hinnasta. Teemme aina ilmaisen arviokäynnin kohteessa, jonka pohjalta saat tarkan ja pitävän tarjouksen. Työ on myös täysin kotitalousvähennyskelpoista.',
  },
  {
    question: 'Kauanko tiilikaton pinnoitustyö kestää?',
    answer:
      'Tyypillinen omakotitalon tiilikaton huoltoprosessi pesusta valmiiseen, kahteen kertaan maalattuun pintaan vie kohteesta riippuen 2–4 työpäivää. Työ tehdään ulkona, joten se ei häiritse normaalia asumista talossa.',
  },
  {
    question: 'Kuinka pitkän takuun annatte työlle?',
    answer:
      'Myönnämme kaikille tekemillemme tiilikaton pinnoituksille täyden 5 vuoden kirjallisen takuun. Käytämme työssä vain markkinoiden parhaita, Suomen sääolosuhteisiin suunniteltuja ammattilaistason materiaaleja.',
  },
  {
    question: 'Kannattaako katto pestä ja pinnoittaa itse?',
    answer:
      'Kevyempi roskien poisto onnistuu omatoimisesti, mutta pinnoitusta edeltävä syväpesu vaatii erittäin tehokkaan polttomoottoripesurin, jotta huokosiin kertynyt lika ja sammal saadaan oikeasti irti. Myös pinnoitteen levittäminen kestävästi ja tasaisesti edellyttää ammattitason korkeapaineruiskua. Ammattilaisen tekemänä saat työlle takuun ja varmuuden siitä, ettei pesuvettä paineta vahingossa aluskatteen läpi rakenteisiin.',
  },
  {
    question: 'Mihin vuodenaikaan pinnoituksen voi tehdä?',
    answer:
      'Katon pesuja ja pinnoituksia voidaan tehdä keväästä pitkälle syksyyn. Sääolosuhteet ovat ainoa rajoittava tekijä: lämpötilan on oltava plussan puolella ja katon pinnan on ehdittävä kuivua kunnolla pesun ja maalauskertojen välissä. Asiantuntijamme arvioivat aina sääikkunan sopivuuden ennen työn aloitusta.',
  },
];

const CTAButton = ({ children, to = '#yhteystiedot' }: { children: React.ReactNode; to?: string }) => (
  <a
    href={to}
    className="inline-block bg-accent text-accent-foreground font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
  >
    {children}
  </a>
);

const SectionImage = ({
  base,
  alt,
  side = 'left',
  children,
}: {
  base: string;
  alt: string;
  side?: 'left' | 'right';
  children: React.ReactNode;
}) => (
  <section className="section-padding bg-background">
    <div className="section-container">
      <div
        className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto ${
          side === 'right' ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-md"
        >
          <img
            src={getResponsiveSrc(base)}
            srcSet={srcSet(base)}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt={alt}
            className="w-full h-auto object-cover block"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  </section>
);

const ArtikkeliMilloinPinnoittaa = () => {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Milloin tiilikatto pitää pinnoittaa? — 5 merkkiä, että aika on nyt',
    description:
      'Epäiletkö, onko kattosi pinnoituksen aika? Lue 5 selkeää merkkiä, jotka kertovat milloin tiilikaton pinnoitus on välttämätön.',
    image: getResponsiveSrc(heroBase),
    author: { '@type': 'Organization', name: 'Pintanen Oy' },
    publisher: {
      '@type': 'Organization',
      name: 'Pintanen Oy',
    },
  };

  return (
    <div>
      <SEO
        title="Milloin tiilikatto pitää pinnoittaa? 5 merkkiä"
        description="Epäiletkö, onko kattosi pinnoituksen aika? Lue 5 selkeää merkkiä, jotka kertovat milloin tiilikaton pinnoitus on välttämätön. Ilmainen arvio Pirkanmaalla."
        ogImage={getResponsiveSrc(heroBase)}
      />
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <ServicePageHero
        title=""
        subtitle=""
        backgroundImage={getResponsiveSrc(heroBase)}
        backgroundSrcSet={srcSet(heroBase)}
      >
        <div className="bg-black/45 rounded-2xl p-6 max-w-3xl mx-auto text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Milloin tiilikatto pitää pinnoittaa? —{' '}
            <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">5 merkkiä</span>, että aika on nyt
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
            Tiilikatto kannattaa yleensä pinnoittaa, kun <strong>väri haalistuu</strong>, pinta muuttuu <strong>huokoiseksi</strong> tai <strong>sammal alkaa palata nopeasti</strong> puhdistuksen jälkeen. Useimmiten tämä tapahtuu noin <strong>10–15 vuoden kohdalla</strong>.
          </p>
        </div>
      </ServicePageHero>

      {/* Trust grid */}
      <section className="py-10 bg-background">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {trustStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-5 text-center shadow-sm border border-border/50"
              >
                <p className="text-2xl md:text-3xl font-bold text-accent mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro: Pitääkö tiilikatto pinnoittaa */}
      <section className="section-padding bg-secondary">
        <div className="section-container max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">Pitääkö tiilikatto pinnoittaa?</h2>
            <ul className="space-y-3 text-lg text-foreground list-disc list-inside mb-6">
              <li>Väri on haalistunut</li>
              <li>Sammal palaa nopeasti</li>
              <li>Pinta tuntuu karhealta</li>
              <li>Tiilissä näkyy halkeamia</li>
              <li>Katto on yli 10 vuotta vanha</li>
            </ul>
            <p className="text-lg text-muted-foreground">
              → Jos tunnistat näistä useamman, <strong className="text-foreground">pinnoitus kannattaa yleensä tehdä lähiaikoina</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 1. Väri haalistunut */}
      <SectionImage base={img1} alt="Haalistunut tiilikatto ennen pinnoitusta — suojapinta kulunut" side="left">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
          1. Väri on haalistunut tai muuttunut epätasaiseksi
        </h2>
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            Uusi tiilikatto on väriltään <strong className="text-foreground">tasainen ja kiinteä</strong>. Kun alkuperäinen tehdaspinnoite alkaa kulua, väri haalistuu — usein ensin etelään tai länteen päin olevilla lappeilla.
          </p>
          <p>
            Jos kattosi näyttää "kulahtaneelta" tai väri vaihtelee lappeiden välillä, suojapinta on ohentunut. Tiili on alkanut <strong className="text-foreground">imeä vettä</strong>, mikä kiihdyttää rapautumista erityisesti pakkasen tullessa.
          </p>
        </div>
      </SectionImage>

      {/* 2. Sammal palaa */}
      <SectionImage base={img2} alt="Sammaloitunut tiilikatto ennen ammattimaista puhdistusta" side="right">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
          2. Sammal kasvaa nopeasti takaisin puhdistuksen jälkeen
        </h2>
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            Sammal tarvitsee kasvualustakseen <strong className="text-foreground">huokoisen ja kostean pinnan</strong>. Jos olet puhdistanut katon muutama vuosi sitten mutta sammal on jo palannut, se kertoo yhden asian: tiilen pinta on niin kulunut, että se imee kosteutta ja tarjoaa sammaleelle ihanteelliset kasvuolosuhteet.
          </p>
          <p>
            Pelkkä puhdistus ei enää riitä — tiili tarvitsee <strong className="text-foreground">uuden suojaavan pinnoitteen</strong>, joka tekee pinnasta vettä hylkivän ja estää sammalen kiinnittymisen.
          </p>
          <div className="pt-2">
            <Link
              to="/katon-puhdistus-pirkanmaa"
              className="inline-block bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Tiilikaton mekaaninen puhdistus ja käsittely →
            </Link>
          </div>
        </div>
      </SectionImage>

      {/* 3. Karhea pinta */}
      <SectionImage base={img3} alt="Tuore tiilikaton pinnoite lähikuvassa — vettähylkivä sileä pinta" side="left">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
          3. Tiilien pinta tuntuu karhealta tai hiekkapaperimaiselta
        </h2>
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            Tämän testin voit tehdä itse: kosketa katon tiiltä turvallisesti maasta käsin tai tikkaita pitkin. Uusi tai hyväkuntoinen tiili tuntuu <strong className="text-foreground">sileältä ja kovalta</strong>. Kulunut tiili tuntuu karhealta — lähes kuin hiekkapaperista.
          </p>
          <p>
            Karhea pinta tarkoittaa, että tiilen suojakerros on murtunut ja tiili on muuttunut huokoiseksi. Huokoinen tiili imee vettä, joka talvella jäätyy tiilen sisällä ja laajentuu — tästä syntyy <strong className="text-foreground">pakkasrapautuminen</strong>, joka halkaisee tiilet vuosien saatossa.
          </p>
        </div>
      </SectionImage>

      {/* Editorial Google review */}
      <section className="py-16 bg-background">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto relative"
          >
            {/* Subtle background slab */}
            <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] -rotate-1" aria-hidden="true" />

            <div className="relative bg-card border border-primary/10 rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="flex flex-col items-center text-center">
                {/* Stars + Google label */}
                <div className="flex flex-col items-center gap-3 mb-8">
                  <div className="flex gap-1" role="img" aria-label="5 tähteä viidestä">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6" style={{ fill: '#ffec4e' }} viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
                      Google-arvostelu
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="max-w-2xl">
                  <p className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed">
                    ”Työt hoitui sovitusti ja työn jälki siistiä. Iso suositus kaikille kattohuoltoa tarvitseville!”
                  </p>
                </blockquote>

                {/* Attribution */}
                <div className="mt-10 flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg mb-3">
                    JJ
                  </div>
                  <cite className="not-italic font-semibold text-foreground">Jukka Jukarainen</cite>
                </div>

                {/* Integrated CTA */}
                <div className="mt-12 pt-8 border-t border-border/60 w-full flex justify-center">
                  <a
                    href="#yhteystiedot"
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-bold transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
                  >
                    <span>Pyydä Pintasen ilmainen arvio tiilikaton pinnoituksesta</span>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* 4. Halkeamia */}
      <section className="section-padding bg-secondary">
        <div className="section-container max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
              4. Tiilessä näkyy halkeamia tai lohkeamia
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Halkeilevat tiilet ovat merkki siitä, että <strong className="text-foreground">vesi on jo päässyt tiilen sisärakenteeseen</strong>. Jäätymis-sulamissykli on alkanut tehdä tuhojaan. Tässä vaiheessa tilanne on jo kiireellisempi — yksittäiset rikkinäiset tiilet vaihdetaan uusiin ennen pinnoitusta.
              </p>
              <p>
                Jos halkeamia on paljon, pelkkä pinnoitus ei enää riitä vaan katto vaatii laajemman kuntoarvion. Siksi teemmekin <strong className="text-foreground">jokaiselle kohteelle ilmaisen arviokäynnin</strong> ennen työn aloittamista.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Yli 10 vuotta */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
              5. Katto on yli 10–15 vuotta vanha eikä sitä ole koskaan pinnoitettu
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground mb-8">
              <p>
                Tiilikaton tehdaspinnoite kestää tyypillisesti <strong className="text-foreground">10–15 vuotta</strong> riippuen ilmasto-olosuhteista, katon suuntauksesta ja puiden varjostuksesta. Jos kattosi on tässä iässä eikä sitä ole koskaan huollettu ammattimaisesti, pinnoituksen aika on todennäköisesti jo käsillä — vaikka selviä vaurioita ei vielä näkyisi.
              </p>
              <p>
                Ennaltaehkäisevä pinnoitus on aina <strong className="text-foreground">halvempaa</strong> kuin rikkinäisten tiilien vaihto tai pahimmassa tapauksessa koko katon uusiminen.
              </p>
            </div>
            <CTAButton>Pyydä ilmainen arvio</CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Mitä pinnoitus tarkoittaa + side image */}
      <section className="section-padding bg-secondary">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-md order-2 md:order-1"
            >
              <img
                src={getResponsiveSrc(imgWide)}
                srcSet={srcSet(imgWide)}
                sizes="(min-width: 768px) 50vw, 100vw"
                alt="Ammattimaisesti pinnoitettu tummanharmaa tiilikatto Pirkanmaalla"
                className="w-full h-auto object-cover block"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
                Mitä pinnoitus käytännössä tarkoittaa?
              </h2>
              <ul className="space-y-3 text-lg text-foreground list-disc list-inside mb-6">
                <li>Tiilikaton huolellinen pesu ja huuhtelu.</li>
                <li>Kasvustonestokäsittely, joka tuhoaa sammalen juuret syvältä tiilestä.</li>
                <li>Rikkinäisten tiilien vaihto uusiin.</li>
                <li>Kaksi kerrosta laadukasta pinnoitusmaalia ruiskutettuna.</li>
              </ul>
              <p className="text-lg text-muted-foreground mb-6">
                Työ kestää <strong className="text-foreground">2–4 työpäivää</strong>. <strong className="text-foreground">5 vuoden kirjallinen takuu</strong>. Kotitalousvähennys.
              </p>
              <Link
                to="/tiilikaton-pinnoitus-pirkanmaa"
                className="inline-block bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Tiilikaton pinnoitus →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Closing CTA intro */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
              Epäiletkö kattosi kuntoa? Pyydä ilmainen arvio.
            </h2>
            <p className="text-lg text-muted-foreground">
              Paras tapa selvittää kattosi todellinen kunto on <strong className="text-foreground">ilmainen arviokäynti</strong>. Tulemme paikan päälle, arvioimme katon kunnon ja kerromme rehellisesti, kannattaako pinnoitus tehdä nyt vai vielä odottaa.
            </p>
          </motion.div>
        </div>
      </section>

      <ServiceContactSection variant="katto" />
      <FAQSection items={faqItems} />
      <ToimintaAlueetBanner />
    </div>
  );
};

export default ArtikkeliMilloinPinnoittaa;
