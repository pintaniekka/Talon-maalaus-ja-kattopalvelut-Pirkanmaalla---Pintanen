import { motion } from "framer-motion";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import ResponsiveImage from "./ResponsiveImage";

const sideBase = "vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen";

const MiksiPintanen = () => {
  return (
    <section className="section-padding bg-accent-light">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="heading-style text-3xl md:text-4xl text-accent mb-6 leading-tight">
              Miksi kannattaa tilata katon huolto tai maalaus Pintaselta?
            </h2>

            <div className="space-y-4 text-foreground leading-relaxed">
              <p>Terve, ja mukava että löysit Pintasen.</p>
              <p>
                Me olemme veljekset <strong>Eerik</strong> ja <strong>Eemil</strong>. Pintanen syntyi halusta tehdä
                maalaustyöt paremmin – <strong>ilman turhia välikäsiä</strong> tai raskasta kulurakennetta, ja ilman
                että laatu kärsii.
              </p>
              <p>
                <strong>Teemme työt itse.</strong> Tulemme paikan päälle, arvioimme kohteen ja hoidamme työn alusta
                loppuun <strong>omalla tiimillä</strong>. Näin tiedämme, että sovitut asiat myös toteutuvat.
              </p>
              <p>
                <strong>Eerik</strong> vastaa tiilikatoista – <strong>puhdistuksista ja pinnoituksista</strong>, joilla
                katon käyttöikää voidaan jatkaa vuosilla. <strong>Eemil</strong> keskittyy talojen seinien{" "}
                <strong>maalauksiin</strong>, joiden kanssa hänellä on pitkä historia.
              </p>
              <p>
                Meille mikään kohde ei ole liian pieni tai liian suuri. Teemme töitä
                <strong> kesämökeistä taloyhtiöihin</strong> noin <strong>tunnin säteellä Tampereelta</strong>.
              </p>
              <p>
                <strong>Arviointi on aina maksuton.</strong> Pinnoituksille annamme <strong>5 vuoden takuun</strong> ja
                talon maalauksille <strong>2 vuotta</strong>.
              </p>
              <p>
                Jos etsit tekijää, joka <strong>seisoo työnsä takana</strong> ja tekee sen minkä lupaa, ota yhteyttä —
                jutellaan rauhassa mikä olisi paras ratkaisu sinun katolle tai julkisivulle.
              </p>
              <p className="font-semibold text-primary">– Eerik &amp; Eemil</p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
          >
            <ResponsiveImage
              baseName={sideBase}
              alt="Tummansininen puutalo ulkomaalaus jälkeen Pirkanmaalla"
              className="w-full h-full object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MiksiPintanen;
