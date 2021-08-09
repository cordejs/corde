import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeNull<T>(expected: T) {
  const pass = expected === null;
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to be null.\nreceived: '${typeOf(expected)}'`,
  };
}
