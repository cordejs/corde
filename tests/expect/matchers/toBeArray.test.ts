import { toBeArray } from "../../../src/expect/matchers";
import { any } from "../../../src/expect/asymmetricMatcher";
import { ITestProps } from "../../../src/types";
import { removeANSIColorStyle } from "../../testHelper";

const TEST_CASES = [[null], [1], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeArray", () => {
  it("should return true for array", () => {
    expect(toBeArray({ isNot: false }, [])).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(toBeArray({ isNot: false }, any())).toEqual({ pass: true, message: "" });
    expect(toBeArray({ isNot: false }, any(Array))).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not array", () => {
    const report = toBeArray({ isNot: false }, any(Number));
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for array with isNot true", () => {
    const props: ITestProps = { isNot: true };
    const report = toBeArray(props, []);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const props: ITestProps = { isNot: false };
    const report = toBeArray(props, expected);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      const props: ITestProps = { isNot: true };
      expect(toBeArray(props, expected)).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
