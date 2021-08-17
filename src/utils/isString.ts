/**
 * Checks if a value is a string
 * @param value Data to be asserted as string
 * @internal
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}
