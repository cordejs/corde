import { isBoolean } from "../../src/utils/isBoolean";

describe("testing isBoolean", () => {
  it.each([[1], [""], [{}], [[]]])("should return false for %s", (value) => {
    expect(isBoolean(value)).toBeFalsy();
  });

  it.each([[false], [true]])("should return false for %s", (value) => {
    expect(isBoolean(value)).toBeTruthy();
  });
});
