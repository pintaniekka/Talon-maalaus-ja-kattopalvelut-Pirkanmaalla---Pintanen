import { getStorageUrl } from "@/lib/storage";
import { YHTEYSTIEDOT } from "./company";

export interface Author {
  id: string;
  name: string;
  role: string;
  /** Lyhyt esittely artikkelin lopun kirjoittajalaatikkoon. */
  bio: string;
  image: string;
  /** Yhteystiedot tekijälaatikkoon tekstinä (vaihe 12, 27.10.2026). */
  phone: string;
  email: string;
}

export const authors: Record<string, Author> = {
  eerik: {
    id: "eerik",
    name: "Eerik Pitkänen",
    role: "Kattomaalari, Pintanen Oy",
    bio: "Eerik pinnoittaa ja huoltaa tiilikattoja Pirkanmaalla ja on mukana jokaisessa Pintasen kattotyössä itse.",
    image: getStorageUrl("Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp"),
    phone: YHTEYSTIEDOT.eerik.phone,
    email: YHTEYSTIEDOT.eerik.email,
  },
  eemil: {
    id: "eemil",
    name: "Eemil Pitkänen",
    role: "Seinämaalari, Pintanen Oy",
    bio: "Eemil vastaa Pintasen talojen ulkomaalauksista pohjatöistä viimeiseen sivellinvetoon.",
    image: getStorageUrl("Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp"),
    phone: YHTEYSTIEDOT.eemil.phone,
    email: YHTEYSTIEDOT.eemil.email,
  },
};
