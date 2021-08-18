import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeDate } from "../../../src/expect/matchers";
import { ITestProps } from "../../../src/types";
import { removeANSIColorStyle } from "../../testHelper";

const TEST_CASES = [[null], [1], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeDefined", () => {
  it("should return true for a Date value", () => {
    expect(toBeDate({ isNot: false }, new Date())).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(toBeDate({ isNot: false }, any())).toEqual({ pass: true, message: "" });
    expect(toBeDate({ isNot: false }, any(Date))).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not Date", () => {
    const report = toBeDate({ isNot: false }, any(Number));
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for Date with isNot true", () => {
    const props: ITestProps = { isNot: true };
    const report = toBeDate(props, new Date());
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const props: ITestProps = { isNot: false };
    const report = toBeDate(props, expected);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      const props: ITestProps = { isNot: true };
      expect(toBeDate(props, expected)).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
