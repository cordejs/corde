/**
 * Checks if a `value` if of type **bigint**.
 *
 * @param value Value to check its type
 * @returns value as bigint if it is.
 * @internal
 */
export function isBigint(value: any): value is bigint {
  return typeof value === "bigint";
}
