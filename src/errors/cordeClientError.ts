import { Errors } from "./defaults";

/**
 * Related to a Corde client error.
 * @see Discord.Client https://discord.js.org/#/docs/main/stable/class/Client
 */
export class CordeClientError extends Error {
  /**
   * Throws when the management of some kind of data related to the Discord.Client
   * is found.
   * @param message Custom message to this error.
   */
  constructor(message = Errors.CORDE_CLIENT_ERROR_MESSAGE) {
    super(message);
    this.name = Errors.CORDE_CLIENT_ERROR;
  }
}
