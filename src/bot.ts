import * as Discord from "discord.js";
import config from "./initializer";
import { commandHandler } from "./concordBot";

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
  commandHandler(msg);
});

concordBot.on(
  "ready",
  async (): Promise<void> => {
    let guild: Discord.Guild;
    let channel: Discord.Channel;

    try {
      if (!concordBot.guilds) {
        throw new Error(
          `Concord bot isn't added in a guild. Please add it to the guild: ${
            config.guildId
          }`
        );
      } else if (!concordBot.guilds.has(config.guildId)) {
        throw new Error(
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
        throw new Error("")
        return;
      }

      console.log("Client bot is ready for tests!");
      channel.send(`Starting tests`);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export async function clientlogin(token: string) {
  return clientBot.login(token);
}

export async function concordlogin(token: string) {
  return concordBot.login(token);
}
