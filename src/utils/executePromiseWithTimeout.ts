type ResolveFunction<TResult> = (value: TResult) => void;
type RejectFunction = (reason?: any) => void;

/**
 * Execute a function that returns a promise, passing a `resolve` and
 * `reject` functions to it.
 *
 * Works like the `new Promise` constructor, but encapsulates it with a timeout.
 *
 * @example
 *
 * function example(shouldPass: boolean) {
 *   return executePromiseWithTimeout((resolve, reject) => {
 *      if(shouldPass) {
 *         resolve();
 *      } else {
 *         reject();
 *      }
 *   }, 1000);
 * }
 *
 * @param fn function to be executed.
 * @param timeout Time to wait for completion of the function.
 * @returns Return of `fn` parameter.
 */
export function executePromiseWithTimeout<TResult extends any>(
  fn: (resolve: ResolveFunction<TResult>, reject: RejectFunction) => void,
  timeout: number,
) {
  if (!fn) {
    throw new Error("can not execute an null function");
  }

  return new Promise<TResult>(async (resolve, reject) => {
    const nodeTimeout = setTimeout(() => {
      reject("timeout");
    }, timeout);

    fn((value) => {
      clearTimeout(nodeTimeout);
      resolve(value);
    }, reject);
  });
}
