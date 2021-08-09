/**
 * @internal
 */
export function toBeEmptyString<T>(expected: T) {
  const pass = typeof expected === "string" && expected === "";
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to an empty string.\nreceived: '${expected}'`,
  };
}
