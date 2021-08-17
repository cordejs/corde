import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeEmptyString } from "../../../src/expect/matchers";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeEmptyString", () => {
  it("should return true for asymmetricMatcher", () => {
    expect(toBeEmptyString({ isNot: false }, any())).toEqual({ pass: true, message: "" });
    expect(toBeEmptyString({ isNot: false }, any(String))).toEqual({ pass: true, message: "" });
  });

  it("should return true for empty string", () => {
    expect(toBeEmptyString({ isNot: false }, "")).toEqual({ pass: true, message: "" });
  });

  it("should return false for empty string when isNot true", () => {
    const report = toBeEmptyString({ isNot: true }, "");
    report.message = removeANSIColorStyle(report.message);
    expect(report.message).toMatchSnapshot();
  });

  it.each([[[""]], ["4141"], [1]])("should return false for %s", (value) => {
    const report = toBeEmptyString({ isNot: false }, value);
    report.message = removeANSIColorStyle(report.message);
    expect(report.message).toMatchSnapshot();
  });
});
