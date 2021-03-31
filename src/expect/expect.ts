import { VoidLikeFunction } from "../types";
import { ExpectMatchesWithNot, MatchWithNot } from "./matcher";

/**
 * Invalid declaration of a test matcher.
 *
 * @since 3.0
 */
export function expect(): void;
/**
 * Receives which command will be tested.
 *
 * Do not inform the command prefix if
 * it's already informed in **configs**
 *
 * @param commandNameResolvable Command name. (Empty strings will resolve failed test)
 *
 * @returns An object with all possible tests to be done
 * in the bot.
 *
 * @since 1.0
 */
export function expect<T extends VoidLikeFunction | number | string>(
  commandNameResolvable: T,
): MatchWithNot;
export function expect<T extends VoidLikeFunction | number | string>(
  commandNameResolvable?: T,
): MatchWithNot | void {
  if (commandNameResolvable == null) {
    return;
  }
  return new ExpectMatchesWithNot(commandNameResolvable);
}
