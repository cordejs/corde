"use strict";
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////                THIS EXAMPLE USED  eslachance Discord bot example              /////////
/////////    see in https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3 /////////
/////////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginBot = exports.client = void 0;
// Load env variables to tell the bot that must accept other bots messages.
const dotenv = require("dotenv");
dotenv.config();
const discord_js_1 = require("discord.js");
// Here we load the config.json file that contains our token and our prefix values.
// @ts-ignore
const config = require("./corde");
// Load up the discord.js library
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
exports.client = new discord_js_1.Client();
// config.token contains the bot's token
// config.prefix contains the message prefix.
exports.client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(
    `Bot has started, with ${exports.client.users.cache.size} users, in ${exports.client.channels.cache.size} channels of ${exports.client.guilds.cache.size} guilds.`,
  );
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  if (exports.client.user === null) return;
  exports.client.user.setActivity(`Serving ${exports.client.guilds.cache.size} servers`);
});
exports.client.on("guildCreate", (guild) => {
  // This event triggers when the bot joins a guild.
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`,
  );
  if (exports.client.user === null) return;
  exports.client.user.setActivity(`Serving ${exports.client.guilds.cache.size} servers`);
});
exports.client.on("guildDelete", (guild) => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  if (exports.client.user === null) return;
  exports.client.user.setActivity(`Serving ${exports.client.guilds.cache.size} servers`);
});
exports.client.on("message", async (message) => {
  var _a;
  if (message.content.indexOf("") !== 0) return;
  const args = message.content.slice(config.botPrefix.length).trim().split(" ");
  let command;
  if (args) {
    command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
  }
  await message.channel.send("Ping?");
});
function loginBot() {
  exports.client.login(config.botTestToken);
}
exports.loginBot = loginBot;
