import { Errors } from "./defaults";
import { InternalError } from ".";

/**
 * Related to corde configs.
 */
export class ConfigError extends InternalError {
  /**
   * Throws when a error is found in corde configs.
   * @param message Custom message to this error
   */
  constructor(message = Errors.CONFIG_ERROR_MESSAGE) {
    super(message);
    this.name = Errors.CONFIG_ERROR;
  }
}
