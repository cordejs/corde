import { cordeExpect } from "../../../src/expect";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeNull", () => {
  it.each([[null]])("should return true for %s", (value) => {
    expect(cordeExpect(null).toBeNull()).toEqual({ pass: true, message: "" });
  });

  it.each([[null]])("should return false for %s (isNot true)", (value) => {
    const report = cordeExpect(null).not.toBeNull();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each([[""], [1], [false], [true], [Symbol.for("")], [cordeExpect.any()], [undefined]])(
    "should return false for %s (isNot false)",
    (value) => {
      const report = cordeExpect(value).toBeNull();
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], [1], [false], [true], [Symbol.for("")], [cordeExpect.any()], [undefined]])(
    "should return true for %s (isNot true)",
    (value) => {
      const report = cordeExpect(value).not.toBeNull();
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeTruthy();
    },
  );
});
