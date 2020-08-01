import { Client, MessageEmbed, Message } from "discord.js";
import { botPrefix, botTestToken } from "../../corde";

const bot = new Client();

const embedMsg = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("Some title")
  .setURL("https://discord.js.org/")
  .setAuthor("Some name", "https://i.imgur.com/wSTFkRM.png", "https://discord.js.org")
  .setDescription("Some description here")
  .setThumbnail("https://i.imgur.com/wSTFkRM.png")
  .addFields(
    { name: "Regular field title", value: "Some value here" },
    { name: "\u200B", value: "\u200B" },
    { name: "Inline field title", value: "Some value here", inline: true },
    { name: "Inline field title", value: "Some value here", inline: true },
  )
  .addField("Inline field title", "Some value here", true)
  .setImage("https://i.imgur.com/wSTFkRM.png");

bot.on("message", async (message) => {
  if (message.content.indexOf("") !== 0) return;

  const args = message.content.slice(botPrefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  console.log("args: " + args);
  console.log("command: " + command);
  if (command === "hello" || command === "h") {
    hello(message);
  } else if (command === "hey") {
    hey(message);
  } else if (command === "embed") {
    embed(message);
  } else if (command === "emoji") {
    emoji(message);
  } else if (command === "emojis") {
    emojis(message);
  } else if (command === "removemessagereactionbyid") {
    await removeMessageReactionById(message, args[0], args[1]);
  } else if (command === "removemessagereactionbycontent") {
    await removeMessageReactionByContent(message, args[0], args[1]);
  } else {
    console.log("No command found");
  }
});

function hello(msg: Message) {
  msg.channel.send("hello!!");
}

function hey(msg: Message) {
  msg.channel.send("hey!!");
}

function embed(msg: Message) {
  msg.channel.send(embedMsg);
}

function emoji(msg: Message) {
  msg.react("😄");
}

async function removeMessageReactionById(msg: Message, messageId: string, reaction: string) {
  try {
    const msgFound = await msg.channel.messages.fetch(messageId.trim());
    msgFound.reactions.cache.get(reaction).remove();
  } catch (error) {
    console.log("Fail: " + error);
  }
}

async function removeMessageReactionByContent(
  msg: Message,
  messagecontent: string,
  reaction: string,
) {
  try {
    const msgFound = (await msg.channel.messages.fetch()).find(
      (message) => message.content === messagecontent,
    );
    msgFound.reactions.cache.get(reaction).remove();
  } catch (error) {
    console.log("Fail: " + error);
  }
}

function emojis(msg: Message) {
  Promise.all([msg.react("😄"), msg.react("🍊")]);
}

function loginBot() {
  bot.login(botTestToken);
}

export { bot, loginBot, embedMsg };
