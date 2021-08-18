import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeNumber } from "../../../src/expect/matchers";
import { ITestProps } from "../../../src/types";
import { removeANSIColorStyle } from "../../testHelper";

const TEST_CASES = [[null], [9007199254740991n], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeNumber", () => {
  it("should return true for number value", () => {
    expect(toBeNumber({ isNot: false }, 8888)).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(toBeNumber({ isNot: false }, any())).toEqual({ pass: true, message: "" });
    expect(toBeNumber({ isNot: false }, any(Number))).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not number", () => {
    const report = toBeNumber({ isNot: false }, any(BigInt));
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for number with isNot true", () => {
    const props: ITestProps = { isNot: true };
    const report = toBeNumber(props, 8888);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const props: ITestProps = { isNot: false };
    const report = toBeNumber(props, expected);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      const props: ITestProps = { isNot: true };
      expect(toBeNumber(props, expected)).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
