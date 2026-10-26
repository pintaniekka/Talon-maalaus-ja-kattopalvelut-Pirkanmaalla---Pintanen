import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * framer-motionin animaatio-ominaisuudet ladataan laiskasti (App.tsx: LazyMotion,
 * src/lib/motionFeatures.ts). Se toimii vain `m`-komponenteilla: `motion.div` toisi
 * koko kirjaston takaisin sivun ensimmäiseen koodipakettiin.
 */
describe("framer-motion", () => {
  it("komponentit käyttävät m-elementtejä, eivät motion-elementtejä (LazyMotion)", () => {
    const srcDir = path.resolve(__dirname, "..");
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== "test") walk(full);
        } else if (/\.tsx?$/.test(entry.name)) {
          const source = fs.readFileSync(full, "utf-8");
          const imp = source.match(/import \{([^}]*)\} from ["']framer-motion["']/);
          if (imp && /(?:^|[\s,])motion(?:[\s,]|$)/.test(imp[1])) offenders.push(path.relative(srcDir, full));
        }
      }
    };
    walk(srcDir);
    expect(offenders).toEqual([]);
  });
});
