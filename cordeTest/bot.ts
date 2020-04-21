import * as Discord from 'discord.js';
import ConfigOptions from '../src/config';
import fs from 'fs';
import { MessageEmbed } from 'discord.js';

console.log(process.cwd());
const file = fs.readFileSync('..corde.json').toString();

const config: ConfigOptions = JSON.parse(file);
const client = new Discord.Client();

client.on('message', async (message) => {
  if (message.content.indexOf('') !== 0) return;

  const args = message.content.slice(config.botPrefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'hello' || command === 'h') {
    hello(message);
  } else if (command === 'hey') {
    hey(message);
  } else if (command === 'embed') {
    embed(message);
  }
});

function hello(msg: Discord.Message) {
  msg.channel.send('hello!!');
}

function hey(msg: Discord.Message) {
  msg.channel.send('hey!!');
}

function embed(msg: Discord.Message) {
  // Embed example from https://discordjs.guide/popular-topics/embeds.html#embed-preview

  msg.channel.send(exampleEmbed);
}

export const exampleEmbed = new MessageEmbed()
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
  .setImage('https://i.imgur.com/wSTFkRM.png')
  .setTimestamp()
  .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

client.login(config.botTestToken);
