import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeDefined<T>(expected: T) {
  const pass = typeOf(expected) !== "undefined" && typeOf(expected) !== "null";
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to defined.\nreceived: '${typeOf(expected)}'`,
  };
}
