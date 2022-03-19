import { ICordeBot } from "../types";
import { IInternalEvents } from "./internalEvents";
import { CordeBot } from "./CordeBot";
import { Client, Intents } from "discord.js";
import { Config } from "./Config";
import { TestCollector } from "./TestCollector";
import { ConfigError } from "../errors";
import path from "path";
import { replaceAll } from "../utils/replaceAll";
import { ROOT_DIR } from "../const";
import { EventEmitter } from "stream";

/**
 * @internal
 */
export class Runtime {
  public configFilePath!: string;
  public files!: string[];

  public readonly testCollector: TestCollector;
  private _internalEvents: IInternalEvents;
  private _mocks: Array<corde.IMockInstance<any, any, any>>;

  private readonly _configs: Config;
  private _bot!: ICordeBot;

  get bot() {
    return this._bot;
  }

  get isUnityTest() {
    return process.env.ENV === "UNITY_TEST";
  }

  get isE2eTest() {
    return process.env.ENV === "E2E_TEST";
  }

  get isTestEnv() {
    return this.isE2eTest || this.isUnityTest;
  }

  get exitOnFileReadingError() {
    return this._configs.exitOnFileReadingError;
  }

  get extensions() {
    return this._configs.extensions;
  }

  get events() {
    return this.bot.events;
  }

  get configs() {
    return this._configs;
  }

  get cordeBotToken() {
    return this._configs.cordeBotToken;
  }

  get botTestId() {
    return this._configs.botTestId;
  }

  get project() {
    return this._configs.project;
  }

  get channelId() {
    return this._configs.channelId;
  }

  get guildId() {
    return this._configs.guildId;
  }

  get timeout() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._configs.timeout!;
  }

  get botPrefix() {
    return this._configs.botPrefix;
  }

  get testMatches() {
    return this._configs.testMatches;
  }

  get modulePathIgnorePatterns() {
    return this._configs.modulePathIgnorePatterns;
  }

  get internalEvents() {
    return this._internalEvents;
  }

  constructor() {
    this._internalEvents = new EventEmitter();
    this._configs = new Config();
    this._mocks = [];
    this.testCollector = new TestCollector();
  }

  setConfigs(_configs: Partial<corde.IConfigOptions>, forceUpdate?: boolean) {
    if (!_configs) {
      throw new ConfigError("Invalid _configs");
    }

    this._configs.setConfigs(_configs, forceUpdate);
  }

  replaceWithRootDir(text: string) {
    if (this._configs.rootDir) {
      return replaceAll(text, ROOT_DIR, this._configs.rootDir);
    }
    return text;
  }

  resolvePathWithRootDir(partialPath: string) {
    if (this._configs.rootDir) {
      return path.resolve(process.cwd(), this._configs.rootDir, partialPath);
    }
    return path.resolve(process.cwd(), partialPath);
  }

  /**
   * Shortcut for *bot.isLoggedIn*
   */
  isBotLoggedIn() {
    return this.bot && this.bot.isLoggedIn();
  }

  /**
   * Shortcut for *bot.logout*
   */
  logoffBot() {
    if (this._bot) {
      this._bot.logout();
    }
  }

  loginBot(token: string) {
    return this.bot.login(token);
  }

  initBot() {
    this._bot = new CordeBot(
      this._configs.botPrefix,
      this._configs.guildId,
      this._configs.channelId,
      this._configs.botTestId,
      this.initClient(),
    );
  }

  addMock(mock: corde.IMockInstance<any, any, any>) {
    this._mocks.push(mock);
  }

  resetAllMocks() {
    this._mocks.forEach((mock) => mock.restore());
  }

  private initClient() {
    return new Client({
      intents: [Intents.FLAGS.GUILDS],
    });
  }
}

const runtime = new Runtime();
export default runtime;
