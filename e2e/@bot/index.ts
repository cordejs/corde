/* eslint-disable no-console */
// Corde reader fail in import the test file because Node.js can not
// import the submodule. To avoid the problem, this file is here is root of the project,
// but it should be in ./e2e
// Bug to fix: https://github.com/cordejs/corde/issues/490
//
// For some reason unknown by god, ts files get error, but js files works ok (???)
// (it's why this is the only file that is js file in this folder)

import { Client, Intents, Message } from "discord.js";
import * as config from "../corde.config";
import * as _commands from "./commands";
import { ICommand } from "./types";

export const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

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
    const guild = bot.guilds.cache.get(config.guildId);
    if (guild) {
      return guild.roles.cache.find((r) => r.name === name);
    }
  }
  return null;
}

export function getRoleManager() {
  if (config.guildId) {
    const guild = bot.guilds.cache.get(config.guildId);
    if (guild) {
      return guild.roles;
    }
  }
  return null;
}

/**
 * Use this functions before use sendMessage (add it to **corde.beforeAll**)
 */
export async function login(isDebugMode?: boolean) {
  if (isDebugMode) {
    bot.on("raw", (...args: any[]) => {
      console.log(args);
    });
  }

  const readyPromise = new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject();
    }, 5000);
    bot.once("ready", () => {
      clearTimeout(timeout);
      resolve();
    });
  });

  const loginPromise = bot.login(config.botToken);
  await Promise.allSettled([loginPromise, readyPromise]);
}

bot.on("messageCreate", async (message) => {
  try {
    if (message.author.id === bot.user?.id) {
      return;
    }

    if (config.botPrefix) {
      const args = message.content.slice(config.botPrefix.length).trim().split(" ");
      const command = args.shift();

      if (!command) {
        console.error("Command can not be undefined");
        return;
      }

      await handleCommands(message, command, args);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Could not execute operation");
  }
});

async function handleCommands(message: Message, command: string, args: string[]) {
  // TODO: Refactor this. '-'

  const con = _commands[command as keyof typeof _commands] as ICommand;
  if (con) {
    return await con.action(message, ...args);
  }
  const errorMessage = "Command not found for: " + command;
  await message.channel.send(errorMessage);
  console.error(errorMessage);
}

export function wait(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
