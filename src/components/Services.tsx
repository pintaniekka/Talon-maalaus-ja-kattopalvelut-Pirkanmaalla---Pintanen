import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";
import { RoofTileIcon, RoofCleanIcon, PaintBrushIcon } from "./ServiceIcons";
import { PINNOITUS_HINTA, MAALAUS_HINTA } from "@/data/tyovaiheet";

/** Etusivun palvelukortit. Sama luku (jopa 15–20 vuotta) ja sama työn kuvaus kuin palvelusivuilla (S1). */
const services = [
  {
    title: "Tiilikaton pinnoitus",
    href: "/tiilikaton-pinnoitus-pirkanmaa/",
    imageBase: "kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen",
    description: `Pesemme katon painepesulla ja maalaamme sen ruiskulla kahteen kertaan. Pinnoitettu katto kestää jopa 15–20 vuotta pidempään. Hinta yleensä ${PINNOITUS_HINTA}.`,
    tag: "5 v takuu",
    Icon: RoofTileIcon,
  },
  {
    title: "Talon maalaus",
    href: "/talon-maalaus-pirkanmaa/",
    imageBase: "vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen",
    description: `Homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Hinta yleensä ${MAALAUS_HINTA}.`,
    tag: "2 v takuu",
    Icon: PaintBrushIcon,
  },
  {
    title: "Katon puhdistus",
    href: "/katon-puhdistus-pirkanmaa/",
    imageBase: "puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen",
    description: "Sammal ja lika poistetaan mekaanisesti, ja katto saa kasvustontorjunta-aineen.",
    tag: "Ilmainen tarkastus",
    Icon: RoofCleanIcon,
  },
];

const Services = () => {
  return (
    <section id="palvelut" className="section-padding" style={{ backgroundColor: "#ecf7ff" }}>
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="heading-style text-3xl md:text-4xl text-accent-ink mb-5">Palvelumme</h2>
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
            Teemme <strong className="text-foreground">tiilikattojen pinnoitukset</strong> ja{" "}
            <strong className="text-foreground">talojen ulkomaalaukset</strong> Pirkanmaalla ja lähikunnissa.{" "}
            <strong className="text-foreground">Yrittäjät tekevät työn itse.</strong> Arviokäynti on ilmainen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="relative rounded-xl overflow-hidden group block h-full aspect-[4/5] md:aspect-[3/4] shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <ResponsiveImage
                baseName={service.imageBase}
                alt=""
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
                width={1200}
                height={1600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/90 transition-all duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-3">
                <span className="self-start bg-black/35 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">{service.tag}</span>
                <h3 className="text-xl font-bold text-white font-heading leading-tight flex items-center gap-2">
                  <service.Icon className="w-6 h-6 brightness-0 invert" />
                  {service.title}
                </h3>
                <p className="text-white/85 text-sm leading-relaxed">{service.description}</p>
                <span className="inline-flex items-center gap-1.5 text-white font-semibold text-sm mt-1 group-hover:gap-2.5 transition-all duration-300">
                  Lue lisää
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
