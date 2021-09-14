import { isObject } from ".";
import { isAsymetricMatcher } from "./isAsymetricMatcher";
import { isNullOrUndefined } from "./isNullOrUndefined";

class AssertionResult extends Error {
  result: boolean;

  constructor(result: boolean) {
    super();
    this.result = result;
  }
}

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
  try {
    asserMatchersForObjects(obj1, obj2);
    return true;
  } catch (error) {
    if (error instanceof AssertionResult) {
      return error.result;
    }
    throw error;
  }
}

function asserMatchersForObjects(obj1: any, obj2: any) {
  assertNullAndUndefined(obj1, obj2);
  assertAssymetrics(obj1, obj2);
  assertNonObject(obj1, obj2);
  assertArray(obj1, obj2);
  assertDeepObjProperties(obj1, obj2);
}

function assertDeepObjProperties(obj1: any, obj2: any) {
  const obj1Properties = getPropsOf(obj1);
  const obj2Properties = getPropsOf(obj2);

  if (obj1Properties.length !== obj2Properties.length) {
    throw new AssertionResult(false);
  }

  for (const keyName of obj1Properties) {
    if (isObject(obj1[keyName]) || isObject(obj2[keyName])) {
      const newSubObj1 = obj1[keyName];
      const newSubObj2 = obj2[keyName];

      const areEqual = deepEqual(newSubObj1, newSubObj2);

      if (!areEqual) {
        throw new AssertionResult(false);
      }
    } else if (obj1[keyName] !== obj2[keyName]) {
      throw new AssertionResult(false);
    }
  }
}

function getPropsOf(obj: any) {
  return Object.getOwnPropertyNames(obj);
}

function assertArray(obj1: any, obj2: any) {
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      throw new AssertionResult(false);
    }

    for (let i = 0; i < obj1.length; i++) {
      const areEqual = deepEqual(obj1[i], obj2[i]);
      if (!areEqual) {
        throw new AssertionResult(false);
      }
    }
    throw new AssertionResult(true);
  }
}

function assertNonObject(obj1: any, obj2: any) {
  if (!isObject(obj1) && !isObject(obj2)) {
    throw new AssertionResult(obj1 === obj2);
  }
}

function assertNullAndUndefined(obj1: any, obj2: any) {
  if (isNullOrUndefined(obj1) && isNullOrUndefined(obj2)) {
    throw new AssertionResult(true);
  }

  if (
    (isNullOrUndefined(obj1) && !isNullOrUndefined(obj2)) ||
    (isNullOrUndefined(obj2) && !isNullOrUndefined(obj1))
  ) {
    throw new AssertionResult(false);
  }
}

function assertAssymetrics(obj1: any, obj2: any) {
  if (isAsymetricMatcher(obj1) && isAsymetricMatcher(obj2)) {
    throw new AssertionResult(obj1.matchType(...obj2.getTypes()));
  }

  if (isAsymetricMatcher(obj1)) {
    throw new AssertionResult(obj1.matchValue(obj2));
  }

  if (isAsymetricMatcher(obj2)) {
    throw new AssertionResult(obj2.matchValue(obj1));
  }
}
