import { Errors } from "./defaults";

/**
 * Represents a error related to a type (channel, file etc) that isn't supported by corde
 */
export class TypeError extends Error {
  /**
   * Throws when there is a type convertion occours
   */
  constructor(message = Errors.TYPE_ERROR_MESSAGE) {
    super(message);
    this.name = Errors.TYPE_ERROR;
  }
}
