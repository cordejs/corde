import { Guild, Channel, Client, Message, TextChannel } from 'discord.js';
import runtime, { ConfigOptions } from './runtime';
import { RuntimeErro } from './errors';

class CordeBot extends Client {
  getChannelForTests() {
    const guild = this.findGuild(runtime);
    const channel = this.findChannel(guild, runtime);
    return this.convertToTextChannel(channel);
  }

  async cordelogin(token: string) {
    try {
      return cordeBot.login(token);
    } catch (error) {
      return Promise.reject(this.buildLoginErroMessage(token, error));
    }
  }

  logout() {
    cordeBot.destroy();
  }

  async sendMessage(message: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.validateEntryData(runtime, message);
      const formatedMessage = runtime.botPrefix + message;
      await runtime.sendMessageToChannel(formatedMessage);

      try {
        const answer = await runtime.channel.awaitMessages(
          (responseName) => responseName.author.id === runtime.botTestId,
          {
            max: 1,
            time: runtime.timeOut ? runtime.timeOut : 5000,
            errors: ['time'],
          },
        );

        const content = answer.first().content;
        resolve(content);
      } catch (error) {
        reject('Test timeout');
      }
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
    if (!cordeBot.guilds) {
      throw new Error(
        `corde bot isn't added in a guild. Please add it to the guild: ${config.guildId}`,
      );
    } else if (!cordeBot.guilds.cache.has(config.guildId)) {
      throw new RuntimeErro(
        `Guild ${config.guildId} doesn't belong to corde bot. change the guild id in corde.config or add the bot to a valid guild`,
      );
    } else {
      return cordeBot.guilds.cache.find((guild) => guild.id === config.guildId);
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

cordeBot.once('ready', () => {
  // emit to engine that corde bot is connected.
  runtime.cordeBotHasStarted.next(true);
});

export default cordeBot;
