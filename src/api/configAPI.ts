import { DEFAULT_CONFIG } from "../consts";
import { IConfigOptions } from "../types";

export class ConfigAPI implements Readonly<Required<IConfigOptions>> {
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
    return this._internalConfigs.timeout ?? DEFAULT_CONFIG.timeout;
  }

  get botPrefix() {
    return this._internalConfigs.botPrefix;
  }

  get testMatches() {
    return [...this._internalConfigs.testMatches];
  }

  get modulePathIgnorePatterns() {
    const modulePathIgnorePatterns = this._internalConfigs.modulePathIgnorePatterns;
    if (modulePathIgnorePatterns) {
      return [...modulePathIgnorePatterns];
    }
    return [...DEFAULT_CONFIG.modulePathIgnorePatterns];
  }

  get project() {
    return this._internalConfigs.project ?? DEFAULT_CONFIG.project;
  }

  get exitOnFileReadingError() {
    return this._internalConfigs.exitOnFileReadingError ?? DEFAULT_CONFIG.exitOnFileReadingError;
  }

  get extensions() {
    const extension = this._internalConfigs.extensions;
    if (extension) {
      return [...extension];
    }
    return [...DEFAULT_CONFIG.extensions];
  }

  get rootDir() {
    return this._internalConfigs.rootDir ?? DEFAULT_CONFIG.rootDir;
  }
}
