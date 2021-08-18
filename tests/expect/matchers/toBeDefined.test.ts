import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeDefined } from "../../../src/expect/matchers";
import { ITestProps } from "../../../src/types";
import { removeANSIColorStyle } from "../../testHelper";

const TEST_CASES = [[1], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeDefined", () => {
  it.each([[1], [true], [false], ["aa"], [{}], [new Date()], [Symbol.for("")]])(
    "should return true for a defined value (%s)",
    (value) => {
      expect(toBeDefined({ isNot: false }, value)).toEqual({ pass: true, message: "" });
    },
  );

  it("should return true for asymmetricMatcher", () => {
    expect(toBeDefined({ isNot: false }, any())).toEqual({ pass: true, message: "" });
  });

  it("should return false for undefined", () => {
    const report = toBeDefined({ isNot: false }, null);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for null", () => {
    const report = toBeDefined({ isNot: false }, null);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for boolean with isNot true", () => {
    const props: ITestProps = { isNot: true };
    const report = toBeDefined(props, new Date());
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return true for %s", (expected) => {
    const props: ITestProps = { isNot: false };
    const report = toBeDefined(props, expected);
    expect(report.pass).toBeTruthy();
  });
});
