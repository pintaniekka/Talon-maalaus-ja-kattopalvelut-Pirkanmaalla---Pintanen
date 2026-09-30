import type { ComponentType, LazyExoticComponent } from "react";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

/**
 * Artikkelien leipätekstit, ladataan laiskasti slugin mukaan.
 * Avain = slug tiedostossa src/data/articles.ts.
 */
export const articleBodies: Record<string, LazyExoticComponent<ComponentType>> = {
  "milloin-pinnoittaa-tiilikatto": lazyWithRetry(() => import("./milloin-pinnoittaa-tiilikatto")),
  "kotitalousvahennys-katto-ja-maalaustyot": lazyWithRetry(() => import("./kotitalousvahennys-katto-ja-maalaustyot")),
  "tiilikaton-pinnoituksen-hinta": lazyWithRetry(() => import("./tiilikaton-pinnoituksen-hinta")),
  "kuinka-usein-puutalo-maalataan": lazyWithRetry(() => import("./kuinka-usein-puutalo-maalataan")),
  "tiilikaton-puhdistus-itse-vai-ammattilainen": lazyWithRetry(() => import("./tiilikaton-puhdistus-itse-vai-ammattilainen")),
};
