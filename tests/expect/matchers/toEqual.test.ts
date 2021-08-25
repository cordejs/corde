import { cordeExpect } from "../../../src/expect";

describe("testing toEqual", () => {
  it.each([
    // [{}, {}],
    // [{ a: 1 }, { a: cordeExpect.any(Number) }],
    // [{ a: cordeExpect.any(Number) }, { a: 1 }],
    // [{ a: 1 }, { a: cordeExpect.any() }],
    // [{ a: cordeExpect.any() }, { a: 1 }],
    // [[], []],
    // [
    //   [1, 2, 3],
    //   [1, 2, 3],
    // ],
    [[1], [1]],
    // [1, 1],
    // ["", ""],
    // [false, false],
    // [true, true],
    // [new Map(), new Map()],
    // [undefined, undefined],
    // [null, null],
  ])("should return true for equal objects", (value1, value2) => {
    expect(cordeExpect(value1).toEqual(value2)).toEqual({ pass: true, message: "" });
  });
});
