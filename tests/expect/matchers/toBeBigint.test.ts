import { cordeExpect } from "../../../src/expect";

const TEST_CASES = [[null], [1], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeBigint", () => {
  it("should return true for bigint value", () => {
    expect(cordeExpect(9007199254740991n).toBeBigInt()).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(cordeExpect(cordeExpect.any()).toBeBigInt()).toEqual({ pass: true, message: "" });
    expect(cordeExpect(cordeExpect.any(BigInt)).toBeBigInt()).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not bigint", () => {
    const report = cordeExpect(cordeExpect(Number)).toBeBigInt();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for bigint with isNot true", () => {
    const report = cordeExpect(9007199254740991n).not.toBeBigInt();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const report = cordeExpect(expected).toBeBigInt();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      expect(cordeExpect(expected).not.toBeBigInt()).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
