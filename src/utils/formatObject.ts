import prettyFormat from "pretty-format";

/**
 * Binder of pretty-format.
 *
 * @see https://github.com/facebook/jest/tree/master/packages/pretty-format
 * @param value Data to be formatted.
 *
 * @internal
 */
export function formatObject<T>(value: T): string {
  return prettyFormat(value);
}
