import { cordeExpect } from "../../../src/expect";
import { removeANSIColorStyle } from "../../testHelper";

const TEST_CASES = [[null], [1], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeDefined", () => {
  it("should return true for a Date value", () => {
    expect(cordeExpect(new Date()).toBeDate()).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(cordeExpect(cordeExpect.any()).toBeDate()).toEqual({ pass: true, message: "" });
    expect(cordeExpect(cordeExpect(Date)).toBeDate()).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not Date", () => {
    const report = cordeExpect(cordeExpect.any(Number)).toBeDate();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should return false for Date with isNot true", () => {
    const report = cordeExpect(new Date()).toBeDate();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const report = cordeExpect(expected).toBeDate();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      expect(cordeExpect(expected).not.toBeDate()).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
