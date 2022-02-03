import { isFunction } from "./isFunction";
import { isObject } from "./isObject";

/**
 * Checks if a value is a promise.
 * @param obj Object to check.
 * @internal
 */
export function isPromise<T, S>(obj: PromiseLike<T> | S): obj is PromiseLike<T> {
  return !!obj && (isObject(obj) || isFunction(obj)) && isFunction((obj as any).then);
}
