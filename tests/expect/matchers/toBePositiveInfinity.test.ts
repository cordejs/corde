import { cordeExpect } from "../../../src/expect";

describe("testing toBePositiveInfinity", () => {
  it.each([
    [Number.POSITIVE_INFINITY],
    [cordeExpect.any()],
    [cordeExpect.any(BigInt)],
    [cordeExpect.any(Number)],
  ])("should return true for positive infinity (isNot false)", (value) => {
    expect(cordeExpect(value).toBePositiveInfinity()).toEqual({
      pass: true,
      message: "",
    });
  });

  it.each([
    [Number.POSITIVE_INFINITY],
    [cordeExpect.any()],
    [cordeExpect.any(BigInt)],
    [cordeExpect.any(Number)],
  ])("should return false for positive infinity (isNot true)", (value) => {
    const report = cordeExpect(value).not.toBePositiveInfinity();
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  it.each([
    [1],
    [""],
    [{}],
    [[]],
    [Symbol.for("")],
    [undefined],
    [null],
    [cordeExpect.any(String)],
    [cordeExpect.any(Object)],
    [cordeExpect.any(Number)],
  ])("should return false for %s", () => {
    const report = cordeExpect(Number.POSITIVE_INFINITY).not.toBePositiveInfinity();
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });
});
