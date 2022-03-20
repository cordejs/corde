/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, Intents, Message } from "discord.js";
import * as config from "../corde.config";

export const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

/**
 * Use this functions before use sendMessage (add it to **corde.beforeAll**)
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
    const args = message.content.slice(config?.botPrefix?.length).trim().split(" ");
    const command = args.shift();
    await handleCommands(message, command);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error("Could not execute operation");
  }
});

async function handleCommands(message: Message, command?: string) {
  if (command === "ping") {
    await ping(message);
  } else if (command === "embed") {
    await embed(message);
  } else if (command === "embedPartial") {
    await embedPartial(message);
  }
}

async function ping(msg: Message) {
  await msg.channel.send("pong");
}

async function embedPartial(msg: Message) {
  await msg.channel.send({
    embeds: [
      {
        title: "abc",
      },
    ],
  });
}

async function embed(msg: Message) {
  await msg.channel.send({
    embeds: [
      {
        description: "abc",
      },
    ],
  });
}
