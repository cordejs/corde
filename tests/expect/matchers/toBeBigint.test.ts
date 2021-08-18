import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeBigint } from "../../../src/expect/matchers";
import { ITestProps } from "../../../src/types";
import { removeANSIColorStyle } from "../../testHelper";

const TEST_CASES = [[null], [1], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeBigint", () => {
  it("should return true for bigint value", () => {
    expect(toBeBigint({ isNot: false }, 9007199254740991n)).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(toBeBigint({ isNot: false }, any())).toEqual({ pass: true, message: "" });
    expect(toBeBigint({ isNot: false }, any(BigInt))).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not bigint", () => {
    const report = toBeBigint({ isNot: false }, any(Number));
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for bigint with isNot true", () => {
    const props: ITestProps = { isNot: true };
    const report = toBeBigint(props, 9007199254740991n);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const props: ITestProps = { isNot: false };
    const report = toBeBigint(props, expected);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      const props: ITestProps = { isNot: true };
      expect(toBeBigint(props, expected)).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
