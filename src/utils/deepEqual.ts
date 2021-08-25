import { isAsymetricMatcher } from "./isAsymetricMatcher";
import { isNullOrUndefined } from "./isNullOrUndefined";
import { typeOf } from "./typeOf";

/**
 * Checks if two objects are equals by no strict way.
 * Wich means, do not validate if both objects are equals by reference, only by values.
 *
 * Similar with [assert.deepEqual(actual, expected[, message])](https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message)
 * @param obj1 First object to be verified.
 * @param obj2 Second object to be verified
 *
 *
 * @returns Returns if both objects have the same values. Returns true in case of both
 * parameters be **undefined** or **null**.
 *
 * Treat **null** and **undefined** of the same way, Wich means, if a parameter be null and the other
 * undefined, this function will return true.
 *
 * @example
 *
 * deepEqual([1], [2]) // True
 * deepEqual({a: 2, b: 3}, {a: 2, b: 3}) // True
 *
 * deepEqual({a: 2, b: 3}, {a: 2, b: 4}) // False
 *
 * @internal
 *
 */
export function deepEqual(obj1: any, obj2: any) {
  if (isNullOrUndefined(obj1) && isNullOrUndefined(obj2)) {
    return true;
  }

  if (
    (isNullOrUndefined(obj1) && !isNullOrUndefined(obj2)) ||
    (isNullOrUndefined(obj2) && !isNullOrUndefined(obj1))
  ) {
    return false;
  }

  if (isAsymetricMatcher(obj1) && isAsymetricMatcher(obj2)) {
    return obj1.matchType(...obj2.getTypes());
  }

  if (isAsymetricMatcher(obj1)) {
    return obj1.matchValue(obj2);
  }

  if (isAsymetricMatcher(obj2)) {
    return obj2.matchValue(obj1);
  }

  if (typeof obj1 !== "object" && typeof obj2 !== "object") {
    return obj1 === obj2;
  }

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    for (let i = 0; i < obj1.length; i++) {
      const areEqual = deepEqual(obj1[i], obj2[i]);
      if (!areEqual) {
        return false;
      }
    }
    return true;
  }

  const obj1Properties = Object.getOwnPropertyNames(obj1);
  const obj2Properties = Object.getOwnPropertyNames(obj2);

  if (obj1Properties.length !== obj2Properties.length) {
    return false;
  }

  for (const keyName of obj1Properties) {
    if (typeOf(obj1[keyName]) === "object" || typeOf(obj2[keyName]) === "object") {
      const newSubObj1 = obj1[keyName];
      const newSubObj2 = obj2[keyName];

      const areEqual = deepEqual(newSubObj1, newSubObj2);

      if (!areEqual) {
        return false;
      }
    } else if (obj1[keyName] !== obj2[keyName]) {
      return false;
    }
  }

  return true;
}
