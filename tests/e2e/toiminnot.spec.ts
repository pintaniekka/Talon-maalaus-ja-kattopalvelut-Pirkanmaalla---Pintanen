import { test, expect, open, shortenChatTimers, CONSENT_KEY } from "./fixtures";
import { articles, todayInFinland } from "../../src/data/articles";

/**
 * Toimintatestit (CLAUDE.md: "jokainen työ päättyy toimintatestiin"): hintalaskuri, tarjouspyyntö,
 * sivun lopun lomake, chat-kupla, evästebanneri, valikot, Toiminta-alueet-haitari, ennen–jälkeen-liukusäädin ja
 * artikkelien julkaisu selaimessa.
 * Ajetaan molemmilla leveyksillä (playwright.config.ts: puhelin 390 px, tyopoyta 1280 px).
 */

/** Kuntavalitsin (Radix Popover + cmdk): lista aukeaa portaaliin, joten vaihtoehto haetaan koko sivulta. */
const valitseKunta = async (page: import("@playwright/test").Page, scope: import("@playwright/test").Locator, kunta: string) => {
  await scope.getByRole("combobox", { name: /Paikkakunta/ }).click();
  await page.getByRole("option", { name: kunta, exact: true }).click();
  await expect(scope.getByRole("combobox", { name: `Paikkakunta: ${kunta}` })).toBeVisible();
};

test.describe("Hintalaskuri", () => {
  test("pinnoituksen laskuri: koko, vastaukset, nimi ja puhelin, hinta-arvio näkyy", async ({ page, contact }) => {
    await open(page, "/hintalaskuri/");
    const wizard = page.locator("section.hero-critical");
    await expect(page.getByRole("heading", { level: 1, name: "Hintalaskuri" })).toBeVisible();

    await page.getByRole("main").getByRole("button", { name: /Tiilikaton pinnoitus/ }).click();
    const size = wizard.getByRole("spinbutton", { name: "Kuinka suuri katto on?" });
    await expect(size).toBeVisible();
    await size.fill("200");
    await wizard.getByRole("button", { name: "Jatka" }).click();

    await wizard.getByRole("button", { name: "Ei ole" }).click();
    await wizard.getByRole("button", { name: "Löytyy kyllä" }).click();
    await wizard.getByRole("button", { name: /Normaali jyrkkyys/ }).click();
    await wizard.getByRole("button", { name: "Ei puutu" }).click();
    await wizard.getByRole("button", { name: "Kyllä löytyy" }).click();

    await expect(wizard.getByRole("heading", { name: "Millä paikkakunnalla kohde on?" })).toBeVisible();
    // Ilman kuntaa ei pääse eteenpäin (Eki 31.10.2026): virhe kentän alla ja fokus valitsimeen.
    await wizard.getByRole("button", { name: "Jatka" }).click();
    await expect(wizard.getByText("Valitse kunta listasta.")).toBeVisible();
    await expect(wizard.getByRole("combobox", { name: /Paikkakunta/ })).toBeFocused();
    await valitseKunta(page, wizard, "Tampere");
    await expect(wizard.getByText("Valitse kunta listasta.")).toBeHidden();
    await wizard.getByRole("button", { name: "Jatka" }).click();

    await expect(wizard.getByRole("heading", { name: "Viimeinen vaihe" })).toBeVisible();
    // Ilman nimeä ja numeroa hintaa ei näytetä (liidiportti, Eerik 11.10.2026); virheet näkyvät kenttien alla.
    await wizard.getByRole("button", { name: "Näytä hinta-arvio" }).click();
    await expect(wizard.getByText("Kirjoita nimesi.")).toBeVisible();
    await expect(wizard.getByText("Kirjoita puhelinnumero, niin voimme soittaa sinulle.")).toBeVisible();
    await expect(wizard.getByRole("textbox", { name: "Nimi" })).toBeFocused();
    await expect(wizard.getByText("Hinta-arvio", { exact: true })).toBeHidden();
    expect(contact.requests).toHaveLength(0);

    await wizard.getByRole("textbox", { name: "Nimi" }).fill("Testi Testaaja");
    await wizard.getByRole("textbox", { name: "Puhelinnumero" }).fill("401234567");
    await wizard.getByRole("button", { name: "Näytä hinta-arvio" }).click();

    await expect(wizard.getByText("Hinta-arvio", { exact: true })).toBeVisible();
    await expect(wizard.getByText(/\d[\d\s\u00a0]*\s?€/).first()).toBeVisible();
    await expect(wizard.getByText(/Soitamme sinulle/)).toBeVisible();

    expect(contact.requests).toHaveLength(1);
    expect(contact.requests[0]).toMatchObject({ name: "Testi Testaaja", service: "tiilikatto", city: "Tampere" });
    expect(String(contact.requests[0].message)).toContain("Hintalaskuri: Katon koko: 200 m²");
  });

  test("maalauksen laskuri antaa hinta-arvion", async ({ page, contact }) => {
    await open(page, "/hintalaskuri/?palvelu=maalaus");
    const wizard = page.locator("section.hero-critical");
    const size = wizard.getByRole("spinbutton", { name: "Kuinka monta pohjaneliötä talossa on?" });
    await expect(size).toBeVisible();
    await size.fill("120");
    await wizard.getByRole("button", { name: "Jatka" }).click();
    await wizard.getByRole("button", { name: "1,5 kerrosta" }).click();
    await wizard.getByRole("button", { name: /Vähän/ }).click();
    await wizard.getByRole("button", { name: "Kyllä löytyy" }).click();
    await valitseKunta(page, wizard, "Nokia");
    await wizard.getByRole("button", { name: "Jatka" }).click();
    await wizard.getByRole("textbox", { name: "Nimi" }).fill("Testi Testaaja");
    await wizard.getByRole("textbox", { name: "Puhelinnumero" }).fill("401234567");
    await wizard.getByRole("button", { name: "Näytä hinta-arvio" }).click();
    await expect(wizard.getByText("Hinta-arvio", { exact: true })).toBeVisible();
    expect(contact.requests).toHaveLength(1);
    expect(contact.requests[0]).toMatchObject({ service: "ulkomaalaus" });
  });

  test("väärä puhelinnumero pysäyttää laskurin ennen lähetystä", async ({ page, contact }) => {
    await open(page, "/hintalaskuri/?palvelu=pinnoitus");
    const wizard = page.locator("section.hero-critical");
    await wizard.getByRole("spinbutton", { name: "Kuinka suuri katto on?" }).fill("150");
    await wizard.getByRole("button", { name: "Jatka" }).click();
    await wizard.getByRole("button", { name: "Ei ole" }).click();
    await wizard.getByRole("button", { name: "Löytyy kyllä" }).click();
    await wizard.getByRole("button", { name: /Normaali jyrkkyys/ }).click();
    await wizard.getByRole("button", { name: "Ei puutu" }).click();
    await wizard.getByRole("button", { name: "Kyllä löytyy" }).click();
    await valitseKunta(page, wizard, "Tampere");
    await wizard.getByRole("button", { name: "Jatka" }).click();
    await wizard.getByRole("textbox", { name: "Nimi" }).fill("Testi Testaaja");
    await wizard.getByRole("textbox", { name: "Puhelinnumero" }).fill("123");
    await wizard.getByRole("button", { name: "Näytä hinta-arvio" }).click();
    const puhelin = wizard.getByRole("textbox", { name: "Puhelinnumero" });
    await expect(puhelin).toHaveAttribute("aria-invalid", "true");
    await expect(puhelin).toBeFocused();
    await expect(wizard.getByText(/Numerosta puuttuu numeroita/)).toBeVisible();
    // Viesti katoaa heti, kun numero on kunnossa.
    await puhelin.fill("040 123 4567");
    await expect(wizard.getByText(/Numerosta puuttuu numeroita/)).toBeHidden();
    expect(contact.requests).toHaveLength(0);
  });

  // Vähennysrivi (kotitalousvähennys hinta-arvion alla) tulee PR #129:ssä. Testi otetaan käyttöön, kun rivi on main-haarassa.
  test.fixme("hinta-arvion alla näkyy kotitalousvähennyksen rivi", async () => {});
});

test.describe("Tarjouspyyntö", () => {
  test("kolme vaihetta ja kiitossivu, pyyntö menee vain mockiin", async ({ page, contact }) => {
    await open(page, "/tarjouspyynto/");
    await expect(page.getByRole("heading", { name: "Mihin haluat tarjouksen?" })).toBeVisible();

    // Ilman valintaa ei pääse eteenpäin, ja syy näkyy valintojen alla.
    await page.getByRole("button", { name: "Jatka" }).click();
    await expect(page.getByRole("heading", { name: "Mihin haluat tarjouksen?" })).toBeVisible();
    await expect(page.getByText("Valitse ainakin yksi palvelu.")).toBeVisible();

    const roof = page.getByRole("checkbox", { name: "Tiilikaton pinnoitus" });
    await roof.click();
    await expect(roof).toHaveAttribute("aria-checked", "true");
    await page.getByRole("button", { name: "Jatka" }).click();

    await expect(page.getByRole("heading", { name: "Missä kohde sijaitsee?" })).toBeVisible();
    await page.getByRole("textbox", { name: "Lisätiedot" }).fill("Testiviesti, ei oikea pyyntö");
    // Kunta on pakollinen (Eki 31.10.2026).
    await page.getByRole("button", { name: "Jatka" }).click();
    await expect(page.getByText("Valitse kunta listasta.")).toBeVisible();
    await valitseKunta(page, page.getByRole("main"), "Tampere");
    await page.getByRole("button", { name: "Jatka" }).click();

    await expect(page.getByRole("heading", { name: "Kenelle tarjous tehdään?" })).toBeVisible();
    await page.getByRole("textbox", { name: "Nimi" }).fill("Testi Testaaja");
    await page.getByRole("textbox", { name: "Puhelinnumero" }).fill("401234567");
    await page.getByRole("button", { name: "Lähetä tarjouspyyntö" }).click();

    await expect(page.getByRole("heading", { name: /Kiitos, Testi Testaaja/ })).toBeVisible();
    expect(contact.requests).toHaveLength(1);
    expect(contact.requests[0]).toMatchObject({ name: "Testi Testaaja", service: "tiilikatto", phone: "+358401234567", city: "Tampere" });
    expect(String(contact.requests[0].message)).toContain("tarjouspyyntösivu");
  });
});

test.describe("Sivun lopun lomake", () => {
  test("palvelusivun yhteydenottolomake lähettää mockiin ja näyttää Lähetetty", async ({ page, contact }) => {
    await open(page, "/tiilikaton-pinnoitus-tampere/");
    const form = page.locator("#yhteystiedot form");
    await form.scrollIntoViewIfNeeded();
    // Pinnoitussivuilla lomakkeen otsikko on "Pyydä ilmainen kuntotarkastus" (ServiceContactSection, Eerik 26.10.2026).
    await expect(form.getByRole("heading", { name: "Pyydä ilmainen kuntotarkastus" })).toBeVisible();

    await form.getByRole("textbox", { name: "Nimi" }).fill("Testi Testaaja");
    await form.getByRole("textbox", { name: "Puhelinnumero" }).fill("040 123 4567");
    await form.getByRole("checkbox", { name: "Tiilikaton pinnoitus" }).check();
    await form.getByRole("textbox", { name: "Lisätiedot" }).fill("Testiviesti, ei oikea pyyntö");
    await form.getByRole("button", { name: "Lähetä" }).click();

    await expect(form.getByRole("button", { name: "Lähetetty" })).toBeVisible();
    expect(contact.requests).toHaveLength(1);
    expect(contact.requests[0]).toMatchObject({ name: "Testi Testaaja" });
    expect(String(contact.requests[0].message)).toContain("/tiilikaton-pinnoitus-tampere/");
  });

  test("puuttuvat tiedot näkyvät kenttien alla eikä mitään lähetetä", async ({ page, contact }) => {
    await open(page, "/talon-maalaus-tampere/");
    const form = page.locator("#yhteystiedot form");
    await form.getByRole("textbox", { name: "Nimi" }).fill("Testi Testaaja");
    await form.getByRole("textbox", { name: "Sähköposti" }).fill("testi@");
    await form.getByRole("button", { name: "Lähetä" }).click();
    await expect(form.getByText("Kirjoita puhelinnumero, niin voimme soittaa sinulle.")).toBeVisible();
    await expect(form.getByText(/Tarkista sähköpostiosoite/)).toBeVisible();
    await expect(form.getByText("Valitse ainakin yksi palvelu.")).toBeVisible();
    await expect(form.getByRole("textbox", { name: "Puhelinnumero" })).toBeFocused();
    expect(contact.requests).toHaveLength(0);
  });
});

test.describe("Chat-kupla", () => {
  const BUBBLE = "Moi! 👋 Pyydä tarjous tai kysy meiltä.";

  test("kupla avautuu 25 sekunnin kuluttua ja chat aukeaa siitä", async ({ page, contact }, testInfo) => {
    test.skip(testInfo.project.name !== "tyopoyta", "kupla näkyy vain leveällä näytöllä, puhelimella vain pyöreä nappi");
    await shortenChatTimers(page);
    await open(page, "/");
    const bubble = page.getByText(BUBBLE);
    await expect(bubble).toBeVisible();

    await bubble.click();
    await expect(page.getByText(/Moikka!/)).toBeVisible();
    await expect(page.getByRole("button", { name: "Pyydä tarjous", exact: true }).last()).toBeVisible();
    await expect(bubble).toBeHidden();
    await page.getByRole("button", { name: "Sulje" }).click();
    await expect(page.getByText(/Moikka!/)).toBeHidden();
    expect(contact.requests).toHaveLength(0);
  });

  test("kuplan voi sulkea ilman chatin avaamista, ja se palaa myöhemmin", async ({ page, contact }, testInfo) => {
    test.skip(testInfo.project.name !== "tyopoyta", "kupla näkyy vain leveällä näytöllä");
    await shortenChatTimers(page);
    await open(page, "/");
    const bubble = page.getByText(BUBBLE);
    await expect(bubble).toBeVisible();
    await page.getByRole("button", { name: "Sulje" }).click();
    await expect(page.getByText(/Moikka!/)).toBeHidden();
    await expect(page.getByRole("button", { name: "Avaa chat" })).toBeVisible();
    // Sulkemisen jälkeen kupla palaa (oikeasti 40 s kuluttua).
    await expect(bubble).toBeVisible();
  });

  test("puhelimella kuplaa ei näy, pyöreä nappi avaa chatin", async ({ page, contact }, testInfo) => {
    test.skip(testInfo.project.name !== "puhelin", "puhelinnäkymän testi");
    await shortenChatTimers(page);
    await open(page, "/");
    await expect(page.getByRole("button", { name: "Avaa chat" })).toBeVisible();
    await expect(page.getByText(BUBBLE)).toBeHidden();
    await page.getByRole("button", { name: "Avaa chat" }).click();
    await expect(page.getByText(/Moikka!/)).toBeVisible();
    await page.getByRole("button", { name: "Sulje" }).click();
    await expect(page.getByText(/Moikka!/)).toBeHidden();
    expect(contact.requests).toHaveLength(0);
  });

  test("lomakesivuilla chat ei näy", async ({ page, contact }) => {
    await shortenChatTimers(page);
    await open(page, "/tarjouspyynto/");
    await expect(page.getByRole("button", { name: "Avaa chat" })).toHaveCount(0);
    await expect(page.getByText(BUBBLE)).toHaveCount(0);
  });
});

test.describe("Evästebanneri", () => {
  test.use({ consentGiven: false });

  test("Hyväksy tallentaa valinnan eikä banneri palaa", async ({ page, contact }) => {
    await open(page, "/");
    const banner = page.getByRole("region", { name: "Evästeet" });
    await expect(banner).toBeVisible();
    await expect(banner.getByRole("button", { name: "Hyväksy", exact: true })).toBeVisible();
    await expect(banner.getByRole("button", { name: "Asetukset" })).toBeVisible();
    await banner.getByRole("button", { name: "Hyväksy", exact: true }).click();
    await expect(banner).toBeHidden();
    expect(await page.evaluate((k) => localStorage.getItem(k), CONSENT_KEY)).toBe("granted");
    await page.reload();
    await expect(page.getByRole("region", { name: "Evästeet" })).toHaveCount(0);
  });

  test("Asetukset: analytiikka pois ja Tallenna valinnat tallentaa kiellon", async ({ page, contact }) => {
    await open(page, "/");
    const banner = page.getByRole("region", { name: "Evästeet" });
    await banner.getByRole("button", { name: "Asetukset" }).click();
    const analytics = banner.getByRole("checkbox", { name: /Analytiikka/ });
    await expect(analytics).toBeVisible();
    await expect(analytics).not.toBeChecked();
    await expect(banner.getByRole("button", { name: "Hyväksy kaikki" })).toBeVisible();
    await banner.getByRole("button", { name: "Tallenna valinnat" }).click();
    await expect(banner).toBeHidden();
    expect(await page.evaluate((k) => localStorage.getItem(k), CONSENT_KEY)).toBe("denied");
  });
});

test.describe("Valikot", () => {
  test("päävalikko: alavalikko avautuu ja Hinnat-linkki vie hintasivulle", async ({ page, contact }, testInfo) => {
    test.skip(testInfo.project.name !== "tyopoyta", "päävalikko näkyy vain leveällä näytöllä");
    await open(page, "/");
    const nav = page.getByRole("navigation", { name: "Päänavigaatio" });
    await expect(nav.getByRole("link", { name: "Tiilikaton pinnoitus" })).toBeVisible();
    const toggle = nav.getByRole("button", { name: "Tiilikaton pinnoitus: avaa alavalikko" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await nav.getByRole("link", { name: "Hinnat" }).first().click();
    await expect(page).toHaveURL(/\/tiilikaton-pinnoitus-hinta-pirkanmaa\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/hinta/i);
  });

  test("mobiilivalikko: avaa, alavalikko ja siirtyminen hintasivulle", async ({ page, contact }, testInfo) => {
    test.skip(testInfo.project.name !== "puhelin", "mobiilivalikko näkyy vain kapealla näytöllä");
    await open(page, "/");
    await page.getByRole("button", { name: "Avaa päävalikko" }).click();
    const nav = page.getByRole("navigation", { name: "Mobiilinavigaatio" });
    await expect(nav).toBeVisible();
    await nav.getByRole("button", { name: "Talon maalaus: avaa alavalikko" }).click();
    await nav.getByRole("link", { name: "Hinnat" }).first().click();
    await expect(page).toHaveURL(/\/talon-maalaus-hinta-pirkanmaa\/$/);
    await expect(nav).toBeHidden();
    await expect(page.getByRole("button", { name: "Avaa päävalikko" })).toBeVisible();
  });
});

test.describe("Toiminta-alueet-haitari", () => {
  test("Pirkanmaa on auki, toinen ryhmä avautuu napista ja linkit toimivat", async ({ page, contact }) => {
    await open(page, "/");
    const section = page.locator("section[aria-labelledby='toiminta-alueet-otsikko']");
    await section.scrollIntoViewIfNeeded();
    const pirkanmaa = section.getByRole("button", { name: "Pirkanmaa" });
    const other = section.getByRole("button", { name: "Kanta-Häme & Satakunta" });
    await expect(pirkanmaa).toHaveAttribute("aria-expanded", "true");
    await expect(other).toHaveAttribute("aria-expanded", "false");

    const nokia = section.getByRole("link", { name: "Tiilikaton pinnoitus Nokia" });
    await expect(nokia).toBeVisible();

    await other.click();
    await expect(other).toHaveAttribute("aria-expanded", "true");
    const hameenlinna = section.getByRole("link", { name: "Talon maalaus Hämeenlinna" });
    await expect(hameenlinna).toBeVisible();

    await pirkanmaa.click();
    await expect(pirkanmaa).toHaveAttribute("aria-expanded", "false");
    await expect(nokia).toBeHidden();

    await hameenlinna.click();
    await expect(page).toHaveURL(/\/talon-maalaus-hameenlinna\/$/);
  });
});

test.describe("Ennen–jälkeen-liukusäädin", () => {
  test("liukusäädin liikkuu näppäimistöllä ja vetämällä", async ({ page, contact }) => {
    await open(page, "/tiilikaton-pinnoitus-tampere/");
    const slider = page.getByRole("slider").first();
    await slider.scrollIntoViewIfNeeded();
    await expect(slider).toHaveAttribute("aria-valuenow", "50");
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(slider).toHaveAttribute("aria-valuenow", "52");
    await page.keyboard.press("End");
    await expect(slider).toHaveAttribute("aria-valuenow", "100");

    const box = await slider.locator("xpath=ancestor::div[contains(@class,'cursor-ew-resize')]").boundingBox();
    if (!box) throw new Error("liukusäätimen laatikkoa ei löydy");
    await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2, { steps: 5 });
    await page.mouse.up();
    const value = Number(await slider.getAttribute("aria-valuenow"));
    expect(value).toBeGreaterThan(15);
    expect(value).toBeLessThan(35);
  });
});

/**
 * Jonossa oleva artikkeli tulee selaimessa näkyviin julkaisupäivänään ilman uutta buildia (CLAUDE.md: Scheduling).
 * Sama build, selaimen kello päivää ennen ja julkaisupäivän aamuna. Artikkelilista latautuu laiskasti omana
 * pakettinaan (ArtikkeliRivit, JulkaistuArtikkeli), joten tämä varmistaa, että laiska lataus ei riko julkaisua.
 */
test.describe("Artikkelien julkaisu", () => {
  const paivaa = (iso: string, n: number) => new Date(Date.parse(`${iso}T12:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);
  const aamulla = (iso: string) => new Date(`${iso}T08:00:00+02:00`);
  const jarjestetty = [...articles].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
  // Seuraava jonossa oleva artikkeli; jos jono on tyhjä, uusin julkaistu.
  const seuraava = jarjestetty.find((a) => a.publishedAt > todayInFinland()) ?? jarjestetty[jarjestetty.length - 1];
  const linkki = `a[href="/artikkelit/${seuraava.slug}/"]`;

  test("päivää ennen julkaisua artikkeli on 404 eikä näy listoissa", async ({ page, contact }) => {
    await page.clock.setFixedTime(aamulla(paivaa(seuraava.publishedAt, -1)));
    await open(page, `/artikkelit/${seuraava.slug}/`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sivua ei löytynyt");
    await open(page, "/artikkelit/");
    await expect(page.locator(`main ${linkki}`)).toHaveCount(0);
    await open(page, "/");
    await expect(page.locator(`[data-artikkelirivit] ${linkki}`)).toHaveCount(0);
  });

  test("julkaisupäivänä artikkeli aukeaa ja näkyy listauksessa ja etusivulla", async ({ page, contact }) => {
    await page.clock.setFixedTime(aamulla(seuraava.publishedAt));
    await open(page, `/artikkelit/${seuraava.slug}/`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(seuraava.title);
    await open(page, "/artikkelit/");
    await expect(page.locator(`main ${linkki}`).first()).toBeVisible();
    await open(page, "/");
    await expect(page.locator("[data-artikkelirivit] ul > li a").first()).toHaveAttribute("href", `/artikkelit/${seuraava.slug}/`);
  });

  test("yksittäinen artikkelilinkki (harjatiivistesivu) ilmestyy julkaisupäivänä", async ({ page, contact }) => {
    const harja = articles.find((a) => a.slug === "harjatiiviste-tiilikatolla");
    if (!harja) throw new Error("artikkeli harjatiiviste-tiilikatolla puuttuu");
    const lue = page.getByRole("link", { name: "Lue lisää harjatiivisteestä" });
    await page.clock.setFixedTime(aamulla(paivaa(harja.publishedAt, -1)));
    await open(page, "/harjatiivisteen-asennus/");
    await expect(lue).toHaveCount(0);
    await page.clock.setFixedTime(aamulla(harja.publishedAt));
    await open(page, "/harjatiivisteen-asennus/");
    await expect(lue).toBeVisible();
  });
});
