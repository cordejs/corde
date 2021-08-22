import { cordeExpect } from "../../../src/expect";

const fn1 = () => null;
const fn2 = fn1;

const array1 = [];
const array2 = array1;

const obj1 = {};
const obj2 = obj1;

const map1 = new Map();
map1.set(1, 123123);

const map2 = map1;

describe("testing toBe", () => {
  it.each([
    [1, 1],
    [fn1, fn2],
    [array1, array2],
    [obj1, obj2],
    [map1, map2],
    ["foo", "foo"],
    [false, false],
    [true, true],
    [null, null],
    [undefined, undefined],
    [1, cordeExpect.any()],
    [cordeExpect.any(), 1],
    [cordeExpect.any(Number), 1],
    [cordeExpect.any(), cordeExpect.any()],
    [cordeExpect.any(String), cordeExpect.any(String)],
  ])("should return true to %s and %s", (value, value2) => {
    expect(cordeExpect(value).toBe(value2)).toEqual({ pass: true, message: "" });
  });

  it.each([
    ["", 1],
    [{}, {}],
    [{ k: 1 }, {}],
    [{}, { k: 1 }],
    [{ k: 1 }, { k: 1 }],
    [[], []],
    [Symbol.for("aaa"), Symbol.for("a")],
    [[1], []],
    [() => null, () => null],
    [
      (val1: number, val2: number) => {
        return val1 + val2;
      },
      (val1: number, val2: number) => {
        return val1 + val2;
      },
    ],
    [[1], [1]],
    [new Map(), new Map()],
    [new Map(), map1],
    [1, false],
    ["'aaa'", ""],
    [null, undefined],
    [cordeExpect.any(String), cordeExpect.any(Number)],
  ])("should return false for %s and %s", (value, value2) => {
    const report = cordeExpect(value).toBe(value2 as any);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });
});
