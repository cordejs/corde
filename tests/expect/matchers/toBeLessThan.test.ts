import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeLessThan } from "../../../src/expect/matchers";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeLessThan", () => {
  it("should return true for a number be less than other", () => {
    expect(toBeLessThan({ isNot: false }, 1, 2)).toEqual({ pass: true, message: "" });
  });

  it("should return true for a number be bigger than other (isNot true)", () => {
    expect(toBeLessThan({ isNot: true }, 2, 1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for a number be equal than other (isNot true)", () => {
    expect(toBeLessThan({ isNot: true }, 1, 1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for 'expected' asymetric value", () => {
    expect(toBeLessThan({ isNot: false }, any(), 1)).toEqual({ pass: true, message: "" });
    expect(toBeLessThan({ isNot: false }, any(Number), 1)).toEqual({
      pass: true,
      message: "",
    });
  });

  it("should return true for 'received' asymetric value", () => {
    expect(toBeLessThan({ isNot: false }, 1, any() as any)).toEqual({
      pass: true,
      message: "",
    });
    expect(toBeLessThan({ isNot: false }, 1, any(Number) as any)).toEqual({
      pass: true,
      message: "",
    });
  });

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'expected' not to be a number",
    (expected) => {
      const report = toBeLessThan({ isNot: false }, expected, 1 as any);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'received' not to be a number",
    (received) => {
      const report = toBeLessThan({ isNot: false }, 1, received as any);
      report.message = removeANSIColorStyle(report.message);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it("should fail due to expected be greater than received", () => {
    const report = toBeLessThan({ isNot: false }, 2, 1);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should fail due to expected be equal than received", () => {
    const report = toBeLessThan({ isNot: false }, 1, 1);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should fail due to expected be less than received (isNot true)", () => {
    const report = toBeLessThan({ isNot: true }, 2, 4);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });
});
