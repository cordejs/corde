/**
 * Throws when engage starts but no config file is found
 * @constructor Erro message, if not set, returns default message
 * @default message Config file not found
 */
export default class ConfigFileNotFoundError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("Config file not found");
      this.name = "ERR_ENGAGE_MISSING_CONFIG_FILE";
    }
  }
}
