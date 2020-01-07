import * as Discord from 'discord.js';
import { getConfig } from './init';
import { execFiles } from './shell';
import { IConfigOptions } from './config';
import { ChannelUtil } from './channelUtils';
import { ChannelTypeNotSupportedError, GuildNotFoundError } from './erros';

export const clientBot = new Discord.Client();
export const cordeBot = new Discord.Client();

// Correspond to the receptor of all messages sent by the users in Discord
clientBot.on('message', async msg => {
  // Checking if the command has the prefix
  if (!msg.content.startsWith(getConfig().botPrefix, 0)) {
    return;
  }

  getConfig().message = msg;
  getConfig().handlerFunction(msg);
});

cordeBot.on(
  'ready',
  async (): Promise<void> => {
    let guild: Discord.Guild;
    let channel: Discord.Channel;
    const config = getConfig();
    try {
      guild = findGuild(config);
      channel = findChannel(guild, config);

      // Using a type guard to narrow down the correct type
      if (!ChannelUtil.isTextChannel(channel)) {
        throw new ChannelTypeNotSupportedError('There is no support for voice channel');
      }

      config.channel = ChannelUtil.convertToTextChannel(channel);
      execFiles(config.files);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export async function clientlogin(token: string): Promise<string> {
  return clientBot.login(token);
}

export async function cordelogin(token: string) {
  return cordeBot.login(token);
}

export async function logout() {
  await cordeBot.destroy();
  await clientBot.destroy();
}

function findGuild(config: IConfigOptions): Discord.Guild {
  if (!cordeBot.guilds) {
    throw new Error(
      `corde bot isn't added in a guild. Please add it to the guild: ${config.guildId}`,
    );
  } else if (!cordeBot.guilds.has(config.guildId)) {
    throw new GuildNotFoundError(
      `Guild ${config.guildId} doesn't belong to corde bot. change the guild id in corde.config or add the bot to a valid guild`,
    );
  } else {
    return cordeBot.guilds.get(config.guildId);
  }
}

function findChannel(guild: Discord.Guild, config: IConfigOptions): Discord.Channel {
  if (!guild.channels) {
    throw new GuildNotFoundError(
      `${guild.name} doesn't have a channel with id ${config.channelId}.`,
    );
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
