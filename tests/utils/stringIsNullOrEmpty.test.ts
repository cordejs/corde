import { stringIsNullOrEmpty } from "../../src/utils/stringIsNullOrEmpty";

describe("testing stringIsNullOrEmpty function", () => {
  test("empty string should return true", () => {
    expect(stringIsNullOrEmpty("")).toBeTruthy();
  });

  test("null should return true", () => {
    expect(stringIsNullOrEmpty(null)).toBeTruthy();
  });

  test("undefined should return true", () => {
    expect(stringIsNullOrEmpty(undefined)).toBeTruthy();
  });

  test("not empty string should return false", () => {
    expect(stringIsNullOrEmpty("abc")).toBeFalsy();
  });

  test("number should return false", () => {
    // @ts-ignore
    expect(stringIsNullOrEmpty(1)).toBeFalsy();
  });

  test("object should return false", () => {
    // @ts-ignore
    expect(stringIsNullOrEmpty({})).toBeFalsy();
  });

  test("boolean should return false", () => {
    // @ts-ignore
    expect(stringIsNullOrEmpty(true)).toBeFalsy();
  });
});
