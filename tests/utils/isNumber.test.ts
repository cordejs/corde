import { isNumber } from "../../src/utils/isNumber";

describe("testing isNumber", () => {
  it.each([[1], [0], [-1], [NaN]])("should return true for %s", (value) => {
    expect(isNumber(value)).toBeTruthy();
  });

  it.each([[""], [[]], [false], [true], [Symbol.for("")], [new Map()], [{}]])(
    "should return false for %s",
    (value) => {
      expect(isNumber(value)).toBeFalsy();
    },
  );
});
