// @vitest-environment node
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { onRequest, IMMUTABLE, NO_STORE } from "../../functions/assets/[[path]]";

const fakeAssets = (status: number, body = "x", headers: Record<string, string> = {}) => ({
  fetch: async () => new Response(body, { status, headers: { "Content-Type": "text/javascript", ...headers } }),
});

const call = (status: number, headers?: Record<string, string>) =>
  onRequest({ request: new Request("https://pintanen.fi/assets/index.abc123.js"), env: { ASSETS: fakeAssets(status, "x", headers) } });

describe("Pages Function /assets/* (404 ei saa pitkää välimuistia)", () => {
  it("onnistunut vastaus pysyy vuoden immutable-välimuistissa", async () => {
    const res = await call(200, { "Cache-Control": IMMUTABLE });
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe(IMMUTABLE);
    expect(res.headers.get("Content-Type")).toBe("text/javascript");
    expect(await res.text()).toBe("x");
  });

  it("404 saa no-store, vaikka staattinen jakelu antaisi immutable-otsakkeen", async () => {
    const res = await call(404, { "Cache-Control": IMMUTABLE });
    expect(res.status).toBe(404);
    expect(res.headers.get("Cache-Control")).toBe(NO_STORE);
  });

  it("palvelinvirhe saa no-store", async () => {
    expect((await call(503)).headers.get("Cache-Control")).toBe(NO_STORE);
  });

  it("304 Not Modified pitää immutable-otsakkeen", async () => {
    const res = await onRequest({
      request: new Request("https://pintanen.fi/assets/index.abc123.js"),
      env: { ASSETS: { fetch: async () => new Response(null, { status: 304 }) } },
    });
    expect(res.status).toBe(304);
    expect(res.headers.get("Cache-Control")).toBe(IMMUTABLE);
  });

  it("_routes.json ohjaa /assets/* ja /api/* funktioille", () => {
    const routes = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/_routes.json"), "utf-8"));
    expect(routes.include).toContain("/assets/*");
    expect(routes.include).toContain("/api/*");
  });

  it("_headers: HTML-sivuilla ei ole pitkää välimuistia", () => {
    const headers = fs.readFileSync(path.resolve(__dirname, "../../public/_headers"), "utf-8");
    expect(headers).toMatch(/^\/\*\/\n\s+Cache-Control: public, max-age=0, must-revalidate/m);
    expect(headers).toMatch(/^\/\n\s+Cache-Control: public, max-age=0, must-revalidate/m);
  });
});
