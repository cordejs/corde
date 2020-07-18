import { expectMatchWithNot, MatchesWithNot } from "./matcher";

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
 */
export function expect(commandName: string): MatchesWithNot {
  return expectMatchWithNot(commandName);
}
