import {
  AwaitMessagesOptions,
  Channel,
  Client,
  Collection,
  CollectorFilter,
  Guild,
  Message,
  MessageReaction,
  TextChannel,
} from "discord.js";
import { BehaviorSubject } from "rxjs";
import { DEFAULT_TEST_TIMEOUT } from "../consts";
import { RuntimeErro } from "../errors";
import { CordeBot } from "../interfaces";

/**
 * Encapsulation of Discord Client with all specific
 * functions for corde test.
 */
export class CordeBotClient implements CordeBot {
  public hasInited: BehaviorSubject<boolean>;

  private readonly _prefix: string;
  private readonly _guildId: string;
  private readonly _channelId: string;
  private readonly _waitTimeOut: number;
  private readonly _testBotId: string;

  private textChannel: TextChannel;
  private _client: Client;
  /**
   * Starts new instance of Discord client with its events.
   *
   * @param prefix Corde bot prefix.
   * @param guildId Guild id where corde bot is located in.
   * @param channelId Channel id where corde bot is located in.
   * @param waitTimeOut Timeout for message wait.
   * @param testBotId id of testing bot.
   */
  constructor(
    prefix: string,
    guildId: string,
    channelId: string,
    waitTimeOut: number = DEFAULT_TEST_TIMEOUT,
    testBotId: string,
  ) {
    this._channelId = channelId;
    this._prefix = prefix;
    this._guildId = guildId;
    this._waitTimeOut = waitTimeOut;
    this._testBotId = testBotId;
    this._client = new Client();
    this.hasInited = new BehaviorSubject<boolean>(false);
    this.loadClientEvents();
  }

  public async login(token: string) {
    try {
      return await this._client.login(token);
    } catch (error) {
      return Promise.reject(this.buildLoginErroMessage(token, error));
    }
  }

  public logout() {
    this._client.destroy();
  }

  public async sendTextMessage(message: string): Promise<Message> {
    return new Promise<Message>(async (resolve, reject) => {
      try {
        this.validateMessageAndChannel(message);
        const formatedMessage = this._prefix + message;
        const returnedMessage = await this.textChannel.send(formatedMessage);
        resolve(returnedMessage);
      } catch (error) {
        reject("Test timeout");
      }
    });
  }

  public async awaitMessagesFromTestingBot() {
    const msg = await this.textChannel.awaitMessages(
      (responseName) => this.responseAuthorIsTestingBot(responseName.author.id),
      this.createWatchResponseConfigs(),
    );

    if (msg) {
      return msg.first();
    }
    throw new Error("No message was send");
  }

  public async waitForReactions(message: Message, reactions?: string[]) {
    return new Promise<Collection<string, MessageReaction>>(async (resolve, reject) => {
      try {
        let filter: CollectorFilter = null;

        if (reactions) {
          filter = (reaction, user) => {
            return (
              reactions.includes(reaction.emoji.name) && this.responseAuthorIsTestingBot(user.id)
            );
          };
        } else {
          filter = (_reaction, user) => {
            return this.responseAuthorIsTestingBot(user.id);
          };
        }
        const maxReactionsToWait = reactions ? reactions.length : 1;
        const collectedReactions = await message.awaitReactions(
          filter,
          this.createWatchResponseConfigs(maxReactionsToWait),
        );
        resolve(collectedReactions);
      } catch (error) {
        reject("Test timeout");
      }
    });
  }

  public isLoggedIn() {
    return !!this._client && !!this._client.readyAt && this.hasInited.value;
  }

  /**
   * Get a channel based in the id stored in configs.
   *
   * @see Runtime
   */
  private loadChannel() {
    const guild = this.findGuild(this._guildId);
    const channel = this.findChannel(guild, this._channelId);
    this.textChannel = this.convertToTextChannel(channel);
  }

  private responseAuthorIsTestingBot(idAuthor: string) {
    return idAuthor === this._testBotId;
  }

  private createWatchResponseConfigs(max: number = 1): AwaitMessagesOptions {
    return {
      max,
      time: this._waitTimeOut ? this._waitTimeOut : DEFAULT_TEST_TIMEOUT,
      errors: ["time"],
    };
  }

  private loadClientEvents() {
    this._client.once("ready", () => {
      this.loadChannel();
      // emit to engine that corde bot is connected.
      this.hasInited.next(true);
    });
  }

  private buildLoginErroMessage(token: string, error: object) {
    return `Error trying to login with token ${token}. \n` + error;
  }

  private validateMessageAndChannel(message: string) {
    if (message === undefined) {
      console.log("No tests were declared");
      process.exit(1);
    } else if (this.textChannel === undefined) {
      throw new Error("Channel not found");
    }
  }

  private findGuild(guildId: string) {
    if (!this._client.guilds) {
      throw new Error(`corde bot isn't added in a guild. Please add it to the guild: ${guildId}`);
    } else if (!this._client.guilds.cache.has(guildId)) {
      throw new RuntimeErro(
        `Guild ${guildId} doesn't belong to corde bot. change the guild id in corde.config or add the bot to a valid guild`,
      );
    } else {
      const guild = this._client.guilds.cache.find((_guild) => _guild.id === guildId);

      if (guild) {
        return guild;
      }

      const availableGuildsIds = this._client.guilds.cache.map(
        (guildAvailable) => guildAvailable.id,
      );
      throw new Error(
        `Could not find the guild ${guildId}. this client has conections with the following guilds: ${availableGuildsIds}`,
      );
    }
  }

  private findChannel(guild: Guild, channelId: string) {
    if (!guild.channels) {
      throw new RuntimeErro(`Guild '${guild.name}' do not have any channel.`);
    } else if (!guild.channels.cache.has(channelId)) {
      throw new Error(`channel ${channelId} doesn't appear to be a channel of guild ${guild.name}`);
    } else {
      const channel = guild.channels.cache.find((ch) => ch.id === channelId);

      if (channel === undefined) {
        throw new Error("There is no informed channel to start tests");
      }

      return channel;
    }
  }

  private convertToTextChannel(channel: Channel): TextChannel {
    return channel as TextChannel;
  }
}
