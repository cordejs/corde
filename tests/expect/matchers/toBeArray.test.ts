import { cordeExpect } from "../../../src/expect";

const TEST_CASES = [[null], [1], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeArray", () => {
  it("should return true for array", () => {
    cordeExpect;
    expect(cordeExpect([]).toBeArray()).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(cordeExpect(cordeExpect.any()).toBeArray()).toEqual({ pass: true, message: "" });
    expect(cordeExpect(cordeExpect.any(Array)).toBeArray()).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not array", () => {
    const report = cordeExpect(cordeExpect.any(Number)).toBeArray();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for array with isNot true", () => {
    const report = cordeExpect([]).not.toBeArray();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const report = cordeExpect(expected).toBeArray();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      expect(cordeExpect(expected).not.toBeArray()).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
