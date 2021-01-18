// TODO: In some tests, when a function from another module is called,
// Corde reader fail in import the test file because Node.js can not
// import the submodule. To avoid the problem, this file is here is root of the project,
// but it should be in ./e2e
// Bug to fix: https://github.com/lucasgmagalhaes/corde/issues/490

import { Client, Message } from "discord.js";
import * as config from "./e2e/corde.config";

export const bot = new Client();

bot.on("message", async (message) => {
  const args = message.content.slice(config.botPrefix.length).trim().split(" ");
  const command = args.shift();
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
  }
});

async function emoji(msg: Message) {
  await msg.react("😄");
}

async function edit(msg: Message) {
  await msg.edit("newValue");
}

async function pin(msg: Message, msgId: string) {
  const messageToPin = await msg.channel.messages.fetch(msgId);
  await messageToPin.pin();
}

async function unPin(msg: Message, msgId: string) {
  const messageToPin = await msg.channel.messages.fetch(msgId);
  await messageToPin.unpin();
}

async function addReaction(msg: Message, msgId: string, reaction: string) {
  const message = await msg.channel.messages.fetch(msgId);
  await message.react(reaction);
}

async function editMessage(msg: Message, msgId: string, msgNewValue: string) {
  const message = await msg.channel.messages.fetch(msgId);
  await message.edit(msgNewValue);
}

async function removeReaction(msg: Message, msgId: string, reaction: string) {
  const message = await msg.channel.messages.fetch(msgId);
  const react = message.reactions.cache.get(reaction);

  if (react) {
    await react.remove();
  }
  console.log("reaction not found");
}

export async function sendMessage(message: string) {
  const channel = bot.channels.cache.get(config.channelId);
  if (channel.isText()) {
    return await channel.send(message);
  }
  return null;
}
