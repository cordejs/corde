const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const config = require('../corde');

const bot = new Discord.Client();

const embedMsg = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Some title')
  .setURL('https://discord.js.org/')
  .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
  .setDescription('Some description here')
  .setThumbnail('https://i.imgur.com/wSTFkRM.png')
  .addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
  )
  .addField('Inline field title', 'Some value here', true)
  .setImage('https://i.imgur.com/wSTFkRM.png');

bot.on('message', async (message) => {
  if (message.content.indexOf('') !== 0) return;

  const args = message.content.slice(config.botPrefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'hello' || command === 'h') {
    hello(message);
  } else if (command === 'hey') {
    hey(message);
  } else if (command === 'embed') {
    embed(message);
  } else if (command === 'emoji') {
    emoji(message);
  } else if (command === 'emojis') {
    emojis(message);
  }
});

function hello(msg) {
  msg.channel.send('hello!!');
}

function hey(msg) {
  msg.channel.send('hey!!');
}

function embed(msg) {
  msg.channel.send(embedMsg);
}

function emoji(msg) {
  msg.react('😄');
}

function emojis(msg) {
  Promise.all([msg.react('😄'), msg.react('🍊')]);
}

function loginBot() {
  bot.login(config.botTestToken);
}

exports.bot = bot;
exports.loginBot = loginBot;
exports.embedMsg = embedMsg;
