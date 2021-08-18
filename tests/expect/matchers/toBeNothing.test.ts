import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeNothing } from "../../../src/expect/matchers";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeNothing", () => {
  it.each([[undefined], [null]])("should return true for %s", (value) => {
    expect(toBeNothing({ isNot: false }, value)).toEqual({ pass: true, message: "" });
  });

  it.each([[undefined], [null]])("should return false for %s (isNot true)", (value) => {
    const report = toBeNothing({ isNot: true }, value);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each([[""], [1], [false], [true], [Symbol.for("")], [any()]])(
    "should return false for %s (isNot false)",
    (value) => {
      const report = toBeNothing({ isNot: false }, value);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], [1], [false], [true], [Symbol.for("")], [any()]])(
    "should return true for %s (isNot true)",
    (value) => {
      const report = toBeNothing({ isNot: true }, value);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeTruthy();
    },
  );
});
