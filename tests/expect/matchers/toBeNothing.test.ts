import { cordeExpect } from "../../../src/expect";

describe("testing toBeNothing", () => {
  it.each([[undefined], [null]])("should return true for %s", (value) => {
    expect(cordeExpect(value).toBeNothing()).toEqual({ pass: true, message: "" });
  });

  it.each([[undefined], [null]])("should return false for %s (isNot true)", (value) => {
    const report = cordeExpect(value).not.toBeNothing();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each([[""], [1], [false], [true], [Symbol.for("")], [cordeExpect.any()]])(
    "should return false for %s (isNot false)",
    (value) => {
      const report = cordeExpect(value).toBeNothing();
      expect(report.pass).toBeFalsy();
      expect(report).toMatchSnapshot();
    },
  );

  it.each([[""], [1], [false], [true], [Symbol.for("")], [cordeExpect.any()]])(
    "should return true for %s (isNot true)",
    (value) => {
      expect(cordeExpect(value).not.toBeNothing()).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
