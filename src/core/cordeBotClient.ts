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
import { MessageData } from "../interfaces";
import { Events } from "./events";

/**
 * Encapsulation of Discord Client with all specific
 * functions for corde test.
 */
export class CordeBot extends Events {
  /**
   * Observes if corde bot is **ready**
   */
  public get onStart() {
    return this._onStart.asObservable();
  }

  private readonly _onStart: BehaviorSubject<boolean>;
  private readonly _prefix: string;
  private readonly _guildId: string;
  private readonly _channelId: string;
  private readonly _waitTimeOut: number;
  private readonly _testBotId: string;

  private textChannel: TextChannel;
  private _reactionsObserved: BehaviorSubject<MessageReaction>;

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
    super();
    this._channelId = channelId;
    this._prefix = prefix;
    this._guildId = guildId;
    this._waitTimeOut = waitTimeOut;
    this._testBotId = testBotId;
    this._onStart = new BehaviorSubject<boolean>(false);
    this._reactionsObserved = new BehaviorSubject<MessageReaction>(null);
    this.loadClientEvents();
  }

  /**
   * Authenticate Corde bot to the instaled bot in Discord server.
   *
   * @param token Corde bot token
   *
   * @returns Promise resolve for success connection, or a promisse
   * rejection with a formated message if there was found a error in
   * connection attempt.
   */
  public async login(token: string) {
    try {
      return await this._client.login(token);
    } catch (error) {
      return Promise.reject(this.buildLoginErroMessage(token, error));
    }
  }

  /**
   * Destroy client connection.
   */
  public logout() {
    this._client.destroy();
  }

  /**
   * Send a message to a channel defined in configs.
   *
   * @see Runtime
   *
   * @param message Message without prefix that will be sent to defined servers's channel
   * @description The message is concatened with the stored **prefix** and is sent to the channel.
   *
   * @return Promisse rejection if a testing bot does not send any message in the timeout value setted,
   * or a resolve for the promisse with the message returned by the testing bot.
   */
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

  /**
   * Observes for a message send by the testing bot after corde bot
   * send it's message.
   */
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

  /**
   * Observes for reactions in a message
   */
  public async waitForAddedReactions(
    message: Message,
    totalReactions?: number,
  ): Promise<Collection<string, MessageReaction>>;
  public async waitForAddedReactions(
    message: Message,
    reactions?: string[],
  ): Promise<Collection<string, MessageReaction>>;
  public async waitForAddedReactions(message: Message, reactions?: string[] | number) {
    return new Promise<Collection<string, MessageReaction>>(async (resolve, reject) => {
      try {
        let filter: CollectorFilter = null;

        if (reactions && Array.isArray(reactions)) {
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
        let maxReactionsToWait = 1;
        if (reactions && Array.isArray(reactions)) {
          maxReactionsToWait = reactions.length;
        } else if (typeof reactions === "number" && reactions > 0) {
          maxReactionsToWait = reactions;
        }

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

  public waitForRemovedReactions(message: Message, take: number) {
    let amount = 0;
    const reactions: MessageReaction[] = [];
    return new Promise<MessageReaction[]>((resolve, reject) => {
      setTimeout(() => {
        reject("Timeout");
      }, DEFAULT_TEST_TIMEOUT);

      this._reactionsObserved.subscribe((reaction) => {
        if (reaction) {
          amount++;
          if (amount >= take) {
            resolve(reactions);
          } else if (reaction.message.id === message.id) {
            reactions.push(reaction);
          }
        }
      });
    });
  }

  /**
   * Checks if corde bot is connected
   */
  public isLoggedIn() {
    return !!this._client && !!this._client.readyAt;
  }

  public async findMessage(
    filter: (message: Message) => boolean,
    cache?: boolean,
  ): Promise<Message>;
  public async findMessage(data: MessageData, cache?: boolean): Promise<Message>;
  public async findMessage(
    data: MessageData | ((message: Message) => boolean),
    cache?: boolean,
  ): Promise<Message> {
    const messageData: MessageData = data as MessageData;

    if (cache && messageData && messageData.id) {
      return await this.textChannel.messages.fetch(messageData.id);
    }

    const manager = await this.getMessageCollection(cache);

    if (messageData && messageData.text) {
      return manager.find((m) => m.content === messageData.text);
    } else if (data) {
      return manager.find(data as (message: Message) => boolean);
    }
    return this.textChannel.messages.cache.first();
  }

  /**
   * Return a collection of message from textChannel based of cache or not cached messages.
   * @param cache Defines if will get all cached message ou fetch then
   */
  private async getMessageCollection(cache?: boolean) {
    if (cache) {
      return this.textChannel.messages.cache;
    }
    return await this.textChannel.messages.fetch();
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
    this.onReady.subscribe((isReady) => {
      if (isReady) {
        this.loadChannel();
        this._onStart.next(true);
      }
    });

    this.onMessageReactionRemoveEmoji.subscribe((reaction) => {
      this._reactionsObserved.next(reaction);
    });
  }

  private buildLoginErroMessage(token: string, error: object) {
    return `Error trying to login with token ${token}. \n` + error;
  }

  private validateMessageAndChannel(message: string) {
    if (message === undefined) {
      throw new Error("No tests were declared");
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
