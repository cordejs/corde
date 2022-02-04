import { isValidNumber } from "../../src/utils/isValidNumber";

describe("testing isValidNumber", () => {
  it.each([[1], [0], [-1], [9007199254740991n]])("should return true for %s", (value) => {
    expect(isValidNumber(value)).toBeTruthy();
  });

  it.each([[""], [[]], [false], [true], [Symbol.for("")], [new Map()], [{}], [NaN]])(
    "should return false for %s",
    (value) => {
      expect(isValidNumber(value)).toBeFalsy();
    },
  );
});
