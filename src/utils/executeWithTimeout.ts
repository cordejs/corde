/**
 * Executes a function with a timeout.
 * If the function takes more time to run than what was provided in
 * `timeout`, then this functions is rejected.
 *
 * @param fn Function to be executed.
 * @param timeout Time that this function will wait.
 * @returns Result of the executed function (`fn`)
 * @internal
 */
export async function executeWithTimeout<TResult extends any>(
  fn: () => Promise<TResult> | TResult,
  timeout: number,
) {
  if (!fn) {
    throw new Error("can not execute an null function");
  }

  return new Promise<TResult>(async (resolve, reject) => {
    const nodeTimeout = setTimeout(() => {
      reject("timeout");
    }, timeout);

    const response = await fn();
    clearTimeout(nodeTimeout);
    resolve(response);
  });
}
