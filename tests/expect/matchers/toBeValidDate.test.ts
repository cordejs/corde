import { cordeExpect } from "../../../src/expect";

describe("testing toBeValidDate", () => {
  it.each([
    ["1"],
    [1],
    [new Date()],
    [cordeExpect.any()],
    [cordeExpect.any(Date)],
    [cordeExpect.any(Number)],
    [cordeExpect.any],
  ])("should return true for valid date (%s) (isNot false)", (value) => {
    expect(cordeExpect(value).toBeValidDate()).toEqual({ pass: true, message: "" });
  });

  it.each([
    ["1"],
    [1],
    [new Date()],
    [cordeExpect.any()],
    [cordeExpect.any(Date)],
    [cordeExpect.any(Number)],
    [cordeExpect.any],
  ])("should return false for valid date (%s) (isNot true)", (value) => {
    const report = cordeExpect(value).not.toBeValidDate();
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  it.each([
    [undefined],
    [null],
    ["foo"],
    [cordeExpect.any(String)],
    [cordeExpect.any(Symbol)],
    [cordeExpect.any(Boolean)],
    [cordeExpect.any(Object)],
  ])("should return false for invalid date (%s) (isNot false)", (value) => {
    const report = cordeExpect(value).toBeValidDate();
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });
});
