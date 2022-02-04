import { isPartialOf } from "../../src/utils/isPartialOf";

describe("testing isPartialOf", () => {
  it("should return true to equal objects", () => {
    expect(isPartialOf({ a: 1 }, { a: 1 })).toBeTruthy();
  });

  it("should return true to objects with same properties", () => {
    expect(isPartialOf({ a: 1 }, { a: 1, b: 212 })).toBeTruthy();
  });

  it("should return false due to not match objects", () => {
    expect(isPartialOf({ c: 1 }, { a: 1, b: 212 })).toBeFalsy();
  });

  it("should return true due to properties equals", () => {
    expect(isPartialOf({ abc: { abc1: 1 } }, { a: 1, b: 212, abc: { abc1: 1 } })).toBeTruthy();
  });

  it("objects with array also should match with empty array", () => {
    expect(isPartialOf({ abc: [] }, { abc: [] })).toBeTruthy();
  });

  it("objects with array also should match with filed array", () => {
    expect(isPartialOf({ abc: [1, 2, 3] }, { abc: [1, 2, 3] })).toBeTruthy();
  });

  it("should match having null properties", () => {
    expect(isPartialOf({ abc: [1, 2, 3] }, { abc: [1, 2, 3], a: null })).toBeTruthy();
  });

  it("null values should match", () => {
    // @ts-ignore
    expect(isPartialOf(null, null)).toBeTruthy();
  });

  it("undefined values should match", () => {
    // @ts-ignore
    expect(isPartialOf(undefined, undefined)).toBeTruthy();
  });

  it("null and object values should return false", () => {
    // @ts-ignore
    expect(isPartialOf({ abc: 1 }, undefined)).toBeFalsy();
  });

  it("null and object values should return false", () => {
    // @ts-ignore
    expect(isPartialOf(undefined, { abc: 1 })).toBeFalsy();
  });

  it("objects with same properties name but different values should fail", () => {
    expect(isPartialOf({ abc: 1 }, { abc: 2 })).toBeFalsy();
  });

  it("empty objects should pass", () => {
    expect(isPartialOf({}, {})).toBeTruthy();
  });

  it("functions should return true", () => {
    expect(
      isPartialOf(
        () => 1,
        () => 1,
      ),
    ).toBeTruthy();
  });
});
