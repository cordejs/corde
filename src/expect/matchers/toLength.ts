/**
 * @internal
 */
export function toLength<T>(expected: T, length: number | bigint) {
  if (Array.isArray(expected) || typeof expected === "string") {
    return {
      pass: false,
      message: "expected value is not a string or an array: ",
    };
  }

  const pass =
    Array.isArray(expected) || (typeof expected === "string" && expected.length === length);
  return {
    pass,
    message: pass ? "" : `expected length: ${length}.\n received: `,
  };
}
