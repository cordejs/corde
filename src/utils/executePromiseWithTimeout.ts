import { TimeoutError } from "../errors";
import { isInDebugMode } from "./isInDebugMode";

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
 * // If the functions reach's the timeout, it will throw the
 * // exception TimeoutError with the items array as data property
 *
 * @throws TimeoutError if the function reach's timeout. This error has a property
 * data that is passed throw the `rejectedData` parameter
 *
 * @param fn function to be executed.
 * @param timeout Time to wait for completion of the function.
 * @param rejectedData Data that should be added in rejection if the function reach's timeout.
 * @returns Return of `fn` parameter.
 * @internal
 */
export function executePromiseWithTimeout<TResult>(
  fn: (resolve: (reason?: TResult) => void, reject: (reason?: any) => void) => void,
  timeout?: number,
  rejectedData?: TResult,
) {
  if (!fn) {
    return Promise.reject("can not execute an null function");
  }

  if (isInDebugMode() || !timeout) {
    return new Promise<TResult>((resolve, reject) => {
      fn((value) => {
        resolve(value as TResult);
      }, reject);
    });
  }

  return new Promise<TResult>((resolve, reject) => {
    const nodeTimeout = setTimeout(() => {
      reject(new TimeoutError("timeout", rejectedData));
    }, timeout);

    fn((value) => {
      clearTimeout(nodeTimeout);
      resolve(value as TResult);
    }, reject);
  });
}
