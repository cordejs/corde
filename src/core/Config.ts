import path from "path";
import { DEFAULT_CONFIG, ROOT_DIR } from "../const";
import { replaceAll } from "../utils/replaceAll";
import { ObjectLike } from "../types";
import { parser } from "../utils/parser";

type KeyOfConfig = keyof corde.IConfigOptions;
/**
 * Default interface of JSON config
 */
export class Config implements Readonly<corde.IConfigOptions> {
  private _cordeBotToken!: string;
  private _botTestId!: string;
  private _channelId!: string;
  private _guildId!: string;
  private _timeout?: number;
  private _botPrefix!: string;
  private _testMatches!: string[];
  private _modulePathIgnorePatterns!: string[];
  private _project?: string;
  private _exitOnFileReadingError?: boolean;
  private _extensions?: string[];
  private _rootDir!: string;
  private _useConfigValuesInEventsDefaultParameters!: boolean;
  private _useTimeoutValueInEventsDefaultParameters!: boolean;
  private _loginCordeBotOnStart!: boolean;
  private _loginTimeout!: number;
  private _commandTimeout?: number;
  private _suiteTimeout!: number;
  private _intents!: corde.Intent[];

  get commandTimeout() {
    return this._commandTimeout;
  }

  get suiteTimeout() {
    return this._suiteTimeout;
  }

  get loginTimeout() {
    return this._loginTimeout;
  }

  get loginCordeBotOnStart() {
    return this._loginCordeBotOnStart;
  }

  get cordeBotToken() {
    return this._cordeBotToken;
  }

  get botTestId() {
    return this._botTestId;
  }

  get channelId() {
    return this._channelId;
  }

  get guildId() {
    return this._guildId;
  }

  get timeout() {
    return this._timeout ?? DEFAULT_CONFIG.timeout;
  }

  get botPrefix() {
    return this._botPrefix;
  }

  get testMatches() {
    return this._testMatches;
  }

  get modulePathIgnorePatterns() {
    return this._modulePathIgnorePatterns;
  }

  get project() {
    return this._project;
  }

  get exitOnFileReadingError() {
    return this._exitOnFileReadingError;
  }

  get extensions() {
    return this._extensions;
  }

  get rootDir() {
    return this._rootDir;
  }

  get useConfigValuesInEventsDefaultParameters() {
    return this._useConfigValuesInEventsDefaultParameters;
  }

  get useTimeoutValueInEventsDefaultParameters() {
    return this._useTimeoutValueInEventsDefaultParameters;
  }

  get intents() {
    return this._intents;
  }

  getConfigTimeoutOrDefault() {
    return this.timeout;
  }

  getSuiteTimeout() {
    return this._suiteTimeout ?? this.timeout;
  }

  /**
   * Initialize Configs with default values.
   */
  constructor() {
    this.setConfigs(DEFAULT_CONFIG, true, true);
  }

  get<T extends KeyOfConfig>(configName: T): corde.IConfigOptions[T] {
    return this[configName];
  }

  /**
   * Set values to config options that are not **filed** yet
   * It means that all options that are already with a value will not lose
   * this value
   *
   * @example
   * const config = new Config();
   * config.timeout = 1000;
   *
   * const newConfig: IConfigOptions = { ...timeout: 3000 };
   * config.setConfigs(newConfig);
   * console.log(config.timeout) // print 1000;
   *
   * @param config new set of configs.
   */
  setConfigs(
    config: Partial<corde.IConfigOptions>,
    forceUpdate?: boolean,
    isDefaultValue?: boolean,
  ) {
    if (config?.rootDir && (!this.rootDir || forceUpdate)) {
      this._rootDir = path.resolve(process.cwd(), config.rootDir);
    }

    if (config?.cordeBotToken && (!this.cordeBotToken || forceUpdate)) {
      this._cordeBotToken = config.cordeBotToken;
    }

    if (config?.botPrefix && (!this.botPrefix || forceUpdate)) {
      this._botPrefix = config.botPrefix;
    }

    if (config?.project && (!this.project || forceUpdate)) {
      this._project = path.normalize(replaceAll(config.project, ROOT_DIR, this.rootDir));
    }

    if (config?.botTestId && (!this.botTestId || forceUpdate)) {
      this._botTestId = config.botTestId;
    }

    this._setTimeouts(config, forceUpdate, isDefaultValue);

    if (config?.extensions && (!this.extensions || forceUpdate)) {
      this._extensions = config.extensions;
    }

    if (
      config?.useConfigValuesInEventsDefaultParameters &&
      (!this.useConfigValuesInEventsDefaultParameters || forceUpdate)
    ) {
      this._useConfigValuesInEventsDefaultParameters =
        config.useConfigValuesInEventsDefaultParameters;
    }

    if (
      config?.useTimeoutValueInEventsDefaultParameters &&
      (!this.useTimeoutValueInEventsDefaultParameters || forceUpdate)
    ) {
      this._useTimeoutValueInEventsDefaultParameters =
        config?.useTimeoutValueInEventsDefaultParameters;
    }

    if (
      typeof config?.exitOnFileReadingError !== "undefined" &&
      (!this.exitOnFileReadingError || forceUpdate)
    ) {
      this._exitOnFileReadingError = config.exitOnFileReadingError;
    }

    if (config?.channelId && (!this.channelId || forceUpdate)) {
      this._channelId = config.channelId;
    }

    if (config?.guildId && (!this.guildId || forceUpdate)) {
      this._guildId = config.guildId;
    }

    if (config?.loginCordeBotOnStart && (!this.loginCordeBotOnStart || forceUpdate)) {
      this._loginCordeBotOnStart = config.loginCordeBotOnStart;
    }

    if (config?.botPrefix && (!this.botPrefix || forceUpdate)) {
      this._botPrefix = config.botPrefix;
    }

    if (config?.intents && (!this.intents || forceUpdate)) {
      this._intents = config.intents;
    }

    if (config?.modulePathIgnorePatterns && (!this.modulePathIgnorePatterns || forceUpdate)) {
      this._modulePathIgnorePatterns = config.modulePathIgnorePatterns;
      this._modulePathIgnorePatterns = this.clearArray(this._modulePathIgnorePatterns);
    }

    if (
      config?.testMatches &&
      (!this.testMatches || this.testMatches.length === 0 || forceUpdate)
    ) {
      if (Array.isArray(config.testMatches)) {
        this._testMatches = this.getArrayWithRootReplaced(config.testMatches);
        this._testMatches = this.clearArray(this._testMatches);
      } else {
        this._testMatches = [];
      }
    }
  }

  private _setTimeouts(
    config: Partial<corde.IConfigOptions>,
    forceUpdate?: boolean,
    isDefaultValue?: boolean,
  ) {
    if (config?.timeout && (!this.timeout || forceUpdate)) {
      // Forces to set timeout to a number
      this._timeout = parser.toNumber(config?.timeout);

      // In case of values being set are not from default configs,
      // AND timeout value exists, than is will override all others
      // timeout values.
      if (!isDefaultValue) {
        this._loginTimeout = this._timeout;
        this._suiteTimeout = this._timeout;
        this._commandTimeout = this._timeout;
      }
    }

    if (config?.loginTimeout && (!this.loginTimeout || forceUpdate)) {
      this._loginTimeout = parser.toNumber(config.loginTimeout);
    }

    if (config?.suiteTimeout && (!this.suiteTimeout || forceUpdate)) {
      this._suiteTimeout = parser.toNumber(config.suiteTimeout);
    }

    if (config?.commandTimeout && (!this.commandTimeout || forceUpdate)) {
      this._commandTimeout = parser.toNumber(config.commandTimeout);
    }
  }

  getProps() {
    const obj: ObjectLike = {};

    Object.getOwnPropertyNames(this).forEach((pName) => {
      obj[pName.substring(1)] = this.get(pName as KeyOfConfig);
    });
    return obj;
  }

  private clearArray(array: string[]) {
    // Removes empty elements
    const cleaned = array.filter((val) => val);
    // Removes duplicated elements
    return [...new Set(cleaned)];
  }

  private getArrayWithRootReplaced(array: string[]) {
    return array.map((val) => {
      if (val.includes(ROOT_DIR)) {
        return path.normalize(replaceAll(val, ROOT_DIR, this._rootDir));
      }
      return val;
    });
  }
}