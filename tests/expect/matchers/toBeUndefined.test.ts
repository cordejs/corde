import { cordeExpect } from "../../../src/expect";

describe("testing toBeUndefined", () => {
  it.each([[undefined]])("should return true for %s", (value) => {
    expect(cordeExpect(value).toBeUndefined()).toEqual({ pass: true, message: "" });
  });

  it.each([[undefined]])("should return false for %s (isNot true)", (value) => {
    const report = cordeExpect(value).not.toBeUndefined();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each([[""], [1], [false], [true], [Symbol.for("")], [cordeExpect.any()], [null]])(
    "should return false for %s (isNot false)",
    (value) => {
      const report = cordeExpect(value).toBeUndefined();
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], [1], [false], [true], [Symbol.for("")], [cordeExpect.any()], [null]])(
    "should return true for %s (isNot true)",
    (value) => {
      const report = cordeExpect(value).not.toBeUndefined();
      expect(report.pass).toBeTruthy();
    },
  );
});
