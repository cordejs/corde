import { every } from "../../src/utils/every";
import { isNumber } from "../../src/utils/isNumber";
import { isString } from "../../src/utils/isString";

describe("testing every function", () => {
  it("should return true", () => {
    expect(every([1, 2], isNumber)).toBeTruthy();
  });

  it("should return true", () => {
    expect(every([1, 2], isString)).toBeFalsy();
  });
});
