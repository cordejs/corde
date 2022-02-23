import { cordeExpect } from "../../../src/expect";

const TEST_CASES = [[null], [9007199254740991n], [undefined], [111], [{}], ["a"], [""]];

describe("testing toBeSymbol", () => {
  it("should return true for number value", () => {
    expect(cordeExpect(Symbol.for("")).toBeSymbol()).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(cordeExpect(cordeExpect.any()).toBeSymbol()).toEqual({ pass: true, message: "" });
    expect(cordeExpect(cordeExpect.any(Symbol)).toBeSymbol()).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not number", () => {
    const report = cordeExpect(cordeExpect.any(BigInt)).toBeSymbol();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for number with isNot true", () => {
    const report = cordeExpect(Symbol.for("")).not.toBeSymbol();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const report = cordeExpect(expected).toBeSymbol();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      expect(cordeExpect(expected).not.toBeSymbol()).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
