import { cordeExpect } from "../../../src/expect";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeEmptyArray", () => {
  it("should return true for asymmetricMatcher", () => {
    expect(cordeExpect(cordeExpect.any()).toBeEmptyArray()).toEqual({ pass: true, message: "" });
    expect(cordeExpect(cordeExpect.any(Array)).toBeEmptyArray()).toEqual({
      pass: true,
      message: "",
    });
  });

  it("should return true for empty array", () => {
    expect(cordeExpect([]).toBeEmptyArray()).toEqual({ pass: true, message: "" });
  });

  it("should return false for empty array when isNot true", () => {
    const report = cordeExpect([]).not.toBeEmptyArray();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  it.each([[[""]], [""], [1]])("should return false for %s", (value) => {
    const report = cordeExpect(value).toBeEmptyArray();
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });
});
