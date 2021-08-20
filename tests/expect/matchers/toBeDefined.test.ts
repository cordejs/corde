import { cordeExpect } from "../../../src/expect";
import { removeANSIColorStyle } from "../../testHelper";

const TEST_CASES = [[1], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeDefined", () => {
  it.each([[1], [true], [false], ["aa"], [{}], [new Date()], [Symbol.for("")]])(
    "should return true for a defined value (%s)",
    (value) => {
      expect(cordeExpect(value).toBeDefined()).toEqual({ pass: true, message: "" });
    },
  );

  it("should return true for asymmetricMatcher", () => {
    expect(cordeExpect(cordeExpect.any()).toBeDefined()).toEqual({ pass: true, message: "" });
  });

  it("should return false for undefined", () => {
    const report = cordeExpect(undefined).toBeDefined();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for null", () => {
    const report = cordeExpect(null).toBeDefined();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for boolean with isNot true", () => {
    const report = cordeExpect(new Date()).not.toBeDefined();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return true for %s", (expected) => {
    const report = cordeExpect(expected).toBeDefined();
    expect(report.pass).toBeTruthy();
  });
});
