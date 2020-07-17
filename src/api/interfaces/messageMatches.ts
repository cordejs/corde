import { MessageEmbed } from "discord.js";

/**
 * Defines all functions that can be used
 * to check a bot reaction of a command.
 */
export interface MessageMatches {
  /**
   * Defines the message expected to be returned by a
   * command.
   *
   * @param expect A message returned by a bot after invoke a command
   *
   */
  toReturn(expect: string | MessageEmbed): void;
  /**
   * Defines reactions that must be add to command message.
   *
   * @param reaction Single or list of reactions that must be added to an message
   *
   * @see For how to react message -> https://discordjs.guide/popular-topics/reactions.html#reacting-to-messages
   *
   * @example
   *
   *  bot.on('message', async (message) => {
   *    if (command === 'emoji') {
   *       msg.react('😄');
   *    } else if(command === 'emojis') {
   *       Promise.all([msg.react('😄'), msg.react('🍊')]);
   *    }
   *  });
   *
   *  Tests:
   *
   *  expect('emoji').toAddReaction('😄');
   *  expect('emojis').toAddReaction('😄', '🍊');
   */
  toAddReaction(...reaction: string[]): void;
}
