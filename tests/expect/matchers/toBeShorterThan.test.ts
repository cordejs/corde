import { cordeExpect } from "../../../src/expect/";

const PASS_TESTS = [
  ["1", "11"],
  ["111", "1111"],
  [cordeExpect.any(String), cordeExpect.any(String)],
  [cordeExpect.any(String), "1"],
  ["", cordeExpect.any(String)],
  [cordeExpect.any(), "1"],
  ["", cordeExpect.any()],
];

const FAIL_TESTS = [
  ["11", ""],
  [1, 1],
  ["", 1],
  ["", cordeExpect.any(Number)],
];

describe("testing toBeShorterThan", () => {
  describe.each(PASS_TESTS)("", (expected, value) => {
    it(`should return true for ${expected} and ${value} (isNot false)`, () => {
      expect(cordeExpect(expected).toBeShorterThan(value)).toEqual({ pass: true, message: "" });
    });

    it(`should return true for ${expected} and ${value} (isNot true)`, () => {
      const report = cordeExpect(expected).not.toBeShorterThan(value);
      expect(report.pass).toBeFalsy();
      expect(report.message).toMatchSnapshot();
    });
  });

  describe.each(FAIL_TESTS)("", (expected, value) => {
    it(`should return true for ${expected} and ${value} (isNot false)`, () => {
      const report = cordeExpect(expected).toBeShorterThan(value);
      expect(report.pass).toBeFalsy();
      expect(report.message).toMatchSnapshot();
    });

    it(`should return true for ${expected} and ${value} (isNot true)`, () => {
      expect(cordeExpect(expected).not.toBeShorterThan(value)).toEqual({ pass: true, message: "" });
    });
  });
});
