import { MatchesWithNot } from '../models';
import { matcherWithNot } from './matcher';

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
export function command(commandName: string): MatchesWithNot {
  return matcherWithNot(commandName);
}
