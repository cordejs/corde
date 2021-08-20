import { cordeExpect } from "../../../src/expect";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeGreaterThan", () => {
  it("should return true for a number be bigger than other", () => {
    expect(cordeExpect(2).toBeGreaterThan(1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for a number be less than other (isNot true)", () => {
    expect(cordeExpect(1).toBeGreaterThan(2)).toEqual({ pass: true, message: "" });
  });

  it("should return true for a number be equal than other (isNot true)", () => {
    expect(cordeExpect(1).toBeGreaterThan(1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for 'expected' asymetric value", () => {
    expect(cordeExpect(cordeExpect.any()).toBeGreaterThan(1)).toEqual({ pass: true, message: "" });
    expect(cordeExpect(cordeExpect.any(Number)).toBeGreaterThan(1)).toEqual({
      pass: true,
      message: "",
    });
  });

  it("should return true for 'received' asymetric value", () => {
    expect(cordeExpect(1).toBeGreaterThan(cordeExpect.any())).toEqual({
      pass: true,
      message: "",
    });
    expect(cordeExpect(1).toBeGreaterThan(cordeExpect.any(Number))).toEqual({
      pass: true,
      message: "",
    });
  });

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'expected' not to be a number",
    (expected) => {
      const report = cordeExpect(expected).toBeGreaterThan(1);
      report.message = removeANSIColorStyle(report.message);
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'received' not to be a number",
    (received) => {
      const report = cordeExpect(1).toBeGreaterThan(received as any);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it("should fail due to expected be less than received", () => {
    const report = cordeExpect(1).toBeGreaterThan(2);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should fail due to expected be equal than received", () => {
    const report = cordeExpect(1).toBeGreaterThan(1);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should fail due to expected be bigger than received (isNot true)", () => {
    const report = cordeExpect(4).toBeGreaterThan(2);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });
});
