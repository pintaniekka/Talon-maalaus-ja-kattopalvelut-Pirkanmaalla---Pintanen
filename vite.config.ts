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
          'vendor-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            'recharts',
            'cmdk',
            'vaul',
            'embla-carousel-react',
          ],
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
