import { cordeExpect } from "../../../src/expect";

class Class {}

describe("testing toBeInstanceOf", () => {
  it.each([
    [new Date(), Date],
    [new String(), String],
    [new Number(), Number],
    [new Boolean(), Boolean],
    [new Class(), Class],
    [new Function(), Function],
    [{}, Object],
    [[], Array],
    [new Map(), Map],
    [cordeExpect.any(), Map],
    [cordeExpect.any(String), cordeExpect.any()],
    [cordeExpect.any(), cordeExpect.any(String)],
    [cordeExpect.any(String), cordeExpect.any(String)],
  ])("should return true for %s (isNot false)", (value, type) => {
    expect(cordeExpect(value).toBeInstanceOf(type)).toEqual({ pass: true, message: "" });
  });

  it.each([
    [new Date(), Date],
    [new String(), String],
    [new Number(), Number],
    [new Boolean(), Boolean],
    [new Class(), Class],
    [new Function(), Function],
    [{}, Object],
    [[], Array],
    [new Map(), Map],
  ])("should return false for %s (isNot true)", (value, type) => {
    const report = cordeExpect(value).not.toBeInstanceOf(type);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  it.each([
    [{}, String],
    [Symbol.for(""), Symbol],
    [cordeExpect.any(Number), String],
    [null, null],
    [undefined, undefined],
  ])("should return false for %s (isNot false)", (value, type) => {
    const report = cordeExpect(value).toBeInstanceOf(type);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });
});
