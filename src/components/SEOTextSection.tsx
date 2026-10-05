import ResponsiveImage from "@/components/ResponsiveImage";
import { Link } from "react-router-dom";
import { PINNOITUS_HINTA, MAALAUS_HINTA } from "@/data/tyovaiheet";

/**
 * Etusivun tekstiosio tiivistettynä kolmeen kappaleeseen (8.3): maalausliike ja kattomaalari
 * Pirkanmaalla, tiilikaton pinnoitus, talon ulkomaalaus. Linkit paikkakuntasivuille ankkureilla,
 * joissa on palvelu ja paikka (korjaus 2).
 */
const SEOTextSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container max-w-6xl mx-auto space-y-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-style text-3xl md:text-4xl text-accent-ink mb-6">Maalausliike ja kattomaalari Pirkanmaalla</h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed text-base">
            <p>
              <strong className="text-foreground">Pintanen Oy</strong> on perheyritys, jonka perustivat veljekset Eerik ja Eemil Pitkänen.
              Pinnoitamme tiilikattoja ja maalaamme talojen ulkoseiniä omakotitaloihin, paritaloihin ja mökkeihin. Teemme työn itse, annamme
              kiinteän hinnan ja kirjallisen takuun.
            </p>
            <p>
              Toimimme Pirkanmaalla ja lähikunnissa, esimerkiksi{" "}
              <Link to="/tiilikaton-pinnoitus-tampere/" className="text-primary hover:underline">Tampereella</Link>,{" "}
              <Link to="/tiilikaton-pinnoitus-nokia/" className="text-primary hover:underline">Nokialla</Link>,{" "}
              <Link to="/tiilikaton-pinnoitus-ylojarvi/" className="text-primary hover:underline">Ylöjärvellä</Link>,{" "}
              <Link to="/talon-maalaus-kangasala/" className="text-primary hover:underline">Kangasalla</Link>,{" "}
              <Link to="/talon-maalaus-lempaala/" className="text-primary hover:underline">Lempäälässä</Link> ja{" "}
              <Link to="/tiilikaton-pinnoitus-hameenkyro/" className="text-primary hover:underline">Hämeenkyrössä</Link>. Kaikki paikkakunnat
              löydät <Link to="/toiminta-alueet/" className="text-primary hover:underline">toiminta-alueet-sivulta</Link>.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ResponsiveImage
            baseName="tiilikaton-pesu-kesken-tampere"
            alt="Tiilikaton pesu käynnissä Tampereella: pesty tiili on puhdas ja valmis maalaukseen"
            className="w-full aspect-[4/3] object-cover rounded-2xl shadow-lg"
            sizes="(max-width: 1024px) 100vw, 560px"
            width={800}
            height={600}
          />
          <div>
            <h3 className="heading-style text-2xl md:text-3xl text-accent-ink mb-6">Tiilikaton pinnoitus lisää katon ikää 10–15 vuotta</h3>
            <div className="space-y-5 text-foreground/80 leading-relaxed text-base">
              <p>
                Kulunutta tiilikattoa ei yleensä tarvitse uusia. Pesemme katon painepesulla, vaihdamme rikkinäiset tiilet uusiin ja
                maalaamme katon ruiskulla kahteen kertaan: ensin pohjamaali, sitten pintamaali. Ahtaat paikat maalaamme telalla tai käsin.
                Uusi maalipinta pitää veden tiilen ulkopuolella ja estää pakkasrapautumisen.
              </p>
              <p>
                Hinta on yleensä <strong className="text-foreground">{PINNOITUS_HINTA}</strong>, ja annamme työlle{" "}
                <strong className="text-foreground">5 vuoden takuun</strong>. Lue lisää:{" "}
                <Link to="/tiilikaton-pinnoitus-pirkanmaa/" className="text-primary font-semibold hover:underline">tiilikaton pinnoitus Pirkanmaalla</Link>.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ResponsiveImage
            baseName="puutalon-seinien-maalaus-kaynnissa-tampere"
            alt="Talon ulkomaalaus käynnissä Tampereella: Pintasen maalari maalaa puutalon seinää pensselillä"
            className="w-full aspect-[4/3] object-cover rounded-2xl shadow-lg lg:order-2"
            sizes="(max-width: 1024px) 100vw, 560px"
            width={800}
            height={600}
          />
          <div>
            <h3 className="heading-style text-2xl md:text-3xl text-accent-ink mb-6">Talon ulkomaalaus pitää veden pois puusta</h3>
            <div className="space-y-5 text-foreground/80 leading-relaxed text-base">
              <p>
                Maali suojaa puuta sateelta ja auringolta. Pesemme seinät homepesuaineella, kaavimme irtoavan maalin, pohjamaalaamme paljaat
                kohdat ja maalaamme pintamaalin pensselillä. Lautoja emme vaihda.
              </p>
              <p>
                Hinta on yleensä <strong className="text-foreground">{MAALAUS_HINTA}</strong>, ja annamme työlle{" "}
                <strong className="text-foreground">2 vuoden takuun</strong>. Lue lisää:{" "}
                <Link to="/talon-maalaus-pirkanmaa/" className="text-primary font-semibold hover:underline">talon maalaus Pirkanmaalla</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOTextSection;
