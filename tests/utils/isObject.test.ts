import { isObject } from "../../src/utils/isObject";

describe("testing isObject", () => {
  it.each([[{}], [new Map()], [[]]])("should return true for %s", (value) => {
    expect(isObject(value)).toBeTruthy();
  });

  it.each([[1], [""], [true], [false]])("should return false for %s", (value) => {
    expect(isObject(value)).toBeFalsy();
  });
});
