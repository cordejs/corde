import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeFunction } from "../../../src/expect/matchers";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeFunction", () => {
  it("should return true for asymmetricMatcher", () => {
    expect(toBeFunction({ isNot: false }, any())).toEqual({ pass: true, message: "" });
    expect(toBeFunction({ isNot: false }, any(Function))).toEqual({ pass: true, message: "" });
  });

  it("should return true for a function", () => {
    expect(toBeFunction({ isNot: false }, () => null)).toEqual({ pass: true, message: "" });
  });

  it("should return false for a function when isNot true", () => {
    const report = toBeFunction({ isNot: true }, () => null);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  it.each([[[""]], ["4141"], [1]])("should return false for %s", (value) => {
    const report = toBeFunction({ isNot: false }, value);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });
});
