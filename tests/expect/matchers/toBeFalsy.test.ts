import { cordeExpect } from "../../../src/expect/index";

const PASS_TESTS = [[null], [undefined], [""], [0], [false]] as any[];
const FAIL_TESTS = [[true], ["1"], [[]], [1], [cordeExpect.any()]] as any[];

describe("testing toBeFalsy", () => {
  it.each(PASS_TESTS)("should return true for %s and %s", (value) => {
    expect(cordeExpect(value).toBeFalsy()).toEqual({ pass: true, message: "" });
  });

  it.each(PASS_TESTS)("should return false for %s and %s (isNot true)", (value) => {
    const report = cordeExpect(value).not.toBeFalsy();
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  it.each(FAIL_TESTS)("should return false for truthy", (value) => {
    const report = cordeExpect(value).toBeFalsy();
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  it.each(FAIL_TESTS)("should return true for %s and %s (isNot true)", (value) => {
    expect(cordeExpect(value).not.toBeFalsy()).toEqual({ pass: true, message: "" });
  });
});
