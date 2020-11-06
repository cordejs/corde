const arg = require("arg");
const { Client, MessageEmbed, Message } = require("discord.js");
const { botPrefix, botTestToken } = require("../../corde.config.js");

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
  // if (message.content.indexOf("") !== 0) return;
  // const args = message.content.slice(botPrefix.length).trim().split(" ");
  // const command = args.shift().toLowerCase();
  // if (command === "hello" || command === "h") {
  //   hello(message);
  // } else if (command === "hey") {
  //   hey(message);
  // } else if (command === "embed") {
  //   embed(message);
  // } else if (command === "emoji") {
  //   emoji(message);
  // } else if (command === "emojis") {
  //   emojis(message);
  // } else if (command === "removemessagereactionbyid") {
  //   await removeMessageReactionById(message, args[0], args[1]);
  // } else if (command === "removemessagereactionbycontent") {
  //   await removeMessageReactionByContent(message, args[0], args[1]);
  // } else if (command === "setrolecolor") {
  //   await changeColorForRole(message, args[0]);
  // } else if (command === "deleterole") {
  //   deleteRole(message, args[0]);
  // } else if (command === "addrole") {
  //   addRole(message, args[0]);
  // } else if (command === "rename-role") {
  //   renameRole(message, args[0], args[1]);
  // } else if (command === "set-role-position") {
  //   setRolePosition(message, args[0], args[1]);
  // } else if (command === "change-role-permission") {
  //   changeRolePermission(message, args[0]);
  // } else if (command === "pin") {
  //   pinMessage(message, args[0]);
  // } else {
  //   console.log("No command found");
  // }

  if (message.content.indexOf("") !== 0) return;
  const command = message.content.slice(botPrefix.length).trim();
  if (command === "ping") {
    message.channel.send("Pong?");
  } else if (command.includes("remove-role")) {
    const roleName = command.split(" ")[1];
    const role = message.guild?.roles.cache.find((r) => r.name === roleName);
    await role?.delete();
  } else if (command.includes("rename-role")) {
    const split = command.split(" ");
    const oldName = split[1];
    const newName = split[2];
    const role = message.guild?.roles.cache.find((r) => r.name === oldName);
    await role.setName(newName);
  } else if (command.includes("change-role-color")) {
    const split = command.split(" ");
    const roleName = split[1];
    const color = split[2];
    const role = message.guild?.roles.cache.find((r) => r.name === roleName);
    await role?.setColor(color);
  } else if (command.includes("change-role-permission")) {
    const split = command.split(" ");
    const roleId = split[1];
    const permission = split[2];
    const role = message.guild?.roles.cache.find((r) => r.id === roleId);
    await role?.setPermissions([permission]);
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

async function removeMessageReactionById(msg, messageId, reaction) {
  try {
    const msgFound = await msg.channel.messages.fetch(messageId.trim());
    msgFound.reactions.cache.get(reaction).remove();
  } catch (error) {
    console.log("Fail: " + error);
  }
}

async function removeMessageReactionByContent(msg, messagecontent, reaction) {
  try {
    const msgFound = (await msg.channel.messages.fetch()).find(
      (message) => message.content === messagecontent,
    );
    msgFound.reactions.cache.get(reaction).remove();
  } catch (error) {
    console.log("Fail: " + error);
  }
}

/**
 * @param {Message} msg
 */
async function changeColorForRole(msg, roleName) {
  await msg.guild.roles.cache.find((r) => r.name === roleName).setColor("BLUE");
}

/**
 * @param {Message} msg
 */
async function deleteRole(msg, roleName) {
  const data = msg.guild.roles.cache.find((r) => r.name === roleName);
  await data.delete();
}

/**
 * @param {Message} msg
 */
async function addRole(msg, roleName) {
  await msg.guild.roles.create({
    data: {
      name: roleName,
    },
  });
}

/**
 * @param {Message} msg
 * @param {string} roleName
 * @param {string} newName
 */
async function renameRole(msg, roleName, newName) {
  const role = msg.guild.roles.cache.find((r) => r.name === roleName);
  await role.setName(newName);
}

function emojis(msg) {
  Promise.all([msg.react("😄"), msg.react("🍊")]);
}

/**
 * @param {Message} msg
 * @param {string} roleName
 * @param {number} newName
 */
async function setRolePosition(msg, roleName, newPosition) {
  const role = msg.guild.roles.cache.find((r) => r.name === roleName);
  await role.setPosition(newPosition);
}

/**
 * @param {Message} msg
 * @param {string} roleId
 */
async function changeRolePermission(msg, roleId) {
  const role = msg.guild.roles.cache.get(roleId);
  await role.setPermissions(["ADMINISTRATOR"]);
}

/**
 * @param {Message} msg
 * @param {string} msgId
 */
async function pinMessage(msg, msgId) {
  await msg.channel.messages.fetch();
  const toPinMessage = msg.channel.messages.cache.get(msgId);
  await toPinMessage.pin();
}

function loginBot() {
  bot.login(botTestToken);
}

module.exports = { bot, loginBot, embedMsg };
