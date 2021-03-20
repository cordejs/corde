import diffDefault from "jest-diff";

/**
 * Binder of `jest-diff`.
 *
 * @param obj1 First object to check.
 * @param obj2 Second object to check with `obj1`.
 * @see https://github.com/facebook/jest/tree/master/packages/jest-diff
 *
 * @example
 *
 * const a = ['delete', 'common', 'changed from'];
 * const b = ['common', 'changed to', 'insert'];
 *
 * const result = diff(a, b);
 *
 * // result outputs:
 *
 * - Expected
 * + Received
 *
 *   Array [
 * -   "delete",
 *     "common",
 * -   "changed from",
 * +   "changed to",
 * +   "insert",
 * ]
 *
 * @internal
 */
export function diff<T, U>(obj1: T, obj2: U): string | null {
  return diffDefault(obj1, obj2, {
    aAnnotation: "expect",
    bAnnotation: "received",
    includeChangeCounts: true,
  });
}
