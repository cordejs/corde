import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeNumber<T>(expected: T) {
  const pass = typeof expected === "number" || typeof expected === "bigint";
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to be a number.\nreceived: '${typeOf(expected)}'`,
  };
}
