import { deepEqual } from "../../src/utils/deepEqual";
import { cordeExpect } from "../../src/expect";

describe("deepEqual", () => {
  describe("to return true", () => {
    it.each([
      [1, 1],
      [cordeExpect.any(), cordeExpect.any()],
      [1, cordeExpect.any()],
      [cordeExpect.any(), 1],
      [cordeExpect.any(Number), 1],
      [{ a: 1 }, { a: cordeExpect.any() }],
      [{ a: 1 }, { a: cordeExpect.any(Number) }],
      [
        [1, cordeExpect.any(Number), 3],
        [1, 2, 3],
      ],
      [null, null],
      [undefined, undefined],
      ["opa", "opa"],
      [undefined, null],
      [true, true],
      [{}, {}],
      [[], []],
      [[{}], [{}]],
      [[{ id: 1 }], [{ id: 1 }]],
      [{ id: 1 }, { id: 1 }],
      [
        { id: 1, sub: { id: 2 } },
        { id: 1, sub: { id: 2 } },
      ],
      [[{ id: 1, sub: { id: 2 } }], [{ id: 1, sub: { id: 2 } }]],
    ])("should return true for %s and %s", (value1, value2) => {
      expect(deepEqual(value1, value2)).toBeTruthy();
    });
  });

  describe("tests to return false", () => {
    it.each([
      [2, 1],
      [undefined, 1],
      ["opa1", "opa"],
      [false, true],
      [{ a: 1 }, {}],
      [[1], []],
      [[{ id: 1 }], [{}]],
      [[{ id: 2 }], [{ id: 1 }]],
      [{ id: 2 }, { id: 1 }],
      [
        { id: 1, sub: { id: 3 } },
        { id: 1, sub: { id: 2 } },
      ],
      [[{ id: 1, sub: { id: 3 } }], [{ id: 1, sub: { id: 2 } }]],
      [[{ id: 1, sub: [{ id: 3 }, { id: 3 }] }], [{ id: 1, sub: [{ id: 3 }, { id: 4 }] }]],
    ])("should return false for %s and %s", (value1, value2) => {
      expect(deepEqual(value1, value2)).toBeFalsy();
    });
  });
});
