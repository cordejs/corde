import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeBigInt<T>(expected: T) {
  const pass = typeof expected === "bigint";
  return {
    pass,
    message: pass
      ? ""
      : `expected: ${expected} to be a bigint value.\nreceived: '${typeOf(expected)}'`,
  };
}
