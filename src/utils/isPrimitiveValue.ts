import { isBigint } from "./isBigint";
import { isBoolean } from "./isBoolean";
import { isNumber } from "./isNumber";
import { isString } from "./isString";

/**
 * Check if a value is a primitive type.
 * @param value Value to assert type.
 * @internal
 */
export function isPrimitiveValue(value: unknown): value is string | number | bigint | boolean {
  return isNumber(value) || isString(value) || isBoolean(value) || isBigint(value);
}
