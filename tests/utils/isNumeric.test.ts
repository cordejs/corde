import { isNumeric } from "../../src/utils/isNumeric";

describe("testing isNumeric", () => {
  it.each([[1], [0], [-1], [NaN], [9007199254740991n]])("should return true for %s", (value) => {
    expect(isNumeric(value)).toBeTruthy();
  });

  it.each([[""], [[]], [false], [true], [Symbol.for("")], [new Map()], [{}]])(
    "should return false for %s",
    (value) => {
      expect(isNumeric(value)).toBeFalsy();
    },
  );
});
