import { cordeExpect } from "../../../src/expect";

describe("testing toEqual", () => {
  it.each([
    [{}, {}],
    [{ a: 1 }, { a: cordeExpect.any(Number) }],
    [{ a: cordeExpect.any(Number) }, { a: 1 }],
    [{ a: 1 }, { a: cordeExpect.any() }],
    [{ a: cordeExpect.any() }, { a: 1 }],
    [[], []],
    [
      [1, 2, 3],
      [1, 2, 3],
    ],
    [
      [1, cordeExpect.any(), 3],
      [1, 2, 3],
    ],
    [[1], [1]],
    [1, 1],
    ["", ""],
    [false, false],
    [true, true],
    [new Map(), new Map()],
    [undefined, undefined],
    [null, null],
  ])("should return true for equal objects", (value1, value2) => {
    expect(cordeExpect(value1).toEqual(value2)).toEqual({ pass: true, message: "" });
  });

  it.each([
    [1, 2],
    [{}, { a: 1 }],
    [{ a: 1 }, {}],
    [{}, { a: cordeExpect.any() }],
    [[], [1]],
    [[1], []],
    [[], [1, cordeExpect.any()]],
    [false, true],
  ])("should return false for %s and %s", (value1, value2) => {
    const report = cordeExpect(value1).toEqual(value2);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });
});
