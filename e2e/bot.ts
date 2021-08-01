/* eslint-disable no-console */
// TODO: In some tests, when a function from another module is called,
// Corde reader fail in import the test file because Node.js can not
// import the submodule. To avoid the problem, this file is here is root of the project,
// but it should be in ./e2e
// Bug to fix: https://github.com/cordejs/corde/issues/490
//
// For some reason unknown by god, ts files get error, but js files works ok (???)
// (it's why this is the only file that is js file in this folder)

import { Client, Message } from "discord.js";
import * as config from "./corde.config";

export const bot = new Client();

export async function sendMessage(message: string) {
  if (!config.channelId) {
    return null;
  }
  const channel = bot.channels.cache.get(config.channelId);

  if (channel === undefined) {
    throw new Error("Channels not loaded");
  }

  if (channel.isText()) {
    return await channel.send(message);
  }
  return null;
}

/**
 * @param {string} name
 */
export function getRole(name: string) {
  if (config.guildId) {
    return bot.guilds.cache.get(config.guildId)?.roles.cache.find((r) => r.name === name);
  }
  return null;
}

export function getRoleManager() {
  if (config.guildId) {
    return bot.guilds.cache.get(config.guildId)?.roles;
  }
  return null;
}

/**
 * Use this functions before use sendMessage (add it to **corde.beforeStart**)
 */
export async function login(isDebugMode?: boolean) {
  if (isDebugMode) {
    bot.on("raw", (...args: any[]) => {
      console.log(args);
    });
  }

  const readyPromise = new Promise<void>((resolve) => {
    bot.once("ready", () => {
      resolve();
    });
  });
  const loginPromise = bot.login(config.botToken);
  await Promise.allSettled([loginPromise, readyPromise]);
}

bot.on("message", async (message) => {
  try {
    if (config.botPrefix) {
      const args = message.content.slice(config.botPrefix.length).trim().split(" ");
      const command = args.shift();
      await handleCommands(message, command, args);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Could not execute operation");
  }
});

async function handleCommands(message: Message, command: string | undefined, args: string[]) {
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
  } else if (command === "sendMultiple") {
    await sendMultiple(message, args[0]);
  }
}

async function emoji(msg: Message) {
  await msg.react("😄");
}

async function edit(msg: Message) {
  if (msg) {
    await msg.edit("newValue");
  }
}

async function pin(msg: Message, msgId: string) {
  const messageToPin = await fetchMessageById(msg, msgId);
  if (messageToPin) {
    await messageToPin.pin();
  }
}

async function unPin(msg: Message, msgId: string) {
  const messageToPin = await fetchMessageById(msg, msgId);
  if (messageToPin) {
    await messageToPin.unpin();
  }
}

async function addReaction(msg: Message, msgId: string, reaction: string) {
  const message = await fetchMessageById(msg, msgId);
  if (message) {
    await message.react(reaction);
  }
}

async function editMessage(msg: Message, msgId: string, msgNewValue: string) {
  const message = await fetchMessageById(msg, msgId);
  if (message) {
    await message.edit(msgNewValue);
  }
}

async function removeReaction(msg: Message, msgId: string | undefined, reaction: string) {
  const message = await fetchMessageById(msg, msgId);

  if (!message) {
    return;
  }

  const react = message.reactions.cache.get(reaction);

  if (react) {
    await react.remove();
  }
}

async function renameRole(msg: Message, roleId: string, newName: string | undefined) {
  if (!newName) {
    return;
  }

  const role = getRoleById(msg, roleId);
  if (role) {
    await role.setName(newName);
  }
}

async function changeRoleColor(msg: Message, roleId: string, newColor: string | undefined) {
  if (!newColor) {
    return;
  }
  const role = getRoleById(msg, roleId);
  if (role) {
    await role.setColor(newColor);
  }
}

/**
 * @param {Message} msg
 * @param {string} roleId
 */
async function setRoleHoist(msg: Message, roleId: string | undefined) {
  const role = getRoleById(msg, roleId);
  if (role) {
    await role.setHoist(true);
  }
}

/**
 * @param {Message} msg
 * @param {string} roleId
 */
async function setRoleMentionable(msg: Message, roleId: string | undefined) {
  const role = getRoleById(msg, roleId);
  if (role) {
    await role.setMentionable(true);
  }
}

async function increaseRolePosition(msg: Message, roleId: string | undefined) {
  const role = getRoleById(msg, roleId);
  if (role) {
    await role.setPosition(role.position + 1);
  }
}

async function setRolePermission(msg: Message, roleId: string | undefined, permissions: any) {
  const role = getRoleById(msg, roleId);
  if (role) {
    await role.setPermissions(permissions);
  }
}

/**
 * @param {Message} msg
 * @param {string} roleId
 */
async function deleteRole(msg: Message, roleId: string) {
  const role = getRoleById(msg, roleId);

  if (role && !role.deleted) {
    await role.delete();
  }
}

async function sendMultiple(msg: Message, channelId: string) {
  await msg.channel.send("hello");
  const channel = msg.guild?.channels.cache.get(channelId);
  if (channel && channel.isText()) {
    await channel.send("hello2");
  }
}

/** --------------------- Utility functions  --------------------- */

function getRoleById(msg: Message, roleId: string | undefined) {
  if (msg && roleId) {
    return msg.guild?.roles.cache.get(roleId);
  }
  return null;
}

async function fetchMessageById(msg: Message, messageId: string | undefined) {
  if (!messageId) {
    return null;
  }

  try {
    return await msg.channel.messages.fetch(messageId);
  } catch (error) {
    console.log("message not found");
    return null;
  }
}
