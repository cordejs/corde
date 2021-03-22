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
  const obj1Ajusted = this.getSnapshotSeForInstanciaMobx(obj1);
  const obj2Ajusted = this.getSnapshotSeForInstanciaMobx(obj2);

  if (isNullOrUndefined(obj1Ajusted) && isNullOrUndefined(obj2Ajusted)) {
    return true;
  }

  if (
    (isNullOrUndefined(obj1Ajusted) && !isNullOrUndefined(obj2Ajusted)) ||
    (isNullOrUndefined(obj2Ajusted) && !isNullOrUndefined(obj1Ajusted))
  ) {
    return false;
  }
  if (typeOf(obj1Ajusted) !== "object" && typeof obj2Ajusted !== "object") {
    return obj1Ajusted === obj2Ajusted;
  }

  const obj1Properties = Object.getOwnPropertyNames(obj1Ajusted);
  const obj2Properties = Object.getOwnPropertyNames(obj2Ajusted);

  if (obj1Properties.length !== obj2Properties.length) {
    return false;
  }

  for (const prop of obj1Properties) {
    if (typeof obj1[prop] === "object") {
      const newSubObj1 = obj1Ajusted[prop];
      const newSubObj2 = obj2Ajusted[prop];

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
