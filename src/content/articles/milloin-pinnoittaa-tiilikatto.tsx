import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Kuinka usein tiilikatto pitää pinnoittaa?",
    answer:
      "Tiilen tehdaspinnoite kestää yleensä 10–15 vuotta. Sen jälkeen katto kannattaa pinnoittaa, kun väri on haalistunut, pinta tuntuu karhealta tai sammal palaa nopeasti.",
  },
  {
    question: "Mitä tiilikaton pinnoitus maksaa?",
    answer:
      "Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 euroa katon koon ja jyrkkyyden mukaan. Työn osuudesta saa kotitalousvähennyksen.",
  },
  {
    question: "Kauanko pinnoitus kestää?",
    answer:
      "Tavallisen omakotitalon katto valmistuu 2–4 työpäivässä. Työ tehdään ulkona, joten talossa voi asua normaalisti.",
  },
  {
    question: "Mihin aikaan vuodesta katon voi pinnoittaa?",
    answer:
      "Keväästä pitkälle syksyyn. Lämpötilan pitää olla plussalla, ja katon on ehdittävä kuivua pesun ja maalauskertojen välissä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Väri on haalistunut tai laikukas</li>
        <li>Sammal palaa pian puhdistuksen jälkeen</li>
        <li>Tiilen pinta tuntuu karhealta</li>
        <li>Tiilissä on halkeamia tai lohkeamia</li>
        <li>Katto on yli 10–15 vuotta vanha eikä sitä ole pinnoitettu</li>
      </ul>
      <p>Jos tunnistat näistä kaksi tai useamman, pinnoitus kannattaa tehdä lähivuosina.</p>
    </KeyPoints>

    <p>
      Betonitiilen pinnassa on tehtaalla tehty pinnoite, joka pitää veden tiilen ulkopuolella. Aurinko ja pakkanen
      kuluttavat sitä, ja tavallisesti se on ohut 10–15 vuoden jälkeen. Siitä eteenpäin tiili imee vettä ja
      rapautuu joka talvi vähän lisää. Näistä viidestä merkistä näet itse, missä vaiheessa oma kattosi on.
    </p>

    <h2>1. Väri on haalistunut tai laikukas</h2>
    <p>
      Uuden tiilikaton väri on tasainen. Kun pinnoite kuluu, väri haalistuu ensin etelän ja lännen puoleisilla
      lappeilla, koska niihin aurinko paistaa eniten. Laikukas tai kulahtanut katto kertoo, että suojapinta on
      ohentunut ja tiili on alkanut <strong>imeä vettä</strong>.
    </p>
    <Figure
      image="haalistunut-punainen-tiilikatto-ennen-pinnoitusta"
      alt="Haalistunut punainen tiilikatto ennen pinnoitusta"
      caption="Haalistunut väri on ensimmäinen merkki kuluneesta pinnoitteesta."
    />

    <h2>2. Sammal palaa pian puhdistuksen jälkeen</h2>
    <p>
      Sammal tarttuu vain huokoiseen ja kosteaan pintaan. Jos katto puhdistettiin muutama vuosi sitten ja se on
      taas vihreä, tiilen pinta pidättää jo kosteutta. Silloin{" "}
      <Link to="/katon-puhdistus-pirkanmaa/">katon puhdistus</Link> auttaa vain hetkeksi. Pysyvämpi ratkaisu on uusi
      pinnoite, joka tekee pinnasta vettä hylkivän.
    </p>
    <Figure
      image="sammaleinen-tiilikatto-ennen-mekaanista-puhdistusta"
      alt="Sammaloitunut tiilikatto ennen puhdistusta"
      caption="Nopeasti palaava sammal kertoo huokoiseksi kuluneesta tiilestä."
    />

    <h2>3. Tiilen pinta tuntuu karhealta</h2>
    <p>
      Tämän voit kokeilla itse räystäältä tai tikkailta. Hyväkuntoinen tiili on sileä ja kova. Kulunut tiili tuntuu
      hiekkapaperilta. Karhea tiili imee vettä, vesi jäätyy talvella tiilen sisällä ja laajenee. Tätä kutsutaan{" "}
      <strong>pakkasrapautumiseksi</strong>, ja se halkaisee tiiliä vuosien mittaan.
    </p>

    <h2>4. Tiilissä on halkeamia tai lohkeamia</h2>
    <p>
      Halkeama tarkoittaa, että vesi on jo päässyt tiilen sisään ja jäätynyt siellä. Tilanne on silloin
      kiireellisempi. Yksittäiset rikkinäiset tiilet vaihdamme uusiin ennen pinnoitusta. Jos halkeamia on paljon,
      pelkkä pinnoitus ei riitä ja katon kunto pitää arvioida laajemmin.
    </p>

    <h2>5. Katto on yli 10–15 vuotta vanha eikä sitä ole pinnoitettu</h2>
    <p>
      Tehdaspinnoitteen kesto riippuu ilmastosta, katon suunnasta ja puiden varjosta. Jos katto on tässä iässä
      eikä sitä ole huollettu, pinnoitus on todennäköisesti ajankohtainen, vaikka vaurioita ei vielä näkyisi.
      Ajoissa tehty pinnoitus tulee halvemmaksi kuin tiilien vaihto tai koko katon uusiminen.
    </p>

    <h2>Mitä tiilikaton pinnoituksessa tehdään?</h2>
    <ol>
      <li>Katto pestään ja sadevesikourut huuhdellaan.</li>
      <li>Katolle levitetään kasvustonestoaine, joka tuhoaa sammaleen itiöt tiilen huokosista.</li>
      <li>Rikkinäiset tiilet vaihdetaan uusiin.</li>
      <li>Katto ruiskumaalataan kahteen kertaan.</li>
    </ol>
    <p>
      Omakotitalon katolla tähän menee 2–4 työpäivää, ja annamme työlle 5 vuoden kirjallisen takuun. Tarkempi
      kuvaus on sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
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
