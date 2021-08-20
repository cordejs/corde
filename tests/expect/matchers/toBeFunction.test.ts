import { cordeExpect } from "../../../src/expect";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeFunction", () => {
  it("should return true for asymmetricMatcher", () => {
    expect(cordeExpect(cordeExpect.any()).toBeFunction()).toEqual({ pass: true, message: "" });
    expect(cordeExpect(cordeExpect.any(Function)).toBeFunction()).toEqual({
      pass: true,
      message: "",
    });
  });

  it("should return true for a function", () => {
    expect(cordeExpect(() => null).toBeFunction()).toEqual({ pass: true, message: "" });
  });

  it("should return false for a function when isNot true", () => {
    const report = cordeExpect(() => null).toBeFunction();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  it.each([[[""]], ["4141"], [1]])("should return false for %s", (value) => {
    const report = cordeExpect(value).toBeFunction();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });
});
