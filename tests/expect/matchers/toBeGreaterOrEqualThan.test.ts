import { cordeExpect } from "../../../src/expect";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeGreaterOrEqualThan", () => {
  it("should return true for a number be bigger than other", () => {
    expect(cordeExpect(2).toBeGreaterOrEqualThan(1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for a number be equal other", () => {
    expect(cordeExpect(1).toBeGreaterOrEqualThan(1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for 'expected' asymetric value", () => {
    expect(cordeExpect(cordeExpect.any()).toBeGreaterOrEqualThan(1)).toEqual({
      pass: true,
      message: "",
    });
    expect(cordeExpect(cordeExpect.any(Number)).toBeGreaterOrEqualThan(1)).toEqual({
      pass: true,
      message: "",
    });
  });

  it("should return true for 'received' asymetric value", () => {
    expect(cordeExpect(1).toBeGreaterOrEqualThan(cordeExpect.any())).toEqual({
      pass: true,
      message: "",
    });
    expect(cordeExpect(1).toBeGreaterOrEqualThan(cordeExpect.any(Number))).toEqual({
      pass: true,
      message: "",
    });
  });

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'expected' not to be a number",
    (expected) => {
      const report = cordeExpect(expected).toBeGreaterOrEqualThan(1);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'received' not to be a number",
    (received) => {
      const report = cordeExpect(1).toBeGreaterOrEqualThan(received as any);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it("should fail due to expected be less than received", () => {
    const report = cordeExpect(1).toBeGreaterOrEqualThan(2);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should fail due to expected be bigger than received (isNot true)", () => {
    const report = cordeExpect(4).not.toBeGreaterOrEqualThan(2);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });
});
