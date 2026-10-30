import { test, expect } from "./fixtures";

// KOE: tarkoituksella epäonnistuva testi, jolla varmistetaan julkaisun jälkeisen tarkistuksen issue. Poistetaan ennen mergeä.
test("KOE: tarkoituksella epäonnistuva testi", async ({ page, contact }) => {
  test.skip(!process.env.E2E_BASE_URL, "vain julkaistua sivustoa vastaan");
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tätä otsikkoa ei ole", { timeout: 2_000 });
});
