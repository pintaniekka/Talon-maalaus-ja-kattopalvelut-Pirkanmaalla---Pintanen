import { Check } from "lucide-react";
import { merkitse } from "@/components/Rytmi";
import { LUVUT, TAKUU } from "@/data/company";

type Service = "pinnoitus" | "maalaus";

interface Reason {
  title: string;
  text: string;
}

/**
 * "Miksi Pintanen" -lista (SEO-suunnitelma 25.10.2026, Eerikin vastaus 8): yrittäjä tekee työn itse,
 * kokemus ja työnjälki ovat itse tekijällä, kilpailukykyinen hinta, maalia aina tarpeeksi, vastuu
 * lopputuloksesta. Kilpailijoista ei väitetä mitään, matkakuluista ei sanota mitään (Eerik 13.10.2026).
 */
const reasons: Record<Service, Reason[]> = {
  pinnoitus: [
    { title: "Yrittäjä tekee työn itse", text: "Eerik käy katsomassa katon, tekee tarjouksen ja pinnoittaa katon itse. Sama mies alusta loppuun." },
    { title: "Kokemus näkyy jäljessä", text: `Eerik on tehnyt kattotöitä vuodesta 2022 ja pinnoittanut ${LUVUT.pinnoitetutKatot} kattoa.` },
    { title: "Maalia aina tarpeeksi", text: "Katto saa maalia niin paljon kuin se tarvitsee. Pohjamaali ja pintamaali, aina kaksi kerrosta." },
    { title: "Kiinteä ja kilpailukykyinen hinta", text: "Saat kirjallisen tarjouksen heti kuntotarkastuksen jälkeen. Hinta sisältää työn, materiaalit ja siivouksen." },
    { title: "Sovitussa pysytään", text: "Teemme kirjallisen sopimuksen ja sovimme ajankohdan. Otamme yhteyttä ennen aloituspäivää." },
    { title: `Takuu ${TAKUU.pinnoitus} kirjallisesti`, text: "Eerik vastaa itse lopputuloksesta. Jos jäljessä on vikaa, se korjataan takuun aikana ilman lisähintaa." },
  ],
  maalaus: [
    { title: "Yrittäjä tekee työn itse", text: "Eemil käy katsomassa talon, tekee tarjouksen ja maalaa seinät maalausparinsa kanssa. Sama mies alusta loppuun." },
    { title: "Kokemus näkyy jäljessä", text: `Eemil on maalannut ${LUVUT.maalatutTalot} taloa. Seinät maalataan pensselillä, ei ruiskulla.` },
    { title: "Maalia aina tarpeeksi", text: "Seinä saa maalia niin paljon kuin se tarvitsee. Paljaat kohdat pohjamaalataan ennen pintamaalia." },
    { title: "Kiinteä ja kilpailukykyinen hinta", text: "Saat kirjallisen tarjouksen heti arviokäynnin jälkeen. Hinta sisältää työn, materiaalit ja siivouksen." },
    { title: "Sovitussa pysytään", text: "Teemme kirjallisen sopimuksen ja sovimme ajankohdan. Otamme yhteyttä ennen aloituspäivää." },
    { title: `Takuu ${TAKUU.maalaus} kirjallisesti`, text: "Eemil vastaa itse lopputuloksesta. Jos jäljessä on vikaa, se korjataan takuun aikana ilman lisähintaa." },
  ],
};

const MiksiValitaPintanen = ({ service, cityIn }: { service: Service; cityIn?: string }) => (
  <section className="section-padding osio">
    <div className="section-container max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="lohko-otsake mb-3">Miksi me</span>
        <h2 className="text-3xl md:text-4xl font-bold text-accent-ink font-heading">
          Miksi valita Pintanen{cityIn ? ` ${cityIn}` : ""}?
        </h2>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons[service].map((r) => (
          <li key={r.title} className="kortti p-6 md:p-7 text-center">
            <span className="kortti-merkki mb-5" aria-hidden="true">
              <Check className="w-5 h-5" strokeWidth={2.5} />
            </span>
            <h3 className="font-extrabold text-navy font-heading mb-1.5">{r.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{r.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

merkitse(MiksiValitaPintanen, "sininen");

export default MiksiValitaPintanen;
