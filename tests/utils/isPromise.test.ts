import { isPromise } from "../../src/utils/isPromise";

describe("testing isPromise function", () => {
  test("null should be false", () => {
    expect(isPromise(null)).toBeFalsy();
  });
  test("undefined should be false", () => {
    expect(isPromise(undefined)).toBeFalsy();
  });

  test("0 should be false", () => {
    expect(isPromise(0)).toBeFalsy();
  });

  test("-42 should be false", () => {
    expect(isPromise(-42)).toBeFalsy();
  });

  test("empty string should be false", () => {
    expect(isPromise("")).toBeFalsy();
  });

  test("string 'then' should be false", () => {
    expect(isPromise("then")).toBeFalsy();
  });

  test("boolean 'true' should be false", () => {
    expect(isPromise(true)).toBeFalsy();
  });

  test("boolean 'false' should be false", () => {
    expect(isPromise(false)).toBeFalsy();
  });

  test("empty object should be false", () => {
    expect(isPromise({})).toBeFalsy();
  });

  test("object with then property should be false", () => {
    expect(isPromise({ then: true })).toBeFalsy();
  });

  test("empty array should be false", () => {
    expect(isPromise([])).toBeFalsy();
  });

  test("array with value should be false", () => {
    expect(isPromise([true])).toBeFalsy();
  });

  test("sync function should be false", () => {
    expect(isPromise(() => 1)).toBeFalsy();
  });

  test("sync function should be false", () => {
    expect(isPromise(() => 1)).toBeFalsy();
  });

  test("promise resolve should be true", () => {
    expect(isPromise(Promise.resolve())).toBeTruthy();
  });

  test("promise resolve should be true", () => {
    function asyncTest() {
      return new Promise<void>((resolve) => {
        resolve();
      });
    }
    expect(isPromise(asyncTest())).toBeTruthy();
  });
});
