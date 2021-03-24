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
 * @returns Returns if both objects have the same values. Returns true in case of both
 * parameters be **undefined** or **null**.
 *
 * Treat **null** and **undefined** of the same way, Wich means, if a parameter be null and the other
 * undefined, this function will return true.
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
  if (typeOf(obj1) !== "object" && typeof obj2 !== "object") {
    return obj1 === obj2;
  }

  const obj1Properties = Object.getOwnPropertyNames(obj1);
  const obj2Properties = Object.getOwnPropertyNames(obj2);

  if (obj1Properties.length !== obj2Properties.length) {
    return false;
  }

  for (const prop of obj1Properties) {
    if (typeof obj1[prop] === "object") {
      const newSubObj1 = obj1[prop];
      const newSubObj2 = obj2[prop];

      const areEqual = deepEqual(newSubObj1, newSubObj2);

      if (!areEqual) {
        return false;
      }
    } else if (obj1[prop] !== obj2[prop]) {
      return false;
    }
  }

  return true;
}
