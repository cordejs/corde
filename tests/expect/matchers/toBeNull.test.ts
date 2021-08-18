import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeNull } from "../../../src/expect/matchers";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeNull", () => {
  it.each([[null]])("should return true for %s", (value) => {
    expect(toBeNull({ isNot: false }, value)).toEqual({ pass: true, message: "" });
  });

  it.each([[null]])("should return false for %s (isNot true)", (value) => {
    const report = toBeNull({ isNot: true }, value);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each([[""], [1], [false], [true], [Symbol.for("")], [any()], [undefined]])(
    "should return false for %s (isNot false)",
    (value) => {
      const report = toBeNull({ isNot: false }, value);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], [1], [false], [true], [Symbol.for("")], [any()], [undefined]])(
    "should return true for %s (isNot true)",
    (value) => {
      const report = toBeNull({ isNot: true }, value);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeTruthy();
    },
  );
});
