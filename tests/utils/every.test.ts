import { every, isNumber, isString } from "../../src/utils";

describe("testing every function", () => {
  it("should return true", () => {
    expect(every([1, 2], isNumber)).toBeTruthy();
  });

  it("should return true", () => {
    expect(every([1, 2], isString)).toBeFalsy();
  });
});
