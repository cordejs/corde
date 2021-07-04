/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, MessageEmbed } from "discord.js";
const config = require("../corde.config.js");

export const bot = new Client();

/**
 * Use this functions before use sendMessage (add it to **corde.beforeStart**)
 */
export async function login() {
  const readyPromise = new Promise<void>((resolve) => {
    bot.once("ready", () => {});
    resolve();
  });
  await bot.login(config.botToken);
  await readyPromise;
}

bot.on("message", async (message) => {
  try {
    const args = message.content.slice(config.botPrefix.length).trim().split(" ");
    const command = args.shift();
    await handleCommands(message, command);
  } catch (error) {
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
    await ping(message);
  } else if (command === "embed") {
    await embed(message);
  } else if (command === "embedPartial") {
    await embedPartial(message);
  }
}

/**
 * @param {import("discord.js").Message} msg
 */
async function ping(msg) {
  await msg.channel.send("pong");
}

/**
 * @param {import("discord.js").Message} msg
 */
async function embedPartial(msg) {
  await msg.channel.send(
    new MessageEmbed().setDescription("test").setTitle("title").setAuthor("author"),
  );
}

/**
 * @param {import("discord.js").Message} msg
 * @param {string} msgId
 */
async function embed(msg) {
  await msg.channel.send(new MessageEmbed().setDescription("test"));
}
