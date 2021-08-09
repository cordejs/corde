import { isNumber } from "lodash";

/**
 * @internal
 */
export function toBeLessThanOrEqualThan<T extends any>(expected: T, received: number | bigint) {
  if (isNumber(expected)) {
    return {
      pass: false,
      message: "toBeLessThan: expected value is not a number",
    };
  }

  if (isNumber(received)) {
    return {
      pass: false,
      message: "toBeLessThan: received value is not a number",
    };
  }

  const pass = expected <= received;

  return {
    pass,
    message: pass ? "" : `expected: ${expected} be less than ${received}.`,
  };
}
