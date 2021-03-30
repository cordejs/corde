import { Errors } from "./defaults";

/**
 * Related timeout error.
 */
export class TimeoutError extends Error {
  readonly data: any;
  /**
   * Throws when a connection or test do not executed in the specified time.
   * @param message Custom message to this error
   */
  constructor(message = Errors.TIMEOUT_ERROR_MESSAGE, data?: any) {
    super(message);
    this.name = Errors.TIMEOUT_ERROR;
    this.data = data;
  }
}
