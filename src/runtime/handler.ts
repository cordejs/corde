import * as Discord from 'discord.js';
import { getConfig } from '../init';

/**
 * Setup the function handler.
 *
 * @param handlerFunction Function who will handle Discord's messages and will
 * redirect to the desired function.
 *
 * @example
 *
 * function commandHandler(msg: Discord.Message) {
 * const args = msg.content
 *   .slice(getConfig().botPrefix.length)
 *   .trim()
 *   .split(/ +/g);
 *
 *  const command = args[0].toLowerCase();
 *
 *  if (command === "hello" || command === "h") {
 *    msg.channel.send("hello!!");
 *  } else if (command === "hey") {
 *    msg.channel.send("hey!!");
 *  }
 * }
 *
 */
export function handler(handlerFunction: (msg: Discord.Message) => void) {
  if (!handlerFunction) {
    throw new Error('Missing handler function');
  }

  getConfig().handlerFunction = handlerFunction;
}
