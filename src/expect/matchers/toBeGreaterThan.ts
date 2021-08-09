import { isNumber } from "lodash";

/**
 * @internal
 */
export function toBeGreaterThan<T extends any>(expected: T, received: number | bigint) {
  if (isNumber(expected)) {
    return {
      pass: false,
      message: "toBeGreaterThan: expected value is not a number",
    };
  }

  if (isNumber(received)) {
    return {
      pass: false,
      message: "toBeGreaterThan: received value is not a number",
    };
  }

  const pass = expected > received;

  return {
    pass,
    message: pass ? "" : `expected: ${expected} be greater than ${received}.`,
  };
}
