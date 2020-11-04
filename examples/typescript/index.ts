/////////////////////////////////////////////////////////////////////////////////////////////////
/////////                THIS EXAMPLE USED  eslachance Discord bot example              /////////
/////////    see in https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3 /////////
/////////////////////////////////////////////////////////////////////////////////////////////////

// Load env variables to tell the bot that must accept other bots messages.
import * as dotenv from "dotenv";
dotenv.config();

import { Client } from "discord.js";

// Here we load the config.json file that contains our token and our prefix values.
// @ts-ignore
import * as config from "./corde";

// Load up the discord.js library
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
export const client = new Client();

// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(
    `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`,
  );
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  if (client.user === null) return;
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("guildCreate", (guild) => {
  // This event triggers when the bot joins a guild.
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`,
  );
  if (client.user === null) return;
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("guildDelete", (guild) => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  if (client.user === null) return;
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("message", async (message) => {
  if (message.content.indexOf("") !== 0) return;
  const args = message.content.slice(config.botPrefix.length).trim().split(" ");
  let command;
  if (args) {
    command = args.shift()?.toLowerCase();
  }

  await message.channel.send("Ping?");
});

export function loginBot() {
  client.login(config.botTestToken);
}
