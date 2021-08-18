import { any } from "../../../src/expect/asymmetricMatcher";
import { toBePrimitive } from "../../../src/expect/matchers";
import { removeANSIColorStyle } from "../../testHelper";

describe("testing toBePrimitive", () => {
  it.each([
    ["1"],
    [true],
    [false],
    [9007199254740991n],
    [1],
    [any()],
    [any(String)],
    [any(Number)],
    [any(Boolean)],
    [any(BigInt)],
  ])("should return true for %s (isNot false)", (value) => {
    expect(toBePrimitive({ isNot: false }, value)).toEqual({ pass: true, message: "" });
  });

  it.each([
    ["1"],
    [true],
    [false],
    [9007199254740991n],
    [1],
    [any(String)],
    [any(Number)],
    [any(Boolean)],
    [any(BigInt)],
  ])("should return false for %s (isNot true)", (value) => {
    const report = toBePrimitive({ isNot: true }, value);
    report.message = removeANSIColorStyle(report.message);
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
    [any(Symbol)],
    [any(Object)],
    [any(Array)],
    [any(Function)],
  ])("should return false for %s (isNot false)", (value) => {
    const report = toBePrimitive({ isNot: false }, value);
    report.message = removeANSIColorStyle(report.message);
    expect(report.pass).toBeFalsy();
    expect(report).toMatchSnapshot();
  });
});
