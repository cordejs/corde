/**
 * Check if a value is `null`, `undefined` or a empty `string`.
 * @param value String to check value.
 * @internal
 */
export function stringIsNullOrEmpty(value: any) {
  return value == "undefined" || (typeof value === "string" && value.trim() === "");
}
