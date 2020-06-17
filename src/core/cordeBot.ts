import {
  AwaitMessagesOptions,
  Channel,
  Client,
  Collection,
  Guild,
  Message,
  TextChannel,
} from 'discord.js';
import { BehaviorSubject } from 'rxjs';
import { RuntimeErro } from '../errors';
import { messageOutputType, messageType, MinifiedEmbedMessage } from '../models';
import { pick } from '../utils/utils';
import runtime, { DEFAULT_TEST_TIMEOUT } from './runtime';

export default class CordeBot {
  private _client: Client;
  hasInited: BehaviorSubject<boolean>;
  textChannel: TextChannel;

  /**
   * Starts new instance of Discord client
   * with its events.
   */
  constructor() {
    this._client = new Client();
    this.hasInited = new BehaviorSubject<boolean>(false);
    this.loadClientEvents();
  }

  /**
   * Get a channel based in the id stored in configs.
   *
   * @see Runtime
   */
  loadChannel(guildId: string, channelId: string) {
    const guild = this.findGuild(guildId);
    const channel = this.findChannel(guild, channelId);
    this.textChannel = this.convertToTextChannel(channel);
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
  async login(token: string) {
    try {
      return this._client.login(token);
    } catch (error) {
      return Promise.reject(this.buildLoginErroMessage(token, error));
    }
  }

  /**
   * Destroi client connection.
   */
  logout() {
    this._client.destroy();
  }

  /**
   * Send a message to a channel defined in configs.
   *
   * @see Runtime
   *
   * @param message Message without prefix that will be sent to defined servers's channel
   *
   * @description The message is concatened with the stored **prefix** and is sent to the channel.
   *
   * @return Promisse rejection if a testing bot does not send any message in the timeout value setted,
   * or a resolve for the promisse with the message returned by the testing bot.
   */
  async sendTextMessage(message: string, responseType: messageType): Promise<messageOutputType> {
    return new Promise(async (resolve, reject) => {
      this.validateMessageAndChannel(message);
      const formatedMessage = runtime.configs.botPrefix + message;
      await this.textChannel.send(formatedMessage);

      try {
        const answer = await this.awaitMessagesFromTestingBot();
        const content = this.getMessageByType(answer, responseType);
        resolve(content);
      } catch (error) {
        reject('Test timeout');
      }
    });
  }

  /**
   * Format Discord responses
   *
   * @param answer Discord response for a message sent
   *
   * @param type Type expected of that message
   *
   * @description Discord adds some attributes that are not present in embed message before it is sent
   *
   *  This is data **before** send to Discord
   *
   *  ```javascript
   *   "image": {
   *       "url": "https://i.imgur.com/wSTFkRM.png"
   *   },
   *   "thumbnail": {
   *       "url": "https://i.imgur.com/wSTFkRM.png"
   *   }
   *  ```
   *
   *  And this is part of embed message **after** get from Discord
   *
   *  ```javascript
   *   "image": {
   *     "height": 0,
   *     "proxyURL": "https://images-ext-2.discordapp.net/external/DoAGN014Q46B7iDBr2VJyHUL59QLSWdEAZ5wOoWe8CY/https/i.imgur.com/wSTFkRM.png",
   *     "url": "https://i.imgur.com/wSTFkRM.png",
   *     "width": 0
   *   },
   *   "thumbnail": {
   *       "height": 0,
   *       "proxyURL": "https://images-ext-2.discordapp.net/external/DoAGN014Q46B7iDBr2VJyHUL59QLSWdEAZ5wOoWe8CY/https/i.imgur.com/wSTFkRM.png",
   *       "url": "https://i.imgur.com/wSTFkRM.png",
   *      "width": 0
   *  }
   *  ```
   */
  private getMessageByType(answer: Collection<string, Message>, type: messageType) {
    if (type === 'embed') {
      const tempObject = answer.first().embeds[0].toJSON() as MinifiedEmbedMessage;
      if (tempObject.image) {
        tempObject.image = pick(tempObject.image, 'url');
      }
      if (tempObject.thumbnail) {
        tempObject.thumbnail = pick(tempObject.thumbnail, 'url');
      }
      return tempObject;
    } else {
      return answer.first();
    }
  }

  private async awaitMessagesFromTestingBot() {
    return await this.textChannel.awaitMessages(
      (responseName) => this.responseAuthorIsTestingBot(responseName),
      this.createWatchResponseConfigs(),
    );
  }

  private responseAuthorIsTestingBot(responseName: any) {
    return responseName.author.id === runtime.configs.botTestId;
  }

  private createWatchResponseConfigs(): AwaitMessagesOptions {
    return {
      max: 1,
      time: runtime.configs.timeOut ? runtime.configs.timeOut : DEFAULT_TEST_TIMEOUT,
      errors: ['time'],
    };
  }

  private loadClientEvents() {
    this._client.once('ready', () => {
      // emit to engine that corde bot is connected.
      this.hasInited.next(true);
    });
  }

  private buildLoginErroMessage(token: string, error: object) {
    return `Error trying to login with token ${token}. \n` + error;
  }

  private validateMessageAndChannel(message: string) {
    if (message === undefined) {
      console.log('No tests were declared');
      process.exit(1);
    } else if (this.textChannel === undefined) {
      throw new Error('Channel not found');
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
        throw new Error('There is no informed channel to start tests');
      }

      return channel;
    }
  }

  private convertToTextChannel(channel: Channel): TextChannel {
    return channel as TextChannel;
  }
}
