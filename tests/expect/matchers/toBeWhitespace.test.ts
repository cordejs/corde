import { cordeExpect } from "../../../src/expect";

const PASS_TESTS = [[" "], ["   "], ["     "], ["       "]];

const FAIL_TESTS = [
  [" 1"],
  [1],
  [{}],
  [Object],
  [cordeExpect.any(Number)],
  [cordeExpect.any(String)],
  [[]],
  ["          122  23 1 "],
];

describe("testing toBeWhitespace", () => {
  describe.each(PASS_TESTS)("", (expected) => {
    it(`should return true for ${expected} (isNot false)`, () => {
      expect(cordeExpect(expected).toBeWhiteSpace()).toEqual({ pass: true, message: "" });
    });

    it(`should return true for ${expected} (isNot true)`, () => {
      const report = cordeExpect(expected).not.toBeWhiteSpace();
      expect(report.pass).toBeFalsy();
      expect(report.message).toMatchSnapshot();
    });
  });

  describe.each(FAIL_TESTS)("", (expected) => {
    it(`should return true for ${expected} (isNot false)`, () => {
      const report = cordeExpect(expected).toBeWhiteSpace();
      expect(report.pass).toBeFalsy();
      expect(report.message).toMatchSnapshot();
    });

    it(`should return true for ${expected} (isNot true)`, () => {
      expect(cordeExpect(expected).not.toBeWhiteSpace()).toEqual({
        pass: true,
        message: "",
      });
    });
  });
});
