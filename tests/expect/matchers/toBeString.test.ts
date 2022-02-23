import { cordeExpect } from "../../../src/expect";

const TEST_CASES = [[null], [9007199254740991n], [undefined], [111], [{}], [Symbol.for("")]];

describe("testing toBeString", () => {
  it("should return true for number value", () => {
    expect(cordeExpect("aaaa").toBeString()).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(cordeExpect(cordeExpect.any()).toBeString()).toEqual({ pass: true, message: "" });
    expect(cordeExpect(cordeExpect.any(String)).toBeString()).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not number", () => {
    const report = cordeExpect(cordeExpect.any(BigInt)).toBeString();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for number with isNot true", () => {
    const report = cordeExpect("aaaa").not.toBeString();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const report = cordeExpect(expected).toBeString();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      expect(cordeExpect(expected).not.toBeString()).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
