import { cordeExpect } from "../../../src/expect";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeNaN", () => {
  it("should return true for NaN (isNot false)", () => {
    expect(cordeExpect(NaN).toBeNaN()).toEqual({ pass: true, message: "" });
  });

  it.each([[""], [false], [true], [[]], [Symbol.for("")], [1]])(
    "should return false for %s (isNot false)",
    (value) => {
      const report = cordeExpect(value).toBeNaN();
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it("should return false for NaN (isNot true)", () => {
    const report = cordeExpect(NaN).not.toBeNaN();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each([[""], [false], [true], [[]], [Symbol.for("")], [1]])(
    "should return true for %s (isNot true)",
    (value) => {
      expect(cordeExpect(value).not.toBeNaN()).toEqual({ pass: true, message: "" });
    },
  );
});
