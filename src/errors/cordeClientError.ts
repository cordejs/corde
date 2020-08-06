import { Errors, ErrorsMessages } from "../consts";

/**
 * Throws when a operation fail on CordeClient
 */
export class CordeClientError extends Error {
  constructor(message = ErrorsMessages.CORDE_CLIENT_ERROR) {
    super(message);
    this.name = Errors.CORDE_CLIENT_ERROR;
  }
}
