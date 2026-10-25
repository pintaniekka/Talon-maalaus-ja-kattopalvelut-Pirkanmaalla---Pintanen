import { Check } from "lucide-react";
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
    { title: "Kokemus näkyy jäljessä", text: `Eerik on tehnyt kattotöitä ${LUVUT.kokemusVuotta} vuotta ja pinnoittanut ${LUVUT.pinnoitetutKatot} kattoa.` },
    { title: "Maalia aina tarpeeksi", text: "Katto saa maalia niin paljon kuin se tarvitsee. Kaksi kerrosta joka kohtaan, myös reunoihin ja harjalle." },
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
  <section className="section-padding bg-accent-light">
    <div className="section-container max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-10 text-center font-heading">
        Miksi valita Pintanen{cityIn ? ` ${cityIn}` : ""}?
      </h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons[service].map((r) => (
          <li key={r.title} className="bg-card rounded-2xl border border-border/50 shadow-sm p-5 flex gap-3">
            <Check className="w-5 h-5 text-accent-ink flex-shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h3 className="font-bold text-foreground font-heading mb-1">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default MiksiValitaPintanen;
