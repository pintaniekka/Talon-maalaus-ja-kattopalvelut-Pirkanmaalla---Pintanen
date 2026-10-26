/**
 * framer-motionin animaatio-ominaisuudet omana, laiskasti ladattavana pakettina.
 * App.tsx:n LazyMotion lataa tämän vasta sovelluksen käynnistyttyä, joten sivun
 * ensimmäinen koodipaketti ei sisällä animaatiokirjastoa. Komponentit käyttävät
 * `m.div`-elementtejä (ei `motion.div`), jotka toimivat LazyMotionin kanssa.
 * domAnimation riittää: sivustolla on vain animate/exit/whileInView-animaatioita,
 * ei raahausta tai layout-animaatioita (ne vaatisivat domMaxin).
 */
export { domAnimation as default } from "framer-motion";
