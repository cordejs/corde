import { Errors } from "./defaults";

/**
 * Related to corde configs.
 */
export class ConfigError extends Error {
  /**
   * Throws when a error is found in corde configs.
   * @param message Custom message to this error
   */
  constructor(message = Errors.CONFIG_ERROR_MESSAGE) {
    super(message);
    this.name = Errors.CONFIG_ERROR;
  }
}
