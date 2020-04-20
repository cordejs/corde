import * as Discord from 'discord.js';
import { ConfigOptions } from '../src/config';
import fs from 'fs';

const file = fs.readFileSync('../corde.json').toString();
const config: ConfigOptions = JSON.parse(file);
const client = new Discord.Client();

client.on('message', async (message) => {
  if (message.author.bot) return;
  else if (message.content.indexOf('') !== 0) return;

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

client.login(config.botTestToken);
