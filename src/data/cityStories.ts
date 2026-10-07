import type { ProjectService } from "./projects";

/**
 * Kohdetarinat paikkakunnittain. Eerikin kertomat 7.10.2026, muotoiltu lyhyiksi.
 * Ei nimiä, osoitteita eikä vuosia. Näytetään kohdelohkossa kuvien yläpuolella.
 */
export interface CityStory {
  service: ProjectService;
  text: string;
}

export const cityStories: Record<string, CityStory[]> = {
  tampere: [
    {
      service: "pinnoitus",
      text: "Tampereella pinnoitimme katon, jolla on aurinkopaneelit. Katolla oli paljon sammalta, mutta se lähti pesussa hyvin, ja paneelit pysyivät puhtaina. Pinnoitukseen meni kolme päivää. Samalla tehtiin autokatos, ja talon seinät maalattiin.",
    },
    {
      service: "maalaus",
      text: "Tampereella maalasimme samaan taloon sekä katon että seinät. Katolla on aurinkopaneelit, jotka pysyivät puhtaina koko työn ajan. Katon pinnoitukseen meni kolme päivää.",
    },
  ],
  hameenkyro: [
    {
      service: "pinnoitus",
      text: "Hämeenkyrössä pinnoitimme harmaan tiilikaton. Talossa on valkoinen rappaus, joten pesussa piti olla erityisen tarkka. Katto pestiin ja pinnoitettiin kahdessa päivässä.",
    },
  ],
  kangasala: [
    {
      service: "pinnoitus",
      text: "Kangasalla katon tiilet olivat hyvin hauraat. Reilu maalikerros teki katosta uudenveroisen. Harjalle asennettiin harjatiiviste. Työhön meni kaksi päivää.",
    },
  ],
  lempaala: [
    {
      service: "pinnoitus",
      text: "Lempäälässä katolla oli paljon roskaa ja tiili oli hauras. Pinnoitus sujui silti suoraviivaisesti. Jokainen Lempäälän kohteemme on valmistunut kahdessa päivässä.",
    },
  ],
  nokia: [
    {
      service: "pinnoitus",
      text: "Nokialla pinnoitimme harmaan tiilikaton. Katolla oli valokate, joka suojattiin maalauksen ajaksi. Pinnasta tuli todella hieno. Työ kesti kaksi päivää.",
    },
  ],
  orivesi: [
    {
      service: "pinnoitus",
      text: "Orivedellä pinnoitimme kaksi vierekkäistä omakotitaloa. Sade uhkasi, mutta molemmat katot saatiin maalattua hyvin. Toiseen asennettiin myös harjatiiviste. Kahteen kattoon meni yhteensä neljä päivää.",
    },
  ],
  pirkkala: [
    {
      service: "pinnoitus",
      text: "Pirkkalan katot olivat likaisia ja kuluneita, mutta pinnasta tuli upea. Harmaaseen kattoon asennettiin myös harjatiiviste. Työt sujuivat suoraviivaisesti, ja kattoon meni kaksi päivää.",
    },
  ],
  palkane: [
    {
      service: "pinnoitus",
      text: "Pälkäneellä pinnoitimme ison punaisen katon. Pinta-alaa oli 370 neliötä. Autokatokseen asennettiin harjatiiviste. Katto valmistui kolmessa päivässä.",
    },
  ],
  sastamala: [
    {
      service: "pinnoitus",
      text: "Sastamalassa kulunut ja sammaleinen katto muuttui pesussa ja pinnoituksessa täysin. Talossa on rappaus, joten pesussa piti olla erityisen tarkka. Harjatiiviste asennettiin samalla. Työhön meni kaksi päivää.",
    },
  ],
  urjala: [
    {
      service: "pinnoitus",
      text: "Urjalassa valmistui harmaa tiilikatto. Katto oli likainen, mutta kaksi huolellista maalikerrosta teki siitä uudenveroisen. Urakkaan meni kaksi päivää.",
    },
  ],
  valkeakoski: [
    {
      service: "pinnoitus",
      text: "Valkeakoskella pinnoitimme jyrkän katon, jolla on aurinkopaneelit. Katolla oli paljon sammalta. Paneelit suojattiin maalauksen ajaksi ja pestiin vielä työn jälkeen. Katto valmistui kahdessa päivässä.",
    },
  ],
  ylojarvi: [
    {
      service: "pinnoitus",
      text: "Ylöjärvellä pinnoitimme jyrkän katon, jossa on kattoikkuna. Pesussa piti olla varovainen, ja ikkuna suojattiin maalauksen ajaksi. Katosta tuli erittäin hyvä, ja asiakas oli tyytyväinen. Työhön meni kolme päivää.",
    },
  ],
};

export const getCityStory = (slug: string, service?: ProjectService): CityStory | undefined => {
  const list = cityStories[slug] ?? [];
  return (service ? list.find((s) => s.service === service) : undefined) ?? list[0];
};
