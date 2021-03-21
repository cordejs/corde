// TODO: In some tests, when a function from another module is called,
// Corde reader fail in import the test file because Node.js can not
// import the submodule. To avoid the problem, this file is here is root of the project,
// but it should be in ./e2e
// Bug to fix: https://github.com/lucasgmagalhaes/corde/issues/490
//
// For some reason unknown by god, ts files get error, but js files works ok (???)
// (it's why this is the only file that is js file in this folder)

const { Client, Message } = require("discord.js");
const config = require("./corde.config");

const bot = new Client();

/**
 * @param {string} message
 */
async function sendMessage(message) {
  const channel = bot.channels.cache.get(config.channelId);

  if (channel === undefined) {
    throw new Error("Channelds not loaded");
  }

  if (channel.isText()) {
    return await channel.send(message);
  }
  return null;
}

/**
 * @param {string} name
 */
function getRole(name) {
  return bot.guilds.cache.get(config.guildId).roles.cache.find((r) => r.name === name);
}

function getRoleManager() {
  return bot.guilds.cache.get(config.guildId).roles;
}

/**
 * Use this functions before use sendMessage (add it to **corde.beforeStart**)
 */
async function login() {
  const readyPromise = new Promise((resolve) => {
    bot.once("ready", () => {
      resolve();
    });
  });
  await bot.login(config.botTestToken);
  await readyPromise;
}

bot.on("message", async (message) => {
  try {
    const args = message.content.slice(config.botPrefix.length).trim().split(" ");
    const command = args.shift();
    await handleCommands(message, command, args);
  } catch (error) {
    console.error(error);
    throw new Error("Could not execute operation");
  }
});

/**
 * @param {Message} message
 * @param {string} command
 * @param {string[]} args
 */
async function handleCommands(message, command, args) {
  // TODO: Refact this. '-'
  if (command === "ping") {
    await ping(message);
  }
}

/**
 * @param {Message} msg
 * @param {string} msgId
 */
async function ping(msg) {
  await msg.channel.send("pong");
}

login();
