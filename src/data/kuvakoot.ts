/**
 * GENEROITU TIEDOSTO: scripts/taydenna_kuvakoot.py kirjoittaa tämän, älä muokkaa käsin.
 *
 * Kuvat, joilta jokin srcsetin koko puuttuu kansiosta public/images. 600 px:n koko jätetään
 * tekemättä, jos sitä ei saa selvästi 800 px:n tiedostoa pienemmäksi (kuva on jo pakattu
 * hyvin kovaa): silloin selaimen on parempi ladata 800 px:n versio. src/lib/storage.ts
 * jättää puuttuvan koon pois srcsetistä, ja src/test/seo.test.ts tarkistaa listan.
 */
export const puuttuvatKuvakoot: Record<number, readonly string[]> = {
  600: [
    "talon-maalaus-pensseli",
    "talon-maalaus-ulkoverhous-pensselilla-maalari",
    "talon-maalaus-vihrea-puutalo-ennen-ulkomaalausta",
    "tiilikaton-pesu-ja-pinnoitus-ennen-jalkeen",
    "tiilikaton-pesu-ja-pinnoitus-likainen-tiilikatto-ennen",
    "tiilikaton-pesu-ja-pinnoitus-puhdas-tiilenpunainen-tiilikatto",
    "tiilikaton-pesu-ja-pinnoitus-sammaleenpoisto",
    "tiilikaton-pesu-ja-pinnoitus-tummanharmaa-kattotiili",
    "tiilikaton-pesu-ja-pinnoitus-uutta-vastaava-tiilikatto",
    "tiilikaton-pesu-puhdas-tiilikatto-jalkeen",
    "tiilikaton-pesu-sammaleinen-tiilikatto-ennen",
    "tiilikaton-pinnoitus-haalistunut-punainen-tiilikatto-ennen",
    "tiilikaton-pinnoitus-harjatiivisteen-asennus",
    "tiilikaton-pinnoitus-harjatiivisteen-asennustyo",
    "tiilikaton-pinnoitus-ja-aurinkopaneelien-suojaus",
    "tiilikaton-pinnoitus-kirkkaan-punainen-tiilikatto-jalkeen",
    "tiilikaton-pinnoitus-punainen-tiilikatto-kattopinnoitus-jalkeen",
    "tiilikaton-pinnoitus-tummanharmaa-tiilikatto-pinnoitus-jalkeen",
    "tiilikaton-pinnoitus-uudenveroinen-punainen-tiilikatto-jalkeen",
    "tiilikaton-pinnoitus-vastamaalattu-tiilikatto-jalkeen",
  ],
};
