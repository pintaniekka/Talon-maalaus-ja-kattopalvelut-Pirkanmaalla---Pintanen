import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Kuinka paljon tiilikaton pinnoitus maksaa?",
    answer:
      "Hinta riippuu katon pinta-alasta, jyrkkyydestä ja nykykunnosta, mutta se on vain murto-osa uuden katon hinnasta. Tarkka hinta selviää maksuttomalla arviokäynnillä, ja työ on kotitalousvähennyskelpoista.",
  },
  {
    question: "Kauanko tiilikaton pinnoitus kestää?",
    answer:
      "Tyypillinen omakotitalon katto pesusta kahteen kertaan maalattuun pintaan vie 2–4 työpäivää. Työ tehdään ulkona, joten talossa voi asua normaalisti.",
  },
  {
    question: "Kannattaako katto pestä ja pinnoittaa itse?",
    answer:
      "Roskien poisto onnistuu itse, mutta pinnoitusta edeltävä syväpesu vaatii tehokkaan polttomoottoripesurin ja pinnoitteen levitys korkeapaineruiskun. Väärin tehty pesu voi painaa vettä aluskatteen läpi rakenteisiin.",
  },
  {
    question: "Mihin vuodenaikaan pinnoituksen voi tehdä?",
    answer:
      "Keväästä pitkälle syksyyn. Lämpötilan on oltava plussan puolella, ja katon pinnan on ehdittävä kuivua pesun ja maalauskertojen välissä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Väri on haalistunut tai epätasainen</li>
        <li>Sammal palaa nopeasti puhdistuksen jälkeen</li>
        <li>Tiilen pinta tuntuu karhealta</li>
        <li>Tiilissä näkyy halkeamia tai lohkeamia</li>
        <li>Katto on yli 10–15 vuotta vanha eikä sitä ole pinnoitettu</li>
      </ul>
      <p>Jos tunnistat näistä useamman, pinnoitus kannattaa yleensä tehdä lähiaikoina.</p>
    </KeyPoints>

    <p>
      Betonitiilikaton kestävyys perustuu sen pintaan. Tehtaalla tehty pinnoite pitää veden tiilen ulkopuolella,
      ja niin kauan kuin se on ehjä, katto kestää sään kuin sään. Kun pinta kuluu, tiili alkaa imeä vettä, ja
      siitä eteenpäin rapautuminen nopeutuu vuosi vuodelta. Alla olevat viisi merkkiä kertovat, missä vaiheessa
      oma kattosi on.
    </p>

    <h2>1. Väri on haalistunut tai muuttunut epätasaiseksi</h2>
    <p>
      Uusi tiilikatto on väriltään tasainen ja kiinteä. Kun alkuperäinen tehdaspinnoite alkaa kulua, väri
      haalistuu, usein ensin etelään tai länteen päin olevilla lappeilla, joihin aurinko paistaa eniten.
    </p>
    <p>
      Jos katto näyttää kulahtaneelta tai väri vaihtelee lappeiden välillä, suojapinta on ohentunut. Tiili on
      alkanut <strong>imeä vettä</strong>, mikä kiihdyttää rapautumista erityisesti pakkasten tullessa.
    </p>
    <Figure
      image="haalistunut-punainen-tiilikatto-ennen-pinnoitusta"
      alt="Haalistunut punainen tiilikatto ennen pinnoitusta"
      caption="Haalistunut väri kertoo, että tehdaspinnoite on kulunut ohueksi."
    />

    <h2>2. Sammal kasvaa nopeasti takaisin puhdistuksen jälkeen</h2>
    <p>
      Sammal tarvitsee kasvualustakseen huokoisen ja kostean pinnan. Jos katto on puhdistettu muutama vuosi
      sitten ja sammal on jo palannut, tiilen pinta on niin kulunut, että se pidättää kosteutta ja tarjoaa
      sammalelle hyvät kasvuolosuhteet.
    </p>
    <p>
      Tässä vaiheessa pelkkä <Link to="/katon-puhdistus-pirkanmaa">katon puhdistus</Link> ei enää riitä pitkäksi
      aikaa. Tiili tarvitsee uuden suojaavan pinnoitteen, joka tekee pinnasta vettä hylkivän ja vaikeuttaa
      sammalen kiinnittymistä.
    </p>
    <Figure
      image="sammaleinen-tiilikatto-ennen-mekaanista-puhdistusta"
      alt="Sammaloitunut tiilikatto ennen puhdistusta"
      caption="Nopeasti palaava sammal on merkki huokoiseksi kuluneesta pinnasta."
    />

    <h2>3. Tiilien pinta tuntuu karhealta</h2>
    <p>
      Tämän testin voi tehdä itse: kosketa tiiltä turvallisesti räystäältä tai tikkailta. Hyväkuntoinen tiili
      tuntuu sileältä ja kovalta. Kulunut tiili tuntuu karhealta, lähes hiekkapaperilta.
    </p>
    <p>
      Karhea pinta tarkoittaa, että suojakerros on murtunut ja tiili on muuttunut huokoiseksi. Huokoinen tiili
      imee vettä, joka talvella jäätyy tiilen sisällä ja laajenee. Tästä syntyy{" "}
      <strong>pakkasrapautuminen</strong>, joka halkaisee tiiliä vuosien saatossa.
    </p>

    <h2>4. Tiilissä näkyy halkeamia tai lohkeamia</h2>
    <p>
      Halkeilevat tiilet kertovat, että vesi on jo päässyt tiilen sisärakenteeseen ja jäätymisen ja sulamisen
      vuorottelu on alkanut tehdä tuhojaan. Tilanne on tällöin kiireellisempi. Yksittäiset rikkinäiset tiilet
      vaihdetaan uusiin ennen pinnoitusta.
    </p>
    <p>
      Jos halkeamia on paljon, pelkkä pinnoitus ei enää riitä, vaan katto vaatii laajemman kuntoarvion. Siksi
      katon kunto kannattaa aina tarkistaa paikan päällä ennen kuin työstä sovitaan.
    </p>

    <h2>5. Katto on yli 10–15 vuotta vanha eikä sitä ole pinnoitettu</h2>
    <p>
      Tehdaspinnoite kestää tyypillisesti 10–15 vuotta. Kestoon vaikuttavat ilmasto, katon suuntaus ja puiden
      varjostus. Jos katto on tässä iässä eikä sitä ole koskaan huollettu, pinnoituksen aika on todennäköisesti
      käsillä, vaikka selviä vaurioita ei vielä näkyisi.
    </p>
    <p>
      Ennaltaehkäisevä pinnoitus on aina halvempaa kuin rikkinäisten tiilien vaihto tai pahimmillaan koko katon
      uusiminen.
    </p>

    <h2>Mitä pinnoitus käytännössä tarkoittaa?</h2>
    <p>Tiilikaton pinnoitus on neljän työvaiheen kokonaisuus:</p>
    <ol>
      <li>Katon huolellinen pesu ja huuhtelu.</li>
      <li>Kasvustonestokäsittely, joka tuhoaa sammalen juuret tiilen huokosista.</li>
      <li>Rikkinäisten tiilien vaihto uusiin.</li>
      <li>Kaksi kerrosta pinnoitusmaalia ruiskutettuna.</li>
    </ol>
    <p>
      Omakotitalon katolla työ kestää yleensä 2–4 työpäivää. Työvaiheet ja materiaalit on kuvattu tarkemmin
      sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa">tiilikaton pinnoitus</Link>.
    </p>
    <Figure
      image="tummanharmaa-tiilikaton-pinnoitus-ja-huolto-jalkeen"
      alt="Tummanharmaa tiilikatto pinnoituksen jälkeen"
      caption="Pinnoitettu katto hylkii vettä ja pysyy puhtaana pidempään."
    />

    <ArticleFaq items={faq} />
  </>
);

export default Body;
