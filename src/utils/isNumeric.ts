import { isBigint } from "./isBigint";
import { isNumber } from "./isNumber";

/**
 * Checks if `value` is a numeric value (number or bigint)
 *
 * @param value Value to checks it's type
 * @returns false if is not a number or a bigint value. True if it is.
 * @internal
 */
export function isNumeric(value: any) {
  return isNumber(value) || isBigint(value);
}
