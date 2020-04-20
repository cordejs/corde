import * as Discord from 'discord.js';
import { GlobalSettings } from './global';
import { ConfigOptions } from './config';
import { RuntimeErro } from './errors';
import { executeTestCases } from './runner';
import { outPutResult } from './reporter';

export const clientBot = new Discord.Client();
export const cordeBot = new Discord.Client();

cordeBot.once(
  'ready',
  async (): Promise<void> => {
    let guild: Discord.Guild;
    let channel: Discord.Channel;
    const config = getConfig();
    try {
      guild = findGuild(config);
      channel = findChannel(guild, config);

      // Using a type guard to narrow down the correct type
      if (!isTextChannel(channel)) {
        throw new RuntimeErro('There is no support for voice channel');
      }

      config.channel = convertToTextChannel(channel);
      await executeTestCases(GlobalSettings.tests);
      outPutResult(GlobalSettings.tests);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      logout();
    }
  },
);

export async function clientlogin(token: string) {
  return clientBot.login(token);
}

export async function cordelogin(token: string) {
  return cordeBot.login(token);
}

export async function logout() {
  await cordeBot.destroy();
  await clientBot.destroy();
}

export async function sendMessage(message: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const config = getConfig();
    validateEntryData(config, message);
    const toSend = config.botPrefix + this.input;
    await config.channel.send(toSend);

    try {
      const answer = await config.channel.awaitMessages(
        (responseName) => responseName.author.id === config.botTestId,
        {
          max: 1,
          time: config.timeOut ? config.timeOut : 5000,
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

function validateEntryData(config: ConfigOptions, message: string) {
  if (message === undefined) {
    console.log('No testes were declared');
    process.exit(1);
  } else if (config.channel === undefined) {
    throw new Error('Channel not found');
  }
}

function isCommandValid(msg: Discord.Message) {
  return !msg.content.startsWith(getConfigPrefix(), 0);
}

function getConfigPrefix() {
  return GlobalSettings.config.botPrefix;
}

function getConfig() {
  return GlobalSettings.config;
}

function findGuild(config: ConfigOptions) {
  if (!cordeBot.guilds) {
    throw new Error(
      `corde bot isn't added in a guild. Please add it to the guild: ${config.guildId}`,
    );
  } else if (!cordeBot.guilds.has(config.guildId)) {
    throw new RuntimeErro(
      `Guild ${config.guildId} doesn't belong to corde bot. change the guild id in corde.config or add the bot to a valid guild`,
    );
  } else {
    return cordeBot.guilds.get(config.guildId);
  }
}

function findChannel(guild: Discord.Guild, config: ConfigOptions) {
  if (!guild.channels) {
    throw new RuntimeErro(`${guild.name} doesn't have a channel with id ${config.channelId}.`);
  } else if (!guild.channels.has(config.channelId || '')) {
    throw new Error(`${config.channelId} doesn't appear to be a channel of guild ${guild.name}`);
  } else {
    const channel = guild.channels.get(config.channelId || '');

    if (channel === undefined) {
      throw new Error('There is no informed channel to start tests');
    }

    return channel;
  }
}

function convertToTextChannel(channel: Discord.Channel): Discord.TextChannel {
  return channel as Discord.TextChannel;
}

function isTextChannel(channel: Discord.Channel): boolean {
  return ((channel): channel is Discord.TextChannel => channel.type === 'text')(channel);
}
