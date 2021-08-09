import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeBigInt<T>(expected: T) {
  const pass = Array.isArray(expected) && expected.length === 0;
  return {
    pass,
    message: pass
      ? ""
      : `expected: ${expected} to be a bigint value.\nreceived: '${typeOf(expected)}'`,
  };
}
