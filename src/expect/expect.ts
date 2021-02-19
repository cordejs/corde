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
 * @since 1.0
 */
export function expect(commandName: string): MatchWithNot {
  return new ExpectMatchesWithNot(commandName);
}
