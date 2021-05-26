import { objectMatches } from "../../src/utils";

describe("testing objectMatches", () => {
  it("should return true to equal objects", () => {
    expect(objectMatches({ a: 1 }, { a: 1 })).toBeTruthy();
  });

  it("should return true to objects with same properties", () => {
    expect(objectMatches({ a: 1 }, { a: 1, b: 212 })).toBeTruthy();
  });

  it("should return false due to not match objects", () => {
    expect(objectMatches({ c: 1 }, { a: 1, b: 212 })).toBeFalsy();
  });

  it("should return true due to subproperties equals", () => {
    expect(objectMatches({ abc: { abc1: 1 } }, { a: 1, b: 212, abc: { abc1: 1 } })).toBeTruthy();
  });

  it("objects with array also should match with empty array", () => {
    expect(objectMatches({ abc: [] }, { abc: [] })).toBeTruthy();
  });

  it("objects with array also should match with filed array", () => {
    expect(objectMatches({ abc: [1, 2, 3] }, { abc: [1, 2, 3] })).toBeTruthy();
  });

  it("should match having null properties", () => {
    expect(objectMatches({ abc: [1, 2, 3], a: null }, { abc: [1, 2, 3] })).toBeTruthy();
  });

  it("null values should match", () => {
    expect(objectMatches(null, null)).toBeTruthy();
  });

  it("undefined values should match", () => {
    expect(objectMatches(undefined, undefined)).toBeTruthy();
  });

  it("null and object values should return false", () => {
    expect(objectMatches({ abc: 1 }, undefined)).toBeFalsy();
  });

  it("null and object values should return false", () => {
    expect(objectMatches(undefined, { abc: 1 })).toBeFalsy();
  });

  it("objects with same properties name but different values should fail", () => {
    expect(objectMatches({ abc: 1 }, { abc: 2 })).toBeFalsy();
  });

  it("empty objects should pass", () => {
    expect(objectMatches({}, {})).toBeTruthy();
  });

  it("functions should return true", () => {
    expect(
      objectMatches(
        () => {},
        () => {},
      ),
    ).toBeTruthy();
  });
});
