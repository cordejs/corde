import { cordeExpect } from "../../../src/expect";
import { ITestProps } from "../../../src/types";
import { removeANSIColorStyle } from "../../testHelper";

const TEST_CASES = [[null], [1], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeBoolean", () => {
  it("should return true for boolean value", () => {
    expect(cordeExpect(false).toBeBoolean()).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(cordeExpect(cordeExpect.any()).toBeBoolean()).toEqual({ pass: true, message: "" });
    expect(cordeExpect(cordeExpect.any(Boolean)).toBeBoolean()).toEqual({
      pass: true,
      message: "",
    });
  });

  it("should return false for asymmetricMatcher of any value that is not boolean", () => {
    const report = cordeExpect(cordeExpect.any(Number)).toBeBoolean();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for boolean with isNot true", () => {
    const report = cordeExpect(false).not.toBeBoolean();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const report = cordeExpect(expected).toBeBoolean();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      const props: ITestProps = { isNot: true };
      expect(cordeExpect(expected).toBeBoolean()).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
