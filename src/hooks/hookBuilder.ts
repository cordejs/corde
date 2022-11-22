import runtime from "../core/runtime";
import { VoidLikeFunction } from "../types";
import { executePromiseWithTimeout } from "../utils/executePromiseWithTimeout";
import { formatObject } from "../utils/formatObject";

interface HookParams {
  hookHandler: (fn: VoidLikeFunction) => void;
  fn: () => void | Promise<void>;
  trace: string;
  errorTitle: string;
  timeout?: number;
}

/**
 * Add a function to a informed hook
 *
 * @internal
 */
export function hookBuilder(params: HookParams) {
  const { hookHandler, fn, trace, errorTitle, timeout } = params;
  hookHandler(async () => {
    try {
      await executePromiseWithTimeout<void>(async (resolve, reject) => {
        try {
          await fn();
          resolve();
        } catch (error) {
          reject(error);
        }
      }, timeout ?? runtime.configs.getConfigTimeoutOrDefault());
    } catch (error) {
      let newError: Error;
      const errorLabel = `● ${errorTitle}`;
      if (error instanceof Error && error.message) {
        newError = new Error(`${errorLabel}: ${error.message}`);
      } else {
        newError = new Error(`${errorLabel}: ${formatObject(error)}`);
      }

      newError.stack = trace;
      throw newError;
    }
  });
}
