// TODO: In some tests, when a function from another module is called,
// Corde reader fail in import the test file because Node.js can not
// import the submodule. To avoid the problem, this file is here is root of the project,
// but it should be in ./e2e
// Bug to fix: https://github.com/lucasgmagalhaes/corde/issues/490
//
// For some reason unknown by god, ts files get error, but js files works ok (???)
// (it's why this is the only file that is js file in this folder)

import { Client, Message } from "discord.js";
import * as config from "./corde.config";

export const bot = new Client();

/**
 * @param {string} message
 */
export async function sendMessage(message) {
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
export function getRole(name) {
  return bot.guilds.cache.get(config.guildId).roles.cache.find((r) => r.name === name);
}

/**
 * Use this functions before use sendMessage (add it to **corde.beforeStart**)
 */
export async function login() {
  const readyPromise = new Promise((resolve) => {
    bot.on("ready", () => {
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
    handleCommands(message, command, args);
  } catch (error) {
    message.channel.send("Fail in execute command: " + error);
  }
});

/**
 * @param {Message} message
 * @param {string} command
 * @param {string[]} args
 */
async function handleCommands(message, command, args) {
  if (command === "hello" || command === "h") {
    await message.channel.send("Hello!!");
  } else if (command === "emoji") {
    await emoji(message);
  } else if (command === "edit") {
    edit(message);
  } else if (command === "pin") {
    await pin(message, args[0]);
  } else if (command === "addReaction") {
    await addReaction(message, args[0], args[1]);
  } else if (command === "removeReaction") {
    await removeReaction(message, args[0], args[1]);
  } else if (command === "unPin") {
    await unPin(message, args[0]);
  } else if (command === "editMessage") {
    await editMessage(message, args[0], args[1]);
  } else if (command === "renameRole") {
    await renameRole(message, args[0], args[1]);
  } else if (command === "changeRoleColor") {
    await changeRoleColor(message, args[0], args[1]);
  }
}

/**
 * @param {Message} msg
 */
async function emoji(msg) {
  await msg.react("😄");
}

/**
 * @param {Message} msg
 */
async function edit(msg) {
  await msg.edit("newValue");
}

/**
 * @param {Message} msg
 * @param {string} msgId
 */
async function pin(msg, msgId) {
  const messageToPin = await msg.channel.messages.fetch(msgId);
  await messageToPin.pin();
}

/**
 * @param {Message} msg
 * @param {string} msgId
 */
async function unPin(msg, msgId) {
  const messageToPin = await msg.channel.messages.fetch(msgId);
  await messageToPin.unpin();
}

/**
 * @param {Message} msg
 * @param {string} msgId
 * @param {string} reaction
 */
async function addReaction(msg, msgId, reaction) {
  const message = await msg.channel.messages.fetch(msgId);
  await message.react(reaction);
}

/**
 * @param {Message} msg
 * @param {string} msgId
 * @param {string} msgNewValue
 */
async function editMessage(msg, msgId, msgNewValue) {
  const message = await msg.channel.messages.fetch(msgId);
  await message.edit(msgNewValue);
}

/**
 * @param {Message} msg
 * @param {string} msgId
 * @param {string} reaction
 */
async function removeReaction(msg, msgId, reaction) {
  const message = await msg.channel.messages.fetch(msgId);
  const react = message.reactions.cache.get(reaction);

  if (react) {
    await react.remove();
  }
  console.log("reaction not found");
}

/**
 *
 * @param {Message} msg
 * @param {string} roleId
 * @param {string} newName
 */
async function renameRole(msg, roleId, newName) {
  const role = msg.guild.roles.cache.get(roleId);
  await role.setName(newName);
}

/**
 * @param {Message} msg
 * @param {string} roleId
 * @param {string} newColor
 */
async function changeRoleColor(msg, roleId, newColor) {
  const role = msg.guild.roles.cache.get(roleId);
  await role.setColor(newColor);
}
