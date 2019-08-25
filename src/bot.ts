import * as Discord from "discord.js";
import { commandHandler } from "./concordBot";
import { getConfig } from "./init";
import { runTest } from "./shell";

export const clientBot = new Discord.Client();
export const concordBot = new Discord.Client();

clientBot.on("ready", () => {
  //console.log("Concord bot is ready for tests!");
});

// Correspond to the receptor of all messages sent by the users in Discord
concordBot.on("message", async (msg) => {

  // Checking if the command has the prefix
  if (!msg.content.startsWith(getConfig().botPrefix, 0)) { return; }

  getConfig().message = msg;
  commandHandler(msg);
});

concordBot.on(
  "ready",
  async (): Promise<void> => {
    let guild: Discord.Guild;
    let channel: Discord.Channel;
    const config = getConfig();
    try {
      if (!concordBot.guilds) {
        throw new Error(
          `Concord bot isn't added in a guild. Please add it to the guild: ${
          config.guildId
          }`,
        );
      } else if (!concordBot.guilds.has(config.guildId)) {
        throw new Error(
          `Guild ${
          config.guildId
          } doesn't belong to concord bot. change the guild id in concord.config or add the bot to a valid guild`,
        );
      } else {
        guild = concordBot.guilds.get(config.guildId) || null;
      }

      if (!guild.channels) {
        throw new Error(
          `${guild.name} doesn't have a channel with id ${config.channelId}.`,
        );
      } else if (!guild.channels.has(config.channelId || "")) {
        throw new Error(
          `${config.channelId} doesn't appear to be a channel of guild ${
          guild.name
          }`,
        );
      } else {
        channel = guild.channels.get(config.channelId || "");
      }

      if (channel === undefined) {
        throw new Error("There is no informed channel to start tests");
      }

      // Using a type guard to narrow down the correct type
      if (
        !((channel): channel is Discord.TextChannel => channel.type === "text")(
          channel,
        )
      ) {
        throw new Error("There is no support for voice channel");
      }

      //console.log("Client bot is ready for tests!");
      await channel.send(`Starting tests`);
      config.channel = channel;
      runTest(config.files);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export async function clientlogin(token: string) {
  return clientBot.login(token);
}

export async function concordlogin(token: string) {
  return concordBot.login(token);
}

export async function logout() {
  await concordBot.destroy();
  await clientBot.destroy();
}
