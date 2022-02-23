import { keysOf } from "../../src/utils/keysOf";

describe("testing keyOf function", () => {
  it("should get all keys of a object", () => {
    expect(keysOf({ a: 1, b: 2 })).toEqual(["a", "b"]);
  });

  it("should return empty if object is null", () => {
    expect(keysOf(null)).toEqual([]);
  });

  it("should return empty if object is number", () => {
    expect(keysOf(1)).toEqual([]);
  });

  it("should return empty if object is string", () => {
    expect(keysOf("aa")).toEqual([]);
  });

  it("should return empty if object is boolean", () => {
    expect(keysOf(true)).toEqual([]);
    expect(keysOf(false)).toEqual([]);
  });
});
