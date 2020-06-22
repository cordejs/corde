/**
 * Throws when corde starts but no config file is found
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
