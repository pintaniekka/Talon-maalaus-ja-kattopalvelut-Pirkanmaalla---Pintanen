import type { ComponentType, LazyExoticComponent } from "react";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

/**
 * Artikkelien leipätekstit, ladataan laiskasti slugin mukaan.
 * Avain = slug tiedostossa src/data/articles.ts.
 */
export const articleBodies: Record<string, LazyExoticComponent<ComponentType>> = {
  "milloin-pinnoittaa-tiilikatto": lazyWithRetry(() => import("./milloin-pinnoittaa-tiilikatto")),
};
