import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeUndefined<T>(expected: T) {
  const pass = expected === undefined;
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to be undefined.\nreceived: '${typeOf(expected)}'`,
  };
}
