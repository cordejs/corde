/**
 * Like `typeof` but returns **null** if the value is **null**.
 *
 * @example
 *
 * typeof null // "object"
 * typeOf(null) // "null"
 *
 * @param value Object to get it's type
 * @returns the type in string.
 * @internal
 */
export function typeOf(value: any) {
  if (value === null) {
    return "null";
  }
  return typeof value;
}
