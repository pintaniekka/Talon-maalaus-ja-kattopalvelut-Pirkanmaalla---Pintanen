# pintanen.fi

Pintanen Oy:n verkkosivusto: tiilikattojen pinnoitus, katon puhdistus ja talojen ulkomaalaus Pirkanmaalla.

- **Tekniikka:** Vite, React, TypeScript, Tailwind. Sivut esirenderöidään buildissa staattiseksi HTML:ksi.
- **Julkaisu:** Cloudflare Pages julkaisee `main`-haaran osoitteeseen https://pintanen.fi. Jokainen PR saa oman esikatseluosoitteen.
- **Kuvat:** `public/images/`.
- **Lomake:** Cloudflare Pages -funktio `functions/api/contact.ts` (`/api/contact`). Salaisuudet `RESEND_API_KEY` ja `LEAD_INTAKE_SECRET` ovat Pages-projektin asetuksissa ja tulevat voimaan seuraavassa julkaisussa.

```sh
npm install
npm run dev      # kehityspalvelin, portti 8080
npm test         # testit
npm run build    # tuotantobuild kansioon dist
```

Tarkemmat ohjeet koodin rakenteesta ja työtavoista: [CLAUDE.md](CLAUDE.md).
