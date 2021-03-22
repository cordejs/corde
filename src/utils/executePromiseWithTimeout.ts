import { TimeoutError } from "../errors";
import { RejectFunction, ResolveFunction } from "../types";

/**
 * Execute a function that returns a promise, passing a `resolve` and
 * `reject` functions to it.
 *
 * Works like the `new Promise` constructor, but encapsulates it with a timeout.
 *
 * @example
 *
 * function example(shouldPass: boolean) {
 *   const items: string[] = [];
 *   items.push("item 1");
 *   return executePromiseWithTimeout<string[]>((resolve, reject) => {
 *      if(shouldPass) {
 *         items.push("item 2");
 *         resolve(items);
 *      } else {
 *         reject();
 *      }
 *   }, 1000, items);
 * }
 *
 * // If the functions reachs the timeout, it will throw the
 * // exception TimeoutError with the items array as data property
 *
 * @throws TimeoutError if the function reachs timeout. This error has a property
 * data that is passed throw the `rejectedData` parameter
 *
 * @param fn function to be executed.
 * @param timeout Time to wait for completion of the function.
 * @param rejectedData Data that should be added in rejection if the function reachs timeout.
 * @returns Return of `fn` parameter.
 * @internal
 */
export function executePromiseWithTimeout<TResult extends any>(
  fn: (resolve: ResolveFunction<TResult>, reject: RejectFunction) => void,
  timeout: number,
  rejectedData?: TResult,
) {
  if (!fn) {
    throw new Error("can not execute an null function");
  }

  return new Promise<TResult>(async (resolve, reject) => {
    const nodeTimeout = setTimeout(() => {
      if (rejectedData) {
        reject(new TimeoutError("timeout", rejectedData));
      } else {
        reject(new TimeoutError("timeout"));
      }
    }, timeout);

    fn((value) => {
      clearTimeout(nodeTimeout);
      resolve(value);
    }, reject);
  });
}
