import {
  Guild,
  Channel,
  Client,
  TextChannel,
  AwaitMessagesOptions,
  Collection,
  Message,
  MessageEmbed,
} from 'discord.js';
import runtime from './runtime';
import { RuntimeErro } from './errors';
import ConfigOptions from './config';
import { messageType, MinifiedEmbedMessage, messageOutputType } from './building/models';
import { pick } from './utils/utils';

const DEFAULT_TIMEOUT = 5000;

class CordeBot {
  private _client: Client;

  /**
   * Starts new instance of Discord client
   * with its events.
   */
  constructor() {
    this._client = new Client();
    this.loadClientEvents();
  }

  /**
   * Get a channel based in the id stored in configs.
   * @see Runtime
   */
  getChannelForTests() {
    const guild = this.findGuild(runtime);
    const channel = this.findChannel(guild, runtime);
    return this.convertToTextChannel(channel);
  }

  /**
   * Authenticate Corde bot to the instaled bot in Discord server.
   * @param token Corde bot token
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
   * @see Runtime
   * @param message Message without prefix that will be sent to defined servers's channel
   * @description The message is concatened with the stored **prefix** and is sent to the channel.
   * @return Promisse rejection if a testing bot does not send any message in the timeout value setted,
   * or a resolve for the promisse with the message returned by the testing bot.
   */
  async sendMessage(
    message: string,
    responseType: messageType = 'text',
  ): Promise<messageOutputType> {
    return new Promise(async (resolve, reject) => {
      this.validateEntryData(runtime, message);
      const formatedMessage = runtime.botPrefix + message;
      await runtime.sendMessageToChannel(formatedMessage);

      try {
        const answer = await this.awaitMessagesFromTestingBot();
        let content = this.getMessgeByType(answer, responseType);
        resolve(content);
      } catch (error) {
        reject('Test timeout');
      }
    });
  }

  /**
   * Format Discord responses
   * @param answer Discord response for a message sent
   * @param type Type expected of that message
   *
   * @description
   *   Discord adds some attributes that are not present in embed message before it is sent
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
  private getMessgeByType(answer: Collection<string, Message>, type: messageType) {
    if (type === 'text') {
      return answer.first().content;
    } else if (type === 'embed') {
      const tempObject = answer.first().embeds[0].toJSON() as MinifiedEmbedMessage;
      tempObject.image = pick(tempObject.image, 'url');
      tempObject.thumbnail = pick(tempObject.thumbnail, 'url');
      return tempObject;
    } else {
      return '';
    }
  }

  private async awaitMessagesFromTestingBot() {
    return await runtime.channel.awaitMessages(
      (responseName) => this.responseAuthorIsTestingBot(responseName),
      this.createWatchResponseConfigs(),
    );
  }

  private responseAuthorIsTestingBot(responseName: any) {
    return responseName.author.id === runtime.botTestId;
  }

  private createWatchResponseConfigs(): AwaitMessagesOptions {
    return {
      max: 1,
      time: runtime.timeOut ? runtime.timeOut : DEFAULT_TIMEOUT,
      errors: ['time'],
    };
  }

  private loadClientEvents() {
    this._client.once('ready', () => {
      // emit to engine that corde bot is connected.
      runtime.cordeBotHasStarted.next(true);
    });
  }

  private buildLoginErroMessage(token: string, error: object) {
    return `Error trying to login with token ${token}. \n` + error;
  }

  private validateEntryData(config: ConfigOptions, message: string) {
    if (message === undefined) {
      console.log('No testes were declared');
      process.exit(1);
    } else if (config.channel === undefined) {
      throw new Error('Channel not found');
    }
  }

  private findGuild(config: ConfigOptions) {
    if (!this._client.guilds) {
      throw new Error(
        `corde bot isn't added in a guild. Please add it to the guild: ${config.guildId}`,
      );
    } else if (!this._client.guilds.cache.has(config.guildId)) {
      throw new RuntimeErro(
        `Guild ${config.guildId} doesn't belong to corde bot. change the guild id in corde.config or add the bot to a valid guild`,
      );
    } else {
      return this._client.guilds.cache.find((guild) => guild.id === config.guildId);
    }
  }

  private findChannel(guild: Guild, config: ConfigOptions) {
    if (!guild.channels) {
      throw new RuntimeErro(`${guild.name} doesn't have a channel with id ${config.channelId}.`);
    } else if (!guild.channels.cache.has(config.channelId || '')) {
      throw new Error(`${config.channelId} doesn't appear to be a channel of guild ${guild.name}`);
    } else {
      const channel = guild.channels.cache.find((ch) => ch.id === config.channelId);

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

/**
 * Runtime instance of cordeBot, used to send messages to Discord.
 */
const cordeBot = new CordeBot();
export default cordeBot;
