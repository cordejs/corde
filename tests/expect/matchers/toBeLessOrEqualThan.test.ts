import { cordeExpect } from "../../../src/expect";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeLessOrEqualThan", () => {
  it("should return true for a number be less than other", () => {
    expect(cordeExpect(1).toBeLessOrEqualThan(2)).toEqual({ pass: true, message: "" });
  });

  it("should return true for a number be equal other", () => {
    expect(cordeExpect(1).toBeLessOrEqualThan(1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for 'expected' asymetric value", () => {
    expect(cordeExpect(cordeExpect.any()).toBeLessOrEqualThan(1)).toEqual({
      pass: true,
      message: "",
    });
    expect(cordeExpect(cordeExpect.any(Number)).toBeLessOrEqualThan(1)).toEqual({
      pass: true,
      message: "",
    });
  });

  it("should return true for 'received' asymetric value", () => {
    expect(cordeExpect(1).toBeLessOrEqualThan(cordeExpect.any())).toEqual({
      pass: true,
      message: "",
    });
    expect(cordeExpect(1).toBeLessOrEqualThan(cordeExpect.any(Number))).toEqual({
      pass: true,
      message: "",
    });
  });

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'expected' not to be a number",
    (expected) => {
      const report = cordeExpect(expected).toBeLessOrEqualThan(1);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'received' not to be a number",
    (received) => {
      const report = cordeExpect(1).toBeLessOrEqualThan(received as any);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it("should fail due to expected be greater than received", () => {
    const report = cordeExpect(2).toBeLessOrEqualThan(1);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should fail due to expected be less than received (isNot true)", () => {
    const report = cordeExpect(2).not.toBeLessOrEqualThan(4);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });
});
