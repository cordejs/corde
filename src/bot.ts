import { Guild, Channel, Client, Message, TextChannel } from 'discord.js';
import runtime, { ConfigOptions } from './runtime';
import { RuntimeErro } from './errors';

export const cordeBot = new Client();

cordeBot.once('ready', () => {
  // emit to engine that corde bot is connected.
  runtime.cordeBotHasStarted.next(true);
});

export function getChannelForTests() {
  const guild = findGuild(runtime);
  const channel = findChannel(guild, runtime);
  return convertToTextChannel(channel);
}

export async function cordelogin(token: string) {
  try {
    return cordeBot.login(token);
  } catch (error) {
    return Promise.reject(buildLoginErroMessage(token, error));
  }
}

export function logout() {
  cordeBot.destroy();
}

export async function sendMessage(message: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    validateEntryData(runtime, message);
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

function buildLoginErroMessage(token: string, error: object) {
  return `Error trying to login with token ${token}. \n` + error;
}

function validateEntryData(config: ConfigOptions, message: string) {
  if (message === undefined) {
    console.log('No testes were declared');
    process.exit(1);
  } else if (config.channel === undefined) {
    throw new Error('Channel not found');
  }
}

function isCommandValid(msg: Message) {
  return !msg.content.startsWith(runtime.botPrefix, 0);
}

function findGuild(config: ConfigOptions) {
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

function findChannel(guild: Guild, config: ConfigOptions) {
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

function convertToTextChannel(channel: Channel): TextChannel {
  return channel as TextChannel;
}

function isTextChannel(channel: Channel): boolean {
  return ((channel): channel is TextChannel => channel.type === 'text')(channel);
}
