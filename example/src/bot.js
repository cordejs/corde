/* eslint-disable @typescript-eslint/no-var-requires */
import { Client } from "discord.js";
//const { Client } = require("discord.js");
import { botToken, botPrefix } from "../corde.config.js";

const bot = new Client();

/**
 * Use this functions before use sendMessage (add it to **corde.beforeAll**)
 */
async function login() {
  const readyPromise = new Promise((resolve) => {
    bot.once("ready", () => {
      resolve();
    });
  });
  await bot.login(botToken);
  await readyPromise;
}

bot.on("message", async (message) => {
  try {
    const args = message.content.slice(botPrefix.length).trim().split(" ");
    const command = args.shift();
    await handleCommands(message, command, args);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error("Could not execute operation");
  }
});

/**
 * @param {Message} message
 * @param {string} command
 */
async function handleCommands(message, command) {
  if (command === "ping") {
    return ping(message);
  }

  if (command == "giphy") {
    return giphy(message);
  }
}

/**
 * @param {Message} msg
 * @param {string} msgId
 */
function ping(msg) {
  return msg.channel.send("pong");
}

/**
 *
 * @param {import("discord.js").Message} msg
 * @returns
 */
function giphy(msg) {
  return msg.channel.send("");
}

login();
