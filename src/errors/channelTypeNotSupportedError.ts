import { Errors, ErrorsMessages } from "../consts";

/**
 * Represents a Error related to [Discord.Channel](https://discord.js.org/#/docs/main/stable/class/Channel)
 * type
 */
export class ChannelTypeNotSupportedError extends Error {
  /**
   * Throws when corde is trying to use a channel type that is not supported.
   */
  constructor(message = ErrorsMessages.CHANNEL_TYPE_NOT_SUPPORTED_ERROR) {
    super(message);
    this.name = Errors.CHANNEL_TYPE_NOT_SUPPORTED_ERROR;
  }
}
