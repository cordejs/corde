import { cordeExpect } from "../../../src/expect/";

const PASS_TESTS = [
  ["abcdefgh", "fgh"],
  ["111", "1"],
  [cordeExpect.any(String), cordeExpect.any(String)],
  [cordeExpect.any(String), "1"],
  ["foo", cordeExpect.any(String)],
  [cordeExpect.any(), "1"],
  ["foo", cordeExpect.any()],
];

const FAIL_TESTS = [
  ["foo", "bar"],
  [1, 1],
  ["", 1],
  ["", cordeExpect.any(Number)],
];

describe("testing toEndWith", () => {
  describe.each(PASS_TESTS)("", (expected, value) => {
    it(`should return true for ${expected} and ${value} (isNot false)`, () => {
      expect(cordeExpect(expected).toEndWith(value)).toEqual({ pass: true, message: "" });
    });

    it(`should return true for ${expected} and ${value} (isNot true)`, () => {
      const report = cordeExpect(expected).not.toEndWith(value);
      expect(report.pass).toBeFalsy();
      expect(report.message).toMatchSnapshot();
    });
  });

  describe.each(FAIL_TESTS)("", (expected, value) => {
    it(`should return true for ${expected} and ${value} (isNot false)`, () => {
      const report = cordeExpect(expected).toEndWith(value);
      expect(report.pass).toBeFalsy();
      expect(report.message).toMatchSnapshot();
    });

    it(`should return true for ${expected} and ${value} (isNot true)`, () => {
      expect(cordeExpect(expected).not.toEndWith(value)).toEqual({ pass: true, message: "" });
    });
  });
});
