"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedMsg = exports.loginBot = exports.bot = void 0;
const discord_js_1 = require("discord.js");
const corde_1 = require("../../corde");
const bot = new discord_js_1.Client();
exports.bot = bot;
const embedMsg = new discord_js_1.MessageEmbed()
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
exports.embedMsg = embedMsg;
bot.on("message", async (message) => {
  if (message.content.indexOf("") !== 0) return;
  const args = message.content.slice(corde_1.botPrefix.length).trim().split(" ");
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
  } else if (command === "removelastmessageemoji") {
    await removeLastMessageEmoji(message, args[0], args[1]);
  } else {
    console.log("No command found");
  }
});
function hello(msg) {
  msg.channel.send("hello!!");
}
function hey(msg) {
  msg.channel.send("hey!!");
}
function embed(msg) {
  msg.channel.send(embedMsg);
}
function emoji(msg) {
  msg.react("😄");
}
async function removeLastMessageEmoji(msg, messageId, reaction) {
  try {
    // const msgFound = await msg.channel.messages.fetch(messageId.trim());
    const msgFound = await (await msg.channel.messages.fetch()).find(
      (message) => message.content === messageId,
    );
    msgFound.reactions.cache.get(reaction).remove();
  } catch (error) {
    console.log("Fail: " + error);
  }
}
function emojis(msg) {
  Promise.all([msg.react("😄"), msg.react("🍊")]);
}
function loginBot() {
  bot.login(corde_1.botTestToken);
}
exports.loginBot = loginBot;
