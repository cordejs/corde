import { cordeExpect } from "../../../src/expect";

describe("testing toBeNegativeInfinity", () => {
  it.each([
    [-Number.MAX_VALUE * 2],
    [cordeExpect.any()],
    [cordeExpect.any(BigInt)],
    [cordeExpect.any(Number)],
  ])("should return true for negative infinity (isNot false)", (value) => {
    expect(cordeExpect(value).toBeNegativeInfinity()).toEqual({
      pass: true,
      message: "",
    });
  });

  it.each([
    [-Number.MAX_VALUE * 2],
    [cordeExpect.any()],
    [cordeExpect.any(BigInt)],
    [cordeExpect.any(Number)],
  ])("should return false for negative infinity (isNot true)", (value) => {
    const report = cordeExpect(value).not.toBeNegativeInfinity();
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
  ])("should return false for values that are not negative infinity numbers", () => {
    const report = cordeExpect(-Number.MAX_VALUE * 2).not.toBeNegativeInfinity();
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });
});
