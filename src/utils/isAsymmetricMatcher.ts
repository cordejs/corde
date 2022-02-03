import { AsymmetricMatcher } from "../expect/asymmetricMatcher";

/**
 * @internal
 */
export function isAsymmetricMatcher(value: any): value is AsymmetricMatcher {
  return value instanceof AsymmetricMatcher;
}
