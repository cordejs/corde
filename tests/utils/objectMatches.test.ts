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
});
