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
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          // Vain se Radix-paketti, jota sovelluksen runko tarvitsee jokaisella sivulla (Toaster
          // App.tsx:ssä). Muut Radix-paketit (popover, dialog) latautuvat vain sivuilla, jotka niitä
          // käyttävät, ja käyttämättömät karsiutuvat kokonaan. Aiemmin listassa oli yhdeksän pakettia,
          // jolloin myös käyttämättömät (accordion, dropdown-menu, navigation-menu, select, tabs,
          // tooltip) päätyivät jokaisen sivun lataukseen: vendor-ui oli 225 kt, josta Lighthouse laski
          // 47 % käyttämättömäksi (26.10.2026). Älä lisää tähän pakettia, jota App.tsx ei tarvitse.
          'vendor-ui': ['@radix-ui/react-toast'],
          // recharts, cmdk, vaul ja embla eivät ole vendor-ui-paketissa (vaihe 5, 12.10.2026): käyttämättöminä
          // ne karsiutuvat kokonaan, käytettyinä ne latautuvat vain sivulla, joka niitä tarvitsee.
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
