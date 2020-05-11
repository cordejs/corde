import * as Discord from 'discord.js';
import fs from 'fs';

const file = fs.readFileSync('../corde.json').toString();
const config = JSON.parse(file);

export const bot = new Discord.Client();

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

function hello(msg: Discord.Message) {
  msg.channel.send('hello!!');
}

function hey(msg: Discord.Message) {
  msg.channel.send('hey!!');
}

export function loginBot() {
  bot.login(config.botTestToken);
}

loginBot();
