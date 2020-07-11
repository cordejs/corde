/**
 * Throws when corde is trying to use a channel type that is not supported
 */
export class ChannelTypeNotSupportedError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("The informed channel type is not supported");
    }
    this.name = "ChannelTypeNotSupportedError";
  }
}
