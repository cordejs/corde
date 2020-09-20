import pack from "../src/package";
import * as _pack from "../package.json";
describe("testing package.ts", () => {
  afterAll(() => {
    process.env.ENV = "TEST";
  });
  it("should get correct version if TEST env", () => {
    process.env.ENV = "TEST";
    expect(pack.version).toBe(_pack.version);
  });

  it("should get correct version if not TEST env", () => {
    process.env.ENV = null;
    expect(pack.version).toBe(_pack.version);
  });
});
