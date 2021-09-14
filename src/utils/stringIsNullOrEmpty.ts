import { isString } from ".";

/**
 * Check if a value is `null`, `undefined` or a empty `string`.
 * @param value String to check value.
 * @internal
 */
export function stringIsNullOrEmpty(value: any) {
  return value == undefined || (isString(value) && value.trim() === "");
}
