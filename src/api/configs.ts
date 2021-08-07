import { IConfigOptions } from "../types";

export class ConfigsAPI implements IConfigOptions {
  constructor(private _internalConfigs: IConfigOptions) {}

  get cordeBotToken() {
    return this._internalConfigs.cordeBotToken;
  }

  get botTestId() {
    return this._internalConfigs.botTestId;
  }

  get botToken() {
    return this._internalConfigs.botToken;
  }

  get channelId() {
    return this._internalConfigs.channelId;
  }

  get guildId() {
    return this._internalConfigs.guildId;
  }

  get timeout() {
    return this._internalConfigs.timeout;
  }

  get botPrefix() {
    return this._internalConfigs.botPrefix;
  }

  get testMatches() {
    return this._internalConfigs.testMatches;
  }

  get modulePathIgnorePatterns() {
    return this._internalConfigs.modulePathIgnorePatterns;
  }

  get project() {
    return this._internalConfigs.project;
  }

  get exitOnFileReadingError() {
    return this._internalConfigs.exitOnFileReadingError;
  }

  get extensions() {
    return this._internalConfigs.extensions;
  }

  get rootDir() {
    return this._internalConfigs.rootDir;
  }
}
