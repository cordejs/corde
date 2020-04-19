/**
 * Throws when corde starts but no config file is found
 * @constructor Erro message, if not set, returns default message
 * @default message Config file not found
 */
export class ConfigFileNotFoundError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super('Config file not found');
      this.name = 'ERR_CORDE_MISSING_CONFIG_FILE';
    }
  }
}
