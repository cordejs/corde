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
import { MessageData, RoleData } from "../types";
import { Events } from "./events";
import { CordeClientError } from "../errors/cordeClientError";
import { TimeoutError } from "../errors";

const DEFAULT_TEST_TIMEOUT = 5000;

/**
 * Encapsulation of Discord Client with all specific
 * functions for corde test.
 */
export class CordeBot extends Events {
  /**
   * Observes if corde bot is **ready**.
   * This is invoked after onReady in Discord.Client.
   * Used to initialize some data for CordeBot.
   * **Do not use onReady declared in Events if the intention is to ensure that
   * cordebot is ready for usage**
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
    client: Client,
  ) {
    super(client);
    this._channelId = channelId;
    this._prefix = prefix;
    this._guildId = guildId;
    this._waitTimeOut = waitTimeOut;
    this._testBotId = testBotId;
    this._onStart = new BehaviorSubject<boolean>(false);
    this._reactionsObserved = new BehaviorSubject<MessageReaction>(null);
    this.loadClientEvents();
  }

  private get guild() {
    return this.textChannel.guild;
  }

  /**
   * Authenticate Corde bot to the installed bot in Discord server.
   *
   * @param token Corde bot token
   *
   * @returns Promise resolve for success connection, or a promise
   * rejection with a formatted message if there was found a error in
   * connection attempt.
   */
  public async login(token: string) {
    try {
      return await this._client.login(token);
    } catch (error) {
      return Promise.reject(this.buildLoginErrorMessage(token, error));
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
   * @param message Message without prefix that will be sent to defined server's channel
   * @description The message is concatenated with the stored **prefix** and is sent to the channel.
   *
   * @return Promise rejection if a testing bot does not send any message in the timeout value setted,
   * or a resolve for the promise with the message returned by the testing bot.
   */
  public async sendTextMessage(message: string): Promise<Message> {
    return new Promise<Message>(async (resolve, reject) => {
      try {
        this.validateMessageAndChannel(message);
        const formattedMessage = this._prefix + message;
        const returnedMessage = await this.textChannel.send(formattedMessage);
        resolve(returnedMessage);
      } catch (error) {
        reject(new TimeoutError());
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
    throw new CordeClientError("No message was send");
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
        const filter = this.createWaitForAdedReactionsFilter(reactions);
        const maxReactionsToWait = this.defineMaxReactionsToWaitForAddedReactions(reactions);
        const collectedReactions = await message.awaitReactions(
          filter,
          this.createWatchResponseConfigs(maxReactionsToWait),
        );
        resolve(collectedReactions);
      } catch (error) {
        reject(new TimeoutError());
      }
    });
  }

  private createWaitForAdedReactionsFilter(reactions: number | string[]): CollectorFilter {
    if (reactions && Array.isArray(reactions)) {
      return (reaction, user) => {
        return reactions.includes(reaction.emoji.name) && this.responseAuthorIsTestingBot(user.id);
      };
    }

    return (_reaction, user) => {
      return this.responseAuthorIsTestingBot(user.id);
    };
  }

  private defineMaxReactionsToWaitForAddedReactions(reactions: number | string[]) {
    if (reactions && Array.isArray(reactions)) {
      return reactions.length;
    }
    if (typeof reactions === "number" && reactions > 0) {
      return reactions;
    }
    return 1;
  }

  public waitForRemovedReactions(message: Message, take: number) {
    let amount = 0;
    const reactions: MessageReaction[] = [];
    return new Promise<MessageReaction[]>((resolve, reject) => {
      setTimeout(() => {
        reject(new TimeoutError());
      }, DEFAULT_TEST_TIMEOUT);

      this._reactionsObserved.subscribe((reaction) => {
        if (reaction) {
          if (reaction.message.id === message.id) {
            amount++;
            reactions.push(reaction);
          }
          if (amount >= take) {
            resolve(reactions);
          }
        }
      });
    });
  }

  /**
   * Checks if corde bot is connected
   */
  public isLoggedIn() {
    return !!this._client && !!this._client.readyAt && this._onStart.value;
  }

  public async findMessage(filter: (message: Message) => boolean): Promise<Message>;
  public async findMessage(data: MessageData): Promise<Message>;
  public async findMessage(data: MessageData | ((message: Message) => boolean)): Promise<Message> {
    const messageData: MessageData = data as MessageData;

    if (messageData && messageData.text) {
      return this._findMessage((m) => m.content === messageData.text);
    }
    if (messageData && messageData.id) {
      return this._findMessage((m) => m.id === messageData.id);
    }
    if (data) {
      return this._findMessage(data as (message: Message) => boolean);
    }
    return null;
  }

  public async findPinnedMessage(messageData: MessageData) {
    const msgs = await this.textChannel.messages.fetchPinned();
    if (messageData && messageData.text) {
      return msgs.find((m) => m.content === messageData.text);
    }
    if (messageData && messageData.id) {
      return msgs.find((m) => m.id === messageData.id);
    }
    return null;
  }

  public async fetchRole(id: string) {
    return await this.guild.roles.fetch(id, false, true);
  }

  public async hasRole(roleData: RoleData) {
    return !!(await this.findRole(roleData));
  }

  public async findRole(roleData: RoleData) {
    const data = await this.guild.roles.fetch();
    if (roleData.id) {
      return data.cache.find((r) => r.id === roleData.id);
    } else if (roleData.name) {
      return data.cache.find((r) => r.name === roleData.name);
    }
    return null;
  }

  public getRoles() {
    return this.guild.roles.cache;
  }

  /**
   * Search for messages based in a filter query.
   */
  private async _findMessage(
    fn: (value: Message, key: string, collection: Collection<string, Message>) => boolean,
  ) {
    const collection = await this.textChannel.messages.fetch();
    if (collection) {
      return collection.find(fn);
    }
    return null;
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
    this.onReady(() => {
      this.loadChannel();
      this._onStart.next(true);
    });

    this.onMessageReactionRemoveEmoji((reaction) => {
      this._reactionsObserved.next(reaction);
    });
  }

  private buildLoginErrorMessage(token: string, error: object) {
    return `Error trying to login with token ${token}. \n` + error;
  }

  private validateMessageAndChannel(message: string) {
    if (!message) {
      throw new CordeClientError("No tests were declared");
    }

    if (!this.textChannel) {
      throw new CordeClientError("Channel not found");
    }
  }

  public findGuild(guildId: string) {
    if (!this._client.guilds) {
      throw new CordeClientError(
        `corde bot isn't added in a guild. Please add it to the guild: ${guildId}`,
      );
    } else if (!this._client.guilds.cache.has(guildId)) {
      throw new CordeClientError(
        `Guild ${guildId} doesn't belong to corde bot. change the guild id ` +
          ` in corde.config or add the bot to a valid guild`,
      );
    } else {
      const guild = this._client.guilds.cache.find((_guild) => _guild.id === guildId);

      if (guild) {
        return guild;
      }

      const availableGuildsIds = this._client.guilds.cache.map(
        (guildAvailable) => guildAvailable.id,
      );
      throw new CordeClientError(
        `Could not find the guild ${guildId}.` +
          ` this client has connections with the following guilds: ${availableGuildsIds}`,
      );
    }
  }

  public findChannel(guild: Guild, channelId: string) {
    if (!guild.channels) {
      throw new CordeClientError(`Guild '${guild.name}' do not have any channel.`);
    } else if (!guild.channels.cache.has(channelId)) {
      throw new CordeClientError(
        `channel ${channelId} doesn't appear to be a channel of guild ${guild.name}`,
      );
    } else {
      const channel = guild.channels.cache.find((ch) => ch.id === channelId);

      if (channel === undefined) {
        throw new CordeClientError("There is no informed channel to start tests");
      }

      return channel;
    }
  }

  private convertToTextChannel(channel: Channel): TextChannel {
    return channel as TextChannel;
  }
}
