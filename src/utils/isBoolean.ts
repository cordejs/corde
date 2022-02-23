/**
 * Checks if a `value` if of type **boolean**.
 *
 * Do not assert if `value` is instance of Boolean:
 *
 * ```javascript
 * isBoolean(new Boolean(false)) // false
 * isBoolean(false) // true
 * ```
 *
 * @param value Value to check its type
 * @returns value as boolean if it is.
 * @internal
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === "boolean";
}
