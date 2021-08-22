import { deepEqual } from "../../src/utils";

describe("testing deepEqual", () => {
  describe("tests to return true", () => {
    it("should return true to equal numbers", () => {
      expect(deepEqual(1, 1)).toBeTruthy();
    });

    it("should return true for null", () => {
      expect(deepEqual(null, null)).toBeTruthy();
    });

    it.each([
      [{ a: 1 }, { a: 1 }],
      [null, null],
      [undefined, undefined],
    ])(
      "should return false for equal values but with comparable returning false (%s, %s)",
      (value1, value2) => {
        expect(deepEqual(value1, value2, () => false)).toBeFalsy();
      },
    );

    it.each([
      [
        { a: 2, b: 3 },
        { a: 1, b: 2 },
      ],
      [null, undefined],
      [1, 2],
    ])(
      "should return true for different values but with comparable returning false (%s, %s)",
      (value1, value2) => {
        expect(deepEqual(value1, value2, () => true)).toBeTruthy();
      },
    );

    it("should return true for undefined", () => {
      expect(deepEqual(undefined, undefined)).toBeTruthy();
    });

    it("should return true for null and undefiend", () => {
      expect(deepEqual(undefined, null)).toBeTruthy();
    });

    it("should return true for equal strings", () => {
      expect(deepEqual("opa", "opa")).toBeTruthy();
    });

    it("should return true for true booleans", () => {
      expect(deepEqual(true, true)).toBeTruthy();
    });

    it("should return true for empty equal objects", () => {
      expect(deepEqual({}, {})).toBeTruthy();
    });

    it("should return true for empty arrays", () => {
      expect(deepEqual([], [])).toBeTruthy();
    });

    it("should return true to arrays of empty objects", () => {
      expect(deepEqual([{}], [{}])).toBeTruthy();
    });

    it("should return true to array of equal objects", () => {
      expect(deepEqual([{ id: 1 }], [{ id: 1 }])).toBeTruthy();
    });

    it("should return true to equal objects", () => {
      expect(deepEqual({ id: 1 }, { id: 1 })).toBeTruthy();
    });

    it("should return true to objects with equal subobjects", () => {
      expect(deepEqual({ id: 1, sub: { id: 2 } }, { id: 1, sub: { id: 2 } })).toBeTruthy();
    });

    it("should return true to object array with equal subobjects", () => {
      expect(deepEqual([{ id: 1, sub: { id: 2 } }], [{ id: 1, sub: { id: 2 } }])).toBeTruthy();
    });
  });

  describe("tests to return false", () => {
    it("should return false for different numbers", () => {
      expect(deepEqual(2, 1)).toBeFalsy();
    });

    it("should return false for undefined and number", () => {
      expect(deepEqual(undefined, 1)).toBeFalsy();
    });

    it("should return false for different strings", () => {
      expect(deepEqual("opa1", "opa")).toBeFalsy();
    });

    it("should return false for differents booleans", () => {
      expect(deepEqual(false, true)).toBeFalsy();
    });

    it("should return false for a object with properties and another empty", () => {
      expect(deepEqual({ a: 1 }, {})).toBeFalsy();
    });

    it("should return false for different arrays", () => {
      expect(deepEqual([1], [])).toBeFalsy();
    });

    it("should return false for arrays with different objects", () => {
      expect(deepEqual([{ id: 1 }], [{}])).toBeFalsy();
    });

    it("should return false to arrays with different objects", () => {
      expect(deepEqual([{ id: 2 }], [{ id: 1 }])).toBeFalsy();
    });

    it("should return false for different objects", () => {
      expect(deepEqual({ id: 2 }, { id: 1 })).toBeFalsy();
    });

    it("should return false for objects with subobjects differents", () => {
      expect(deepEqual({ id: 1, sub: { id: 3 } }, { id: 1, sub: { id: 2 } })).toBeFalsy();
    });

    it("should return false for arrays of objects with subobjects differentes", () => {
      expect(deepEqual([{ id: 1, sub: { id: 3 } }], [{ id: 1, sub: { id: 2 } }])).toBeFalsy();
    });

    it("should return false for array of objects with subobjects which are differents", () => {
      expect(
        deepEqual(
          [{ id: 1, sub: [{ id: 3 }, { id: 3 }] }],
          [{ id: 1, sub: [{ id: 3 }, { id: 4 }] }],
        ),
      ).toBeFalsy();
    });
  });
});
