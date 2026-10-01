import "@testing-library/jest-dom";

// Selainympäristön (jsdom) testeille; node-ympäristön testeissä ikkunaa ei ole.
if (typeof window !== "undefined")
  Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
