'use strict';
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////                THIS EXAMPLE USED  eslachance Discord bot example              /////////
/////////    see in https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3 /////////
/////////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, '__esModule', { value: true });
exports.loginBot = exports.client = void 0;
// Load env variables to tell the bot that must accept other bots messages.
const dotenv = require('dotenv');
dotenv.config();
const discord_js_1 = require('discord.js');
// Here we load the config.json file that contains our token and our prefix values.
const config = require('./config.json');
// Load up the discord.js library
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
exports.client = new discord_js_1.Client();
// config.token contains the bot's token
// config.prefix contains the message prefix.
exports.client.on('ready', () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(
    `Bot has started, with ${exports.client.users.cache.size} users, in ${exports.client.channels.cache.size} channels of ${exports.client.guilds.cache.size} guilds.`,
  );
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  if (exports.client.user === null) return;
  exports.client.user.setActivity(`Serving ${exports.client.guilds.cache.size} servers`);
});
exports.client.on('guildCreate', (guild) => {
  // This event triggers when the bot joins a guild.
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`,
  );
  if (exports.client.user === null) return;
  exports.client.user.setActivity(`Serving ${exports.client.guilds.cache.size} servers`);
});
exports.client.on('guildDelete', (guild) => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  if (exports.client.user === null) return;
  exports.client.user.setActivity(`Serving ${exports.client.guilds.cache.size} servers`);
});
exports.client.on('message', async (message) => {
  // This event will run on every single message received, from any channel or DM.
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  // You can use environment variables to define if must accept or not bot messages.
  // to only testing propurse, we will accept.
  if (process.env.NODE_ENV !== 'TESTING') {
    if (message.author.bot) return;
  }
  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(config.prefix) !== 0) return;
  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  if (args.shift() === undefined) return;
  const command = args.shift().toLowerCase();
  // Let's go with a few common example commands! Feel free to delete or change those.
  if (command === 'ping') {
    await message.channel.send('Ping?');
  }
});
function loginBot() {
  exports.client.login(config.token);
}
exports.loginBot = loginBot;
