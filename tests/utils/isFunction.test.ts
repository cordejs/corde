import { isFunction } from "../../src/utils";

describe("testing isFunction function", () => {
  test("should return true for a function", () => {
    expect(isFunction(() => {})).toBeTruthy();
  });

  test("should return false for a non function", () => {
    expect(isFunction(1)).toBeFalsy();
  });

  test("should return true for a promise", () => {
    expect(async () => Promise.resolve(1)).toBeTruthy();
  });
});
