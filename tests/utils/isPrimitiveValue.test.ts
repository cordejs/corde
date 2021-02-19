import { isPrimitiveValue } from "../../src/utils";

describe("testing isPrimitiveValue function", () => {
  it("number should be primitive", () => {
    expect(isPrimitiveValue(1)).toBeTruthy();
  });

  it("string should be primitive", () => {
    expect(isPrimitiveValue("")).toBeTruthy();
  });

  it("bool should be primitive", () => {
    expect(isPrimitiveValue(true)).toBeTruthy();
  });

  it("null should not be primitive", () => {
    expect(isPrimitiveValue(null)).toBeFalsy();
  });

  it("undefined should not be primitive", () => {
    expect(isPrimitiveValue(undefined)).toBeFalsy();
  });

  it("object should not be primitive", () => {
    expect(isPrimitiveValue({})).toBeFalsy();
  });

  it("class instance should not be primitive", () => {
    interface A {}
    let a: string | number | A;
    a = "";
    expect(isPrimitiveValue(a)).toBeTruthy();
  });
});
