import { cordeExpect } from "../../../src/expect";

const validTests = [
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
];

const invalidTests = [
  [1, 2],
  [{}, { a: 1 }],
  [{ a: 1 }, {}],
  [{}, { a: cordeExpect.any() }],
  [[], [1]],
  [[1], []],
  [[], [1, cordeExpect.any()]],
  [false, true],
];

describe("testing toEqual", () => {
  // @ts-ignore
  it.each(validTests)("should return true for equal objects", (value1, value2) => {
    expect(cordeExpect(value1).toEqual(value2)).toEqual({ pass: true, message: "" });
  });

  // @ts-ignore
  it.each(validTests)("should return false for %s and %s (isNot true)", (value1, value2) => {
    const report = cordeExpect(value1).not.toEqual(value2);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(invalidTests)("should return true for %s and %s (isNot true)", (value1, value2) => {
    expect(cordeExpect(value1).not.toEqual(value2)).toEqual({ pass: true, message: "" });
  });
});
