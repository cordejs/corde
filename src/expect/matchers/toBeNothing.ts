import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeNothing<T>(expected: T) {
  const pass = expected === null || expected === undefined;
  return {
    pass,
    message: pass
      ? ""
      : `expected: ${expected} to be null or undefined.\nreceived: '${typeOf(expected)}'`,
  };
}
