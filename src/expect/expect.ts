import { ExpectMatchesWithNot, MatchWithNot } from "./matcher";

/**
 * Receives wich command will be tested.
 *
 * Do not inform the command prefix if
 * it's already informed in **configs**
 *
 * @param commandName Command name.
 *
 * @returns An object with all possible tests to be done
 * in the bot.
 *
 * @since 1.0
 */
export function expect(commandName: string): MatchWithNot;
export function expect(commandName: number): MatchWithNot;
export function expect(commandName: boolean): MatchWithNot;
export function expect(commandName: () => any): MatchWithNot;
export function expect(commandName: string | number | boolean | (() => any)): MatchWithNot {
  return new ExpectMatchesWithNot(commandName);
}
