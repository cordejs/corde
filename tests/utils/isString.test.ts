import { isString } from "../../src/utils/isString";

describe("testing isString", () => {
  it("should return true for string", () => {
    expect(isString("")).toBeTruthy();
  });

  it("should return false for non string", () => {
    expect(isString(1)).toBeFalsy();
  });
});
