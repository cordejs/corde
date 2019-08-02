import * as Discord from "discord.js";
import config from "./initializer";

export const clientBot = new Discord.Client();
export const concordBot = new Discord.Client();

clientBot.on("ready", () => {
  console.log("Concord bot is ready for tests!");
});

// Correspond to the receptor of all messages sent by the users in Discord
concordBot.on("message", async msg => {
  // Ignoring others bots
  if (msg.author.bot) return;
  // Checking if the command has the prefix
  if (!msg.content.startsWith(config.botPrefix, 0)) return;

  config.message = msg;
});

concordBot.on("ready", () => {
  console.log("Client bot is ready for tests!");

  let guild: Discord.Guild;
  let channel;

  if (!concordBot.guilds) {
    throw new Error(
      `Concord bot isn't added in a guild. Please add it to the guild: ${
        config.guildId
      }`
    );
  } else if (!concordBot.guilds.has(config.guildId)) {
    Promise.reject(
      `Guild ${
        config.guildId
      } doesn't belong to concord bot. change the guild id in concord.config or add the bot to a valid guild`
    );
  } else {
    guild = concordBot.guilds.get(config.guildId);
  }

  if (!guild.channels) {
    throw new Error(
      `${guild.name} doesn't have a channel with id ${config.channelId}.`
    );
  } else if (!guild.channels.has(config.channelId)) {
    throw new Error(
      `${config.channelId} doesn't appear to be a channel of guild ${
        guild.name
      }`
    );
  } else {
    channel = guild.channels.get(config.channelId);
  }

  if (!channel) return;

  // Using a type guard to narrow down the correct type
  if (
    !((channel): channel is Discord.TextChannel => channel.type === "text")(
      channel
    )
  ) {
    return;
  }

  channel.send(`Starting tests`);
});

export async function clientlogin(token: string) {
  return clientBot.login(token);
}

export async function concordlogin(token: string) {
  return concordBot.login(token);
}
