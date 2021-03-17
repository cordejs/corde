import { ExpectMatchesWithNot, MatchWithNot } from "./matcher";

/**
 * Receives wich command will be tested.
 *
 * @param commandName Command name.
 *
 * @description Do not inform the command prefix if
 * it's already informed in **configs**
 *
 * @returns The **Compare** object, where will handle
 * the type of response is expected.
 *
 * @throws if `commandName` be object or any other type different than
 * the defined.
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
