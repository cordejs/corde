/**
 * Checks if a value is a promise.
 * @param obj Object to check.
 * @internal
 */
export function isPromise<T, S>(obj: PromiseLike<T> | S): obj is PromiseLike<T> {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof (obj as any).then === "function"
  );
}
