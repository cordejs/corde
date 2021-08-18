import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeNaN } from "../../../src/expect/matchers";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeNaN", () => {
  it("should return true for NaN (isNot false)", () => {
    expect(toBeNaN({ isNot: false }, NaN)).toEqual({ pass: true, message: "" });
  });

  it.each([[""], [false], [true], [[]], [Symbol.for("")], [1]])(
    "should return false for %s (isNot false)",
    (value) => {
      const report = toBeNaN({ isNot: false }, value);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it("should return false for NaN (isNot true)", () => {
    const report = toBeNaN({ isNot: true }, NaN);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each([[""], [false], [true], [[]], [Symbol.for("")], [1]])(
    "should return true for %s (isNot true)",
    (value) => {
      expect(toBeNaN({ isNot: true }, value)).toEqual({ pass: true, message: "" });
    },
  );
});
