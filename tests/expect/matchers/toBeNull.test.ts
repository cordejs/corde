import { cordeExpect } from "../../../src/expect";

describe("testing toBeNull", () => {
  it.each([[null]])("should return true for %s", (value) => {
    expect(cordeExpect(value).toBeNull()).toEqual({ pass: true, message: "" });
  });

  it.each([[null]])("should return false for %s (isNot true)", (value) => {
    const report = cordeExpect(value).not.toBeNull();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each([[""], [1], [false], [true], [Symbol.for("")], [cordeExpect.any()], [undefined]])(
    "should return false for %s (isNot false)",
    (value) => {
      const report = cordeExpect(value).toBeNull();
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], [1], [false], [true], [Symbol.for("")], [cordeExpect.any()], [undefined]])(
    "should return true for %s (isNot true)",
    (value) => {
      const report = cordeExpect(value).not.toBeNull();
      expect(report.pass).toBeTruthy();
    },
  );
});
