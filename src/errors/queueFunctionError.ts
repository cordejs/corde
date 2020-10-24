import { Errors } from "./defaults";

/**
 * Related timeout error.
 */
export class QueueFunctionError extends Error {
  /**
   * Throws when a function in **Queue** is executed with an error.
   *
   * @param message Custom message to this error
   */
  constructor(message = Errors.QUEUE_FUNCTION_ERROR_MESSAGE) {
    super(message);
    this.name = Errors.QUEUE_FUNCTION_ERROR;
  }
}
