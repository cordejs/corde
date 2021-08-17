import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeEmptyArray } from "../../../src/expect/matchers";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeEmptyArray", () => {
  it("should return true for asymmetricMatcher", () => {
    expect(toBeEmptyArray({ isNot: false }, any())).toEqual({ pass: true, message: "" });
    expect(toBeEmptyArray({ isNot: false }, any(Array))).toEqual({ pass: true, message: "" });
  });

  it("should return true for empty array", () => {
    expect(toBeEmptyArray({ isNot: false }, [])).toEqual({ pass: true, message: "" });
  });

  it("should return false for empty array when isNot true", () => {
    const report = toBeEmptyArray({ isNot: true }, []);
    report.message = removeANSIColorStyle(report.message);
    expect(report.message).toMatchSnapshot();
  });

  it.each([[[""]], [""], [1]])("should return false for %s", (value) => {
    const report = toBeEmptyArray({ isNot: false }, value);
    report.message = removeANSIColorStyle(report.message);
    expect(report.message).toMatchSnapshot();
  });
});
