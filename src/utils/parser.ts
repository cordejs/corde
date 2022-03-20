import { isNumber } from "./isNumber";

/**
 * Collection of functions to parse a value to a specific type
 * @internal
 */
export namespace parser {
  /**
   * Converts a value to `number`. If the value can not
   * be converted, an error is thrown.
   *
   * @param value Value to be converted to number
   * @throws Error if the value is not a number.
   *
   * @returns Numeric type of `value`
   */
  export function toNumber(value: any) {
    const temp = +value;
    if (isNumber(temp)) {
      return temp;
    }
    throw new Error(`Can not parse value: ${value} to number`);
  }

  /**
   * Attempts to convert a value to number.
   * If the value can not be converted, `0` is returned.
   *
   * @param value Value to be converted to number
   * @returns Numeric type of `value` or `0`.
   */
  export function tryToNumber(value: any) {
    const temp = +value;
    if (isNumber(temp)) {
      return temp;
    }
    return 0;
  }
}
