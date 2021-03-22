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
 * @example
 *
 * expect("ping")
 * expect(1)
 * expect(true)
 * expect(() => "ping")
 * expect(() => 1)
 * expect(() => false)
 * expect(() => Promise.resolve("ping"))
 * expect(() => Promise.resolve(1))
 * expect(() => Promise.resolve(false))
 *
 * @since 1.0
 */
export function expect<T extends any>(commandName: T): MatchWithNot {
  return new ExpectMatchesWithNot(commandName);
}
