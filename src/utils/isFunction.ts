/**
 * Returns true if the object is a function.
 *
 * @param fn The value to check.
 * @returns A definition that the value is or not a function.
 */
export function isFunction<T>(fn: any): fn is (...args: any[]) => T {
  return typeof fn === "function";
}
