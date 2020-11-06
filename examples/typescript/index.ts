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
import * as config from "./corde.config";

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
  const command = message.content.slice(config.botPrefix.length).trim();
  if (command === "ping") {
    message.channel.send("Pong?");
  } else if (command.includes("remove-role")) {
    const roleName = command.split(" ")[1];
    const role = message.guild?.roles.cache.find((r) => r.name === roleName);
    await role?.delete();
  }
});

export function loginBot() {
  client.login(config.botTestToken);
}
