import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeBoolean<T>(expected: T) {
  const pass = isNaN(expected as any);
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to be NaN value.\nreceived: '${typeOf(expected)}'`,
  };
}
