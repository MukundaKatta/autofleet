import { describe, it, expect } from "vitest";
import { Autofleet } from "../src/core.js";
describe("Autofleet", () => {
  it("init", () => { expect(new Autofleet().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Autofleet(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Autofleet(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
