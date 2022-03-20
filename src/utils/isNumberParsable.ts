/**
 * Check if a value can be converted to number
 * @param value Value to check if can be a number
 * @returns True if the number can be parse to number
 * @internal
 */
export function isNumberParsable(value: any): boolean {
  return !isNaN(+value);
}
