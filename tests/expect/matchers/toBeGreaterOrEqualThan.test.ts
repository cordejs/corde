import chalk from "chalk";
import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeGreaterOrEqualThan } from "../../../src/expect/matchers";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBeFunction", () => {
  it("should return true for a number be bigger than other", () => {
    expect(toBeGreaterOrEqualThan({ isNot: false }, 2, 1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for a number be equal other", () => {
    expect(toBeGreaterOrEqualThan({ isNot: false }, 1, 1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for 'expected' asymetric value", () => {
    expect(toBeGreaterOrEqualThan({ isNot: false }, any(), 1)).toEqual({ pass: true, message: "" });
    expect(toBeGreaterOrEqualThan({ isNot: false }, any(Number), 1)).toEqual({
      pass: true,
      message: "",
    });
  });

  it("should return true for 'received' asymetric value", () => {
    expect(toBeGreaterOrEqualThan({ isNot: false }, 1, any() as any)).toEqual({
      pass: true,
      message: "",
    });
    expect(toBeGreaterOrEqualThan({ isNot: false }, 1, any(Number) as any)).toEqual({
      pass: true,
      message: "",
    });
  });

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'expected' not to be a number",
    (expected) => {
      const report = toBeGreaterOrEqualThan({ isNot: false }, expected, 1 as any);
      report.message = removeANSIColorStyle(report.message);
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'received' not to be a number",
    (received) => {
      const report = toBeGreaterOrEqualThan({ isNot: false }, 1, received as any);
      report.message = removeANSIColorStyle(report.message);
      expect(report).toMatchSnapshot();
    },
  );

  it("should fail due to expected be less than received", () => {
    const report = toBeGreaterOrEqualThan({ isNot: false }, 1, 2);
    report.message = removeANSIColorStyle(report.message);
    expect(report).toMatchSnapshot();
  });

  it("should fail due to expected be bigger than received (isNot true)", () => {
    const report = toBeGreaterOrEqualThan({ isNot: true }, 4, 2);
    report.message = removeANSIColorStyle(report.message);
    expect(report).toMatchSnapshot();
  });
});
