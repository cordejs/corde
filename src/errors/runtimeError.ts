/**
 * Throws when corde is trying to use a channel type that is not supported
 * @constructor Erro message, if not set, returns default message
 * @default message The informed channel type is not supported
 */
export class RuntimeErro extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super('A data from discord was not found');
    }
    this.name = 'ERR_CORDE_RUNTIME_ERROR';
  }
}
