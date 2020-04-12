/**
 * Throws when corde is trying to use a channel type that is not supported
 * @constructor Erro message, if not set, returns default message
 * @default message The informed channel type is not supported
 */
export declare class ChannelTypeNotSupportedError extends Error {
  constructor(message?: string);
}
