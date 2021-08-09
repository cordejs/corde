import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeFunction<T>(expected: T) {
  const pass = typeof expected === "function";
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to be a function.\nreceived: '${typeOf(expected)}'`,
  };
}
