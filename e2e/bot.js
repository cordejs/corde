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

export function getRoleManager() {
  return bot.guilds.cache.get(config.guildId).roles;
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
    await handleCommands(message, command, args);
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
  // TODO: Refact this. '-'
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
  } else if (command === "setRoleHoist") {
    await setRoleHoist(message, args[0]);
  } else if (command === "setRoleMentionable") {
    await setRoleMentionable(message, args[0]);
  } else if (command === "increaseRolePosition") {
    await increaseRolePosition(message, args[0]);
  } else if (command === "setRolePermission") {
    const id = args.shift();
    await setRolePermission(message, id, args);
  } else if (command === "deleteRole") {
    await deleteRole(message, args[0]);
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
  const messageToPin = await fetchMessageById(msg, msgId);
  await messageToPin.pin();
}

/**
 * @param {Message} msg
 * @param {string} msgId
 */
async function unPin(msg, msgId) {
  const messageToPin = await fetchMessageById(msg, msgId);
  await messageToPin.unpin();
}

/**
 * @param {Message} msg
 * @param {string} msgId
 * @param {string} reaction
 */
async function addReaction(msg, msgId, reaction) {
  const message = await fetchMessageById(msg, msgId);
  await message.react(reaction);
}

/**
 * @param {Message} msg
 * @param {string} msgId
 * @param {string} msgNewValue
 */
async function editMessage(msg, msgId, msgNewValue) {
  const message = await fetchMessageById(msg, msgId);
  await message.edit(msgNewValue);
}

/**
 * @param {Message} msg
 * @param {string} msgId
 * @param {string} reaction
 */
async function removeReaction(msg, msgId, reaction) {
  const message = await fetchMessageById(msg, msgId);
  const react = message.reactions.cache.get(reaction);

  if (react) {
    await react.remove();
  }
}

/**
 *
 * @param {Message} msg
 * @param {string} roleId
 * @param {string} newName
 */
async function renameRole(msg, roleId, newName) {
  const role = getRoleById(msg, roleId);
  await role.setName(newName);
}

/**
 * @param {Message} msg
 * @param {string} roleId
 * @param {string} newColor
 */
async function changeRoleColor(msg, roleId, newColor) {
  const role = getRoleById(msg, roleId);
  await role.setColor(newColor);
}

/**
 * @param {Message} msg
 * @param {string} roleId
 */
async function setRoleHoist(msg, roleId) {
  const role = getRoleById(msg, roleId);
  await role.setHoist(true);
}

/**
 * @param {Message} msg
 * @param {string} roleId
 */
async function setRoleMentionable(msg, roleId) {
  const role = getRoleById(msg, roleId);
  await role.setMentionable(true);
}

/**
 * @param {Message} msg
 * @param {string} roleId
 */
async function increaseRolePosition(msg, roleId) {
  const role = getRoleById(msg, roleId);
  await role.setPosition(role.position + 1);
}

/**
 * @param {Message} msg
 * @param {string} roleId
 * @param {any} permissions
 */
async function setRolePermission(msg, roleId, permissions) {
  const role = getRoleById(msg, roleId);
  await role.setPermissions(permissions);
}

/**
 * @param {Message} msg
 * @param {string} roleId
 */
async function deleteRole(msg, roleId) {
  const role = getRoleById(msg, roleId);

  if (!role.deleted) {
    await role.delete();
  }
}

/** --------------------- Utility functions  --------------------- */

/**
 * @param {Message} msg
 * @param {string} roleId
 */
function getRoleById(msg, roleId) {
  const role = msg.guild.roles.cache.get(roleId);

  if (!role) {
    throw new Error(`Role with id ${roleId} was not found`);
  }

  return role;
}

/**
 * @param {Message} msg
 * @param {string} messageId
 */
async function fetchMessageById(msg, messageId) {
  const message = await msg.channel.messages.fetch(messageId);

  if (!message) {
    throw new Error(`Message with id ${messageId} was not found`);
  }

  return message;
}
