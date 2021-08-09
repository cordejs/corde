import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeString<T>(expected: T) {
  const pass = typeof expected === "string";
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to be a string.\nreceived: '${typeOf(expected)}'`,
  };
}
