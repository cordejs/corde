/**
 * Throws when a readed config file has errors
 */
export class InvalidConfigFileError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("Invalid configuration file");
      this.name = "ConfigFileError";
    }
  }
}
