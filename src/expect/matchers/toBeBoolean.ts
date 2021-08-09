import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeBoolean<T>(expected: T) {
  const pass = typeof expected === "boolean";
  return {
    pass,
    message: pass
      ? ""
      : `expected: ${expected} to be a boolean value.\nreceived: '${typeOf(expected)}'`,
  };
}
