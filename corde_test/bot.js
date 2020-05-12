const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.resolve(__dirname, '../corde.json')).toString();
const config = JSON.parse(file);

const bot = new Discord.Client();

bot.on('message', async (message) => {
  if (message.content.indexOf('') !== 0) return;

  const args = message.content.slice(config.botPrefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'hello' || command === 'h') {
    hello(message);
  } else if (command === 'hey') {
    hey(message);
  }
});

/**
 *
 * @param {Discord.Message} msg
 */
function hello(msg) {
  msg.channel.send('hello!!');
}

/**
 *
 * @param {Discord.Message} msg
 */
function hey(msg) {
  msg.channel.send('hey!!');
}

function loginBot() {
  bot.login(config.botTestToken);
}

exports.bot = bot;
exports.loginBot = loginBot;

//loginBot();
