import { isBigint } from "../../src/utils";

describe("testing isBigint", () => {
  it.each([[9007199254740991n]])("should return true for %s", (value) => {
    expect(isBigint(value)).toBeTruthy();
  });

  it.each([[1], [NaN]])("should return false for %s", (value) => {
    expect(isBigint(value)).toBeFalsy();
  });
});
