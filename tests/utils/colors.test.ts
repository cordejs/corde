import { resolveColor, Colors, ColorsHex } from "../../src/utils/colors";

describe("testing colors", () => {
  it("should get a color by key", () => {
    expect(resolveColor("DARKER_GREY")).toBe(ColorsHex.DARKER_GREY);
  });

  it("should get a color by number from enum", () => {
    expect(resolveColor(Colors.DARKER_GREY)).toBe(ColorsHex.DARKER_GREY);
  });

  it("should get a color by number", () => {
    expect(resolveColor(8359053)).toBe(ColorsHex.DARKER_GREY);
  });

  it("should get a color by number as string", () => {
    expect(resolveColor("8359053")).toBe(ColorsHex.DARKER_GREY);
  });

  it("should return invalid color due to invalid string", () => {
    expect(resolveColor("asdasd")).toBe(-1);
  });

  it("should return invalid color due to invalid string number", () => {
    expect(resolveColor(123)).toBe(123);
  });

  it("should get rgb color", () => {
    expect(resolveColor([255, 0, 0])).toBe(16711680);
  });
});
