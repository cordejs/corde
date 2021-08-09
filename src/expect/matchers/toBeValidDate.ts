import { isNumber } from "../../utils";

/**
 * @internal
 */
export function toBeDate<T>(expected: T) {
  const pass = expected instanceof Date && isNumber(expected.getTime());
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to be a valid date object.`,
  };
}
