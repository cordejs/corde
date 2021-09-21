import { InternalError } from ".";
import { Errors } from "./defaults";

/**
 * Related to a file operation error.
 */
export class FileError extends InternalError {
  /**
   * Throws when a operation involving files occours.
   * @param message Custom message for this error.
   */
  constructor(message = Errors.FILE_ERROR_MESSAGE) {
    super(message);
    this.name = Errors.FILE_ERROR;
  }
}
