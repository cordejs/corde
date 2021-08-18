import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeGreaterThan } from "../../../src/expect/matchers";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeGreaterThan", () => {
  it("should return true for a number be bigger than other", () => {
    expect(toBeGreaterThan({ isNot: false }, 2, 1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for a number be less than other (isNot true)", () => {
    expect(toBeGreaterThan({ isNot: true }, 1, 2)).toEqual({ pass: true, message: "" });
  });

  it("should return true for a number be equal than other (isNot true)", () => {
    expect(toBeGreaterThan({ isNot: true }, 1, 1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for 'expected' asymetric value", () => {
    expect(toBeGreaterThan({ isNot: false }, any(), 1)).toEqual({ pass: true, message: "" });
    expect(toBeGreaterThan({ isNot: false }, any(Number), 1)).toEqual({
      pass: true,
      message: "",
    });
  });

  it("should return true for 'received' asymetric value", () => {
    expect(toBeGreaterThan({ isNot: false }, 1, any() as any)).toEqual({
      pass: true,
      message: "",
    });
    expect(toBeGreaterThan({ isNot: false }, 1, any(Number) as any)).toEqual({
      pass: true,
      message: "",
    });
  });

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'expected' not to be a number",
    (expected) => {
      const report = toBeGreaterThan({ isNot: false }, expected, 1 as any);
      report.message = removeANSIColorStyle(report.message);
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'received' not to be a number",
    (received) => {
      const report = toBeGreaterThan({ isNot: false }, 1, received as any);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it("should fail due to expected be less than received", () => {
    const report = toBeGreaterThan({ isNot: false }, 1, 2);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should fail due to expected be equal than received", () => {
    const report = toBeGreaterThan({ isNot: false }, 1, 1);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should fail due to expected be bigger than received (isNot true)", () => {
    const report = toBeGreaterThan({ isNot: true }, 4, 2);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });
});
