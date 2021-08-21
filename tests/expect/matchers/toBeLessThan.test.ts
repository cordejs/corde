import { cordeExpect } from "../../../src/expect";

describe("testing toBeLessThan", () => {
  it("should return true for a number be less than other", () => {
    expect(cordeExpect(1).toBeLessThan(2)).toEqual({ pass: true, message: "" });
  });

  it("should return true for a number be bigger than other (isNot true)", () => {
    expect(cordeExpect(2).not.toBeLessThan(1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for a number be equal than other (isNot true)", () => {
    expect(cordeExpect(1).not.toBeLessThan(1)).toEqual({ pass: true, message: "" });
  });

  it("should return true for 'expected' asymetric value", () => {
    expect(cordeExpect(cordeExpect.any()).toBeLessThan(1)).toEqual({ pass: true, message: "" });
    expect(cordeExpect(cordeExpect.any(Number)).toBeLessThan(1)).toEqual({
      pass: true,
      message: "",
    });
  });

  it("should return true for 'received' asymetric value", () => {
    expect(cordeExpect(1).toBeLessThan(cordeExpect.any())).toEqual({
      pass: true,
      message: "",
    });
    expect(cordeExpect(1).toBeLessThan(cordeExpect.any(Number))).toEqual({
      pass: true,
      message: "",
    });
  });

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'expected' not to be a number",
    (expected) => {
      const report = cordeExpect(expected).toBeLessThan(1);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], ["1"], [false], [true], [[]]])(
    "should return false for 'received' not to be a number",
    (received) => {
      const report = cordeExpect(1).toBeLessThan(received as any);
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it("should fail due to expected be greater than received", () => {
    const report = cordeExpect(2).toBeLessThan(1);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should fail due to expected be equal than received", () => {
    const report = cordeExpect(1).toBeLessThan(1);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it("should fail due to expected be less than received (isNot true)", () => {
    const report = cordeExpect(2).not.toBeLessThan(4);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });
});
