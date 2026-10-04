import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const bulletVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const SEOTextSection = () => {
  const bullets = [
    { bold: "Ei välikäsiä:", text: "Vastaamme itse työn laadusta alusta loppuun." },
    { bold: "Maksuton arviokäynti:", text: "Tulemme paikan päälle kartoittamaan tilanteen veloituksetta." },
    { bold: "Takuutyö:", text: "5 vuoden takuu pinnoituksille ja 2 vuoden takuu maalauksille." },
    { bold: "Kotitalousvähennys:", text: "Kaikki työmme oikeuttavat verotuksessa tehtävään kotitalousvähennykseen (40 % työn osuudesta)." },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="section-container max-w-4xl mx-auto space-y-20">
        {/* Block 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-style text-3xl md:text-4xl text-accent-ink mb-6">
            Luotettava maalausliike ja kattoasiantuntija Pirkanmaalla
          </h2>
           <div className="space-y-5 text-foreground/80 leading-relaxed text-base">
            <p>
              Joko talosi julkisivu on menettänyt uutuuden viehätyksen tai onko tiilikattosi alkanut kerätä sammalta? <strong className="text-foreground">Pintanen Oy</strong> on pirkanmaalainen <strong className="text-foreground">maalausliike</strong> ja <strong className="text-foreground">kattohuoltojen ammattilainen</strong>. Yrityksemme on perustettu kahden veljeksen, <strong className="text-foreground">Eerikin ja Eemilin</strong>, toimesta. Meidän tahtomme on tarjota <strong className="text-foreground">korkealaatuista ja kestävää pintakäsittelyä</strong> ilman turhia välikäsiä.
            </p>
            <p>
              Toimimme laajasti <strong className="text-foreground">koko Pirkanmaan alueella</strong>, palvellen asiakkaitamme muun muassa{" "}
              <Link to="/maalauspalvelut-tampere" className="text-primary hover:underline">Tampereella</Link>,{" "}
              <Link to="/maalauspalvelut-nokia" className="text-primary hover:underline">Nokialla</Link>,{" "}
              <Link to="/maalauspalvelut-ylojarvi" className="text-primary hover:underline">Ylöjärvellä</Link>,{" "}
              <Link to="/maalauspalvelut-sastamala" className="text-primary hover:underline">Sastamalassa</Link>,{" "}
              <Link to="/maalauspalvelut-kangasala" className="text-primary hover:underline">Kangasalla</Link> ja{" "}
              <Link to="/maalauspalvelut-hameenkyro" className="text-primary hover:underline">Hämeenkyrössä</Link>.
            </p>
            <p>
              Oli kyseessä sitten <strong className="text-foreground">omakotitalon ulkomaalaus</strong>, kesämökin huoltomaalaus tai <strong className="text-foreground">taloyhtiön tiilikaton pinnoitus</strong>, me hoidamme urakan alusta loppuun saakka reippaalla asenteella. Tiedämme, että Suomen vaihtelevat sääolosuhteet asettavat rakennusten ulkopinnoille kovat vaatimukset. Siksi käytämme työssämme vain <strong className="text-foreground">alan parhaita menetelmiä</strong> ja <strong className="text-foreground">laadukkaimpia materiaaleja</strong>.
            </p>
          </div>
        </motion.div>

        {/* Block 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="heading-style text-2xl md:text-3xl text-accent-ink mb-6">
            Tiilikaton pinnoitus ja puhdistus – jatka kattosi elinikää
          </h3>
          <div className="space-y-5 text-foreground/80 leading-relaxed text-base">
            <p>
              Tiesitkö, että huonokuntoisen näköistä tiilikattoa ei useinkaan tarvitse uusia kokonaan? Ammattitaitoisesti tehty <strong className="text-foreground">tiilikaton pinnoitus</strong> ja <strong className="text-foreground">sammaleenpuhdistus</strong> ovat <strong className="text-foreground">kustannustehokkaita</strong> tapoja palauttaa vanha katto uudenveroiseen loistoon. Säännöllinen katon huolto ja pinnoitus estävät kosteuden pääsyn kattorakenteisiin, ehkäisevät <strong className="text-foreground">pakkasrapautumista</strong> ja pidentävät katon käyttöikää jopa <strong className="text-foreground">kymmenillä vuosilla</strong>.
            </p>
            <p>
              Me Pintasella teemme tiilikaton pinnoitukset, huollot ja puhdistukset <strong className="text-foreground">huolellisena käsityönä</strong>. <strong className="text-foreground">Eerik</strong> vastaa tiilikattokohteistamme ja varmistaa, että jokainen neliömetri käsitellään huolellisesti. Annamme tekemillemme tiilikaton pinnoituksille aina reilun <strong className="text-foreground">5 vuoden takuun</strong>.
            </p>
          </div>
        </motion.div>

        {/* Block 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="heading-style text-2xl md:text-3xl text-accent-ink mb-6">
            Talon ulkomaalaus suojaa kotiasi säiltä
          </h3>
          <div className="space-y-5 text-foreground/80 leading-relaxed text-base">
            <p>
              Laadukas <strong className="text-foreground">ulkomaalaus</strong> on paitsi esteettinen kasvojenkohotus, myös kotisi tärkein suojakilpi. Oikein tehty pohjatyö ja laadukas maalipinta suojaavat puuverhousta auringon <strong className="text-foreground">UV-säteilyltä</strong>, sateelta ja <strong className="text-foreground">homeelta</strong>. <strong className="text-foreground">Eemil</strong> johtaa Pintasen maalausprojekteja vuosien kokemuksella, varmistaen, että maali pysyy seinässä ja rajaukset ovat viivasuoria.
            </p>
            <p>
              Toteutamme talojen maalaukset aina <strong className="text-foreground">avaimet käteen -periaatteella</strong>. Tämä tarkoittaa, että me huolehdimme kaikesta: huolellisista pesuista ja homeenpoistoista, kaapimisesta, suojauksista, itse maalaustyöstä ja loppusiivouksesta. Käytämme vain <strong className="text-foreground">Suomessa suunniteltuja ja valmistettuja huippumaaleja</strong>. Myönnämme ulkomaalaustöillemme <strong className="text-foreground">2 vuoden takuun</strong>, jotta voit nukkua yösi rauhassa.
            </p>
          </div>
        </motion.div>

        {/* Block 4 - Miksi valita Pintanen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="heading-style text-2xl md:text-3xl text-accent-ink mb-6">
            Miksi valita Pintanen huoltamaan kotisi?
          </h3>
          <div className="space-y-5 text-foreground/80 leading-relaxed text-base">
            <p>
              Markkinoilla on monia toimijoita, mutta me erotumme joukosta <strong className="text-foreground">henkilökohtaisella palvelulla</strong> ja <strong className="text-foreground">suoraviivaisella toimintamallilla</strong>. Kun pyydät meiltä tarjouksen, kohtaat <strong className="text-foreground">samat henkilöt, jotka tulevat suorittamaan itse työn</strong>.
            </p>

            <ul className="space-y-4 list-none pl-0">
              {bullets.map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={bulletVariants}
                  className="flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-accent-ink" />
                  </div>
                  <span>
                    <strong className="text-foreground">{item.bold}</strong> {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-6">
              Älä anna kattosi sammaloitua tai julkisivusi rapistua. Ota yhteyttä luotettavaan pirkanmaalaiseen tekijään ja{" "}
              <Link to="/tarjouspyynto" className="text-primary font-semibold hover:underline">pyydä ilmainen kuntokartoitus jo tänään!</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SEOTextSection;
