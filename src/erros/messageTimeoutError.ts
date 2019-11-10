/**
 * Throws when a message is sent but not answered
 *
 * @public
 * @constructor Erro message, if not set, returns default message
 */
export class MessageTimeoutError extends Error {
    constructor(message?: string) {
      if (message) {
        super(message);
      } else {
        super("Message not answered");
        this.name = "ERR_CORDE_MESSAGE_TIMEOUT";
      }
    }
  }
  