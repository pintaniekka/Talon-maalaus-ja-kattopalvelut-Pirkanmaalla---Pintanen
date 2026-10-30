import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import spaRoutes from "./vite-plugin-spa-routes";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), spaRoutes()],
  build: {
    rollupOptions: {
      output: {
        // Nimimalli vaihdettu 5.10.2026 ("-" → "."), jotta kaikki pakettitiedostot saivat uudet
        // osoitteet: selaimet olivat tallentaneet vanhoille nimille 404-vastauksen vuodeksi
        // (ks. functions/assets/[[path]].ts). Älä vaihda takaisin.
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash][extname]",
        // Funktiona (30.10.2026): objektimuodossa Rollup siirsi react-domin vendor-ui-pakettiin, kun etusivu
        // muuttui laiskaksi, koska Toast tarvitsee sitä. Funktio sijoittaa jokaisen moduulin yksiselitteisesti.
        manualChunks(id: string) {
          if (/[\/]node_modules[\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run[\/]router)[\/]/.test(id)) return 'vendor-react';
          // framer-motion ei ole omassa paketissaan: sen animaatio-ominaisuudet ladataan laiskasti
          // (src/lib/motionFeatures.ts), ja oma paketti pakottaisi ne samaan tiedostoon ytimen kanssa.
          // Vain se Radix-paketti, jota sovelluksen runko tarvitsee jokaisella sivulla (Toaster
          // App.tsx:ssä). Muut Radix-paketit (popover, dialog) latautuvat vain sivuilla, jotka niitä
          // käyttävät, ja käyttämättömät karsiutuvat kokonaan. Aiemmin listassa oli yhdeksän pakettia,
          // jolloin myös käyttämättömät (accordion, dropdown-menu, navigation-menu, select, tabs,
          // tooltip) päätyivät jokaisen sivun lataukseen: vendor-ui oli 225 kt, josta Lighthouse laski
          // 47 % käyttämättömäksi (26.10.2026). Älä lisää tähän pakettia, jota App.tsx ei tarvitse.
          // recharts, cmdk, vaul ja embla eivät ole vendor-ui-paketissa (vaihe 5, 12.10.2026): käyttämättöminä
          // ne karsiutuvat kokonaan, käytettyinä ne latautuvat vain sivulla, joka niitä tarvitsee.
          if (/[\/]node_modules[\/]@radix-ui[\/]react-toast[\/]/.test(id)) return 'vendor-ui';
          return undefined;
        },
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
