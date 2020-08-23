import { MessageEmbed } from "discord.js";
import { MessageData } from "../../types";

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

  /**
   * Remove a list of reactions from a message.
   *
   * @param reactions Witch reactions will be removed.
   *
   * @param message Values that will be used to find the message. **do not use all filters**, just one.
   * message ID is the main object used to filter, so, if all filters are filled, only ID will be considered.
   *
   * @param cache Defines if the message should be found using the cached messages, or be fetch in Discord API.
   * Not using cache the test should me slower thean using cache. Check
   * [Discord.js Guide Cache](https://discordjs.guide/additional-info/changes-in-v12.html#commonly-used-methods-that-changed)
   */
  toRemoveReactions(reactions: string[], message?: MessageData, cache?: boolean): void;
}
