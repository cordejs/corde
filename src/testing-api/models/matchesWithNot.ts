import { Matches } from './matches';

/**
 * Defines the initial value of expectations from
 * **command** function. It includes all matches and
 * the *not* statement. Witch will deny the executed match
 *
 */
export interface MatchesWithNot extends Matches {
  /**
   * Defines that a command should **not** do something.
   * Use this if you are can not precise what response a command will throw,
   * But know and responde it **can not** throw.
   */
  not: Matches;
}
