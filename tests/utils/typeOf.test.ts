import { typeOf } from "../../src/utils";

describe("testing typeOf", () => {
  it("should get number", () => {
    expect(typeOf(1)).toEqual("number");
  });

  it("should get a symbol", () => {
    expect(typeOf(Symbol("1"))).toEqual("symbol");
  });

  it("should get string", () => {
    expect(typeOf("")).toEqual("string");
  });

  it("should get boolean (true)", () => {
    expect(typeOf(true)).toEqual("boolean");
  });

  it("should get boolean (false)", () => {
    expect(typeOf(false)).toEqual("boolean");
  });

  it("should get undefined", () => {
    expect(typeOf(undefined)).toEqual("undefined");
  });

  it("should get null", () => {
    expect(typeOf(null)).toEqual("null");
  });

  it("should get object", () => {
    expect(typeOf({})).toEqual("object");
  });

  it("should get function", () => {
    expect(typeOf(function () {})).toEqual("function");
  });

  it("should return array", () => {
    expect(typeOf([])).toEqual("array");
  });
});
