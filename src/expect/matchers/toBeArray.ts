import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeBoolean<T>(expected: T) {
  const pass = Array.isArray(expected);
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to be an array.\nreceived: '${typeOf(expected)}'`,
  };
}
