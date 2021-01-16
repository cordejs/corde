import { Client, Message } from "discord.js";
import * as config from "./corde.config";

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

async function removeReaction(msg: Message, msgId: string, reaction: string) {
  const message = await msg.channel.messages.fetch(msgId);
  const react = message.reactions.cache.get(reaction);

  if (react) {
    await react.remove();
  }
  console.log("reaction not found");
}
