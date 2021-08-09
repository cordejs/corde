import { typeOf } from "../../utils";

/**
 * @internal
 */
export function toBeDate<T>(expected: T) {
  const pass = expected instanceof Date;
  return {
    pass,
    message: pass
      ? ""
      : `expected: ${expected} to be a Date object.\nreceived: '${typeOf(expected)}'`,
  };
}
