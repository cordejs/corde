/**
 * Checks if a `value` if of type **Object**.
 *
 * This function checks if the value is not **null**, which also of type **Object**.
 *
 * ```javascript
 * typeof {}  // Object
 * typeof null // Object
 * ```
 *
 * @param value Value to check it's type
 * @returns value as `Object` if it is an object.
 * @internal
 */
export function isObject(value: any): value is Object {
  return value !== null && typeof value === "object";
}
