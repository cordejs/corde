import { cordeExpect } from "../../../src/expect";

describe("testing toBePrimitive", () => {
  it.each([
    ["1"],
    [true],
    [false],
    [9007199254740991n],
    [1],
    [cordeExpect.any()],
    [cordeExpect.any(String)],
    [cordeExpect.any(Number)],
    [cordeExpect.any(Boolean)],
    [cordeExpect.any(BigInt)],
  ])("should return true for %s (isNot false)", (value) => {
    expect(cordeExpect(value).toBePrimitive()).toEqual({ pass: true, message: "" });
  });

  it.each([
    ["1"],
    [true],
    [false],
    [9007199254740991n],
    [1],
    [cordeExpect.any(String)],
    [cordeExpect.any(Number)],
    [cordeExpect.any(Boolean)],
    [cordeExpect.any(BigInt)],
  ])("should return false for %s (isNot true)", (value) => {
    const report = cordeExpect(value).not.toBePrimitive();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });

  it.each([
    [{}],
    [Symbol.for("")],
    [() => {}],
    [null],
    [[]],
    [undefined],
    [cordeExpect.any(Symbol)],
    [cordeExpect.any(Object)],
    [cordeExpect.any(Array)],
    [cordeExpect.any(Function)],
  ])("should return false for %s (isNot false)", (value) => {
    const report = cordeExpect(value).toBePrimitive();
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });
});
