/**
 * Oposite to `isNaN`.
 *
 * Check if a value is a number.
 *
 * @param value Value to be checked.
 * @returns a boolean `true` is the value is a number or false if isn't
 */
export function isNumber(value: any): value is number {
  return typeof value === "number";
}
