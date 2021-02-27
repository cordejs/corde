/**
 * Check if a string value is null or empty.
 * @param value String to check value.
 * @internal
 */
export function stringIsNullOrEmpty(value: string) {
  return !value || (typeof value === "string" && value.trim() === "");
}
