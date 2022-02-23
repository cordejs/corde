import { rgba } from "../../src/utils/rgba";

describe("testing rgba function", () => {
  it("should return null due to invalid value", () => {
    // @ts-expect-error
    expect(rgba(null)).toEqual([0, 0, 0, 0]);
  });

  it("should return null due to invalid value (string)", () => {
    // @ts-ignore
    expect(rgba("")).toEqual([0, 0, 0, 0]);
  });

  it("should convert a number to an rgba value", () => {
    expect(rgba(-5952982)).toEqual([165, 42, 42, 1]);
  });
  it("should convert a number to an rgba value 2", () => {
    expect(rgba(-12525360)).toEqual([64, 224, 208, 1]);
  });
});
