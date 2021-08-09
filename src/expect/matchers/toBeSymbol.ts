import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeSymbol<T>(expected: T) {
  const pass = typeof expected === "symbol";
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to be primitive.\nreceived: '${typeOf(expected)}'`,
  };
}
