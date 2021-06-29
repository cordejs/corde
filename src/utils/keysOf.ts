import { isPrimitiveValue } from "./isPrimitiveValue";

/**
 * Get all keys in the first level of an object.
 * @param obj Object to get it's keys
 * @returns Array containing all keys of the object
 */
export function keysOf<T extends any>(obj: T): (keyof T)[] {
  if (!obj || isPrimitiveValue(obj)) {
    return [];
  }
  const keys = Object.getOwnPropertyNames(obj);
  return keys as (keyof typeof obj)[];
}
