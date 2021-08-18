import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeUndefined } from "../../../src/expect/matchers";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeUndefined", () => {
  it.each([[undefined]])("should return true for %s", (value) => {
    expect(toBeUndefined({ isNot: false }, value)).toEqual({ pass: true, message: "" });
  });

  it.each([[undefined]])("should return false for %s (isNot true)", (value) => {
    const report = toBeUndefined({ isNot: true }, value);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each([[""], [1], [false], [true], [Symbol.for("")], [any()], [null]])(
    "should return false for %s (isNot false)",
    (value) => {
      const report = toBeUndefined({ isNot: false }, value);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], [1], [false], [true], [Symbol.for("")], [any()], [null]])(
    "should return true for %s (isNot true)",
    (value) => {
      const report = toBeUndefined({ isNot: true }, value);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeTruthy();
    },
  );
});
