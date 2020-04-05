/**
 * Throws when corde is trying to use a channel type that is not supported
 * @constructor Erro message, if not set, returns default message
 * @default message The informed channel type is not supported
 */
export class ChannelTypeNotSupportedError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super('The informed channel type is not supported');
      this.name = 'ERR_CORDE_CHANNEL_TYPE_NOT_SUPPORTED';
    }
  }
}
