import chalk from "chalk";
import { Queue } from "../data-structures";
import { VoidPromiseFunction } from "../types";
import { formatObject } from "../utils";

/**
 * Add a function to a informed hook
 * @internal
 */
export function hookBuilder(
  queueToAdd: Queue<VoidPromiseFunction>,
  fn: () => void | Promise<void>,
  trace: string,
  errorTitle: string,
) {
  queueToAdd.enqueue(async () => {
    try {
      await fn();
    } catch (error) {
      let newError: Error;
      const errorLabel = chalk.bgRed(`● ${errorTitle}`);
      if (error instanceof Error) {
        newError = new Error(`${errorLabel}: ${error.message}`);
      } else {
        newError = new Error(`${errorLabel}: ${formatObject(error)}`);
      }

      newError.stack = trace;
      throw newError;
    }
  });
}
