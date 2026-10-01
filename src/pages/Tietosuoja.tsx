import SEO from "@/components/SEO";
import { staticSeo } from "@/data/seo";

const UPDATED = "1.10.2026";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl md:text-2xl font-bold font-heading mb-3">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

/**
 * Tietosuojaseloste (EU:n yleinen tietosuoja-asetus 2016/679, art. 13–14).
 * Sisältö kuvaa sivuston todellista tietojenkäsittelyä: yhteydenotto- ja
 * tarjouspyyntölomakkeet, chat ja hintalaskuri. Sivustolla ei ole analytiikkaa
 * eikä seurantaevästeitä.
 */
const Tietosuoja = () => (
  <div className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
    <SEO
        {...staticSeo["/tietosuoja"]}
    />
    <article className="section-container max-w-3xl mx-auto px-4">
      <p className="text-accent font-heading font-extrabold uppercase tracking-[0.2em] text-xs md:text-sm mb-3">
        Pintanen Oy
      </p>
      <h1 className="text-3xl md:text-5xl font-bold font-heading mb-3">Tietosuojaseloste</h1>
      <p className="text-sm text-muted-foreground mb-10">Päivitetty {UPDATED}</p>

      <Section title="1. Rekisterinpitäjä">
        <p>
          Pintanen Oy (Y-tunnus 3525786-9), Pirkanmaa.
          <br />
          Sähköposti:{" "}
          <a href="mailto:myynti@pintanen.fi" className="text-primary underline underline-offset-2">
            myynti@pintanen.fi
          </a>
          <br />
          Puhelin:{" "}
          <a href="tel:+358409640066" className="text-primary underline underline-offset-2">
            040 964 0066
          </a>
        </p>
        <p>Tietosuoja-asioissa voit olla yhteydessä yllä oleviin yhteystietoihin.</p>
      </Section>

      <Section title="2. Mitä tietoja keräämme">
        <p>Käsittelemme vain tietoja, jotka annat meille itse sivuston lomakkeilla, chatissa tai hintalaskurissa:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>nimi, puhelinnumero ja sähköpostiosoite</li>
          <li>kohteen osoite, postinumero ja paikkakunta, jos annat ne</li>
          <li>valitsemasi palvelu ja vapaamuotoinen viesti</li>
          <li>hintalaskuriin syöttämäsi tiedot (esim. katon tai seinien pinta-ala, kerrosluku, katon kunto) ja laskurin antama hinta-arvio</li>
        </ul>
        <p>
          Sivusto ei käytä analytiikka- tai mainontaevästeitä eikä seurantatyökaluja. Sivusto ei kerää tietoja selailustasi.
        </p>
      </Section>

      <Section title="3. Mihin tietoja käytetään ja millä perusteella">
        <p>Tietoja käytetään:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>yhteydenottoosi vastaamiseen ja arviokäynnin sopimiseen</li>
          <li>tarjouksen laatimiseen ja toimittamiseen</li>
          <li>asiakassuhteen hoitamiseen, jos tilaat meiltä työn</li>
        </ul>
        <p>
          Käsittelyn oikeusperuste on sopimuksen tekemistä edeltävien toimien toteuttaminen pyynnöstäsi (tietosuoja-asetuksen
          6 artiklan 1 kohdan b alakohta) sekä rekisterinpitäjän oikeutettu etu vastata yhteydenottoihin ja hoitaa
          asiakassuhteita (6 artiklan 1 kohdan f alakohta). Tietoja ei käytetä automaattiseen päätöksentekoon eikä
          profilointiin.
        </p>
      </Section>

      <Section title="4. Kenelle tietoja luovutetaan">
        <p>
          Tietoja ei myydä eikä luovuteta ulkopuolisille markkinointitarkoituksiin. Käytämme seuraavia
          palveluntarjoajia, jotka käsittelevät tietoja puolestamme:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>sähköpostin välityspalvelu, jolla lomakkeen tiedot toimitetaan myyntiimme</li>
          <li>asiakashallintajärjestelmämme, johon tarjouspyynnöt tallennetaan käsittelyä varten</li>
          <li>sivuston julkaisualustan, lomakkeiden käsittelyn ja sisällönjakeluverkon palveluntarjoaja (Cloudflare)</li>
        </ul>
        <p>
          Osa palveluntarjoajista voi käsitellä tietoja EU:n tai ETA:n ulkopuolella. Tällöin siirto perustuu Euroopan
          komission vakiosopimuslausekkeisiin tai muuhun tietosuoja-asetuksen sallimaan siirtoperusteeseen.
        </p>
      </Section>

      <Section title="5. Kuinka kauan tietoja säilytetään">
        <p>
          Tarjouspyyntöjen ja yhteydenottojen tietoja säilytetään niin kauan kuin tarjouksen käsittely ja mahdollinen
          asiakassuhde edellyttävät. Yhteydenotot, jotka eivät johda tilaukseen, poistetaan viimeistään kahden vuoden
          kuluttua. Kirjanpitolain edellyttämät tiedot säilytetään lain vaatiman ajan.
        </p>
      </Section>

      <Section title="6. Oikeutesi">
        <p>Sinulla on oikeus:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>saada tietää, mitä tietoja sinusta käsittelemme, ja saada niistä kopio</li>
          <li>pyytää virheellisen tiedon oikaisua</li>
          <li>pyytää tietojesi poistamista</li>
          <li>pyytää käsittelyn rajoittamista tai vastustaa käsittelyä</li>
          <li>tehdä valitus valvontaviranomaiselle (Tietosuojavaltuutetun toimisto, tietosuoja.fi)</li>
        </ul>
        <p>
          Pyynnöt voi lähettää osoitteeseen{" "}
          <a href="mailto:myynti@pintanen.fi" className="text-primary underline underline-offset-2">
            myynti@pintanen.fi
          </a>
          . Vastaamme pyyntöihin viimeistään kuukauden kuluessa.
        </p>
      </Section>

      <Section title="7. Tietoturva">
        <p>
          Lomakkeiden tiedot siirretään salattuna (HTTPS). Pääsy tietoihin on vain niillä Pintanen Oy:n henkilöillä, jotka
          tarvitsevat niitä yhteydenottojen ja tarjousten käsittelyyn.
        </p>
      </Section>

      <Section title="8. Evästeet ja ulkoiset resurssit">
        <p>
          Sivusto ei aseta seurantaevästeitä. Sivuston kuvat ja fontit ladataan sivuston omasta osoitteesta, eikä
          sivusto lataa sisältöä kolmansien osapuolten palvelimilta. Sivuston julkaisualusta näkee selaimesi
          IP-osoitteen teknisen tiedonsiirron toteuttamiseksi.
        </p>
      </Section>

      <Section title="9. Muutokset">
        <p>Päivitämme tätä selostetta tarvittaessa. Ajantasainen versio on aina tällä sivulla.</p>
      </Section>
    </article>
  </div>
);

export default Tietosuoja;
