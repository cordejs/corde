import { forEachProp } from "../../src/utils";

describe("testing forEachProp", () => {
  it("should iterate", () => {
    let i = 0;
    forEachProp({ prop: 1, prop2: 2 }, () => i++);
    expect(i).toEqual(2);
  });
});
