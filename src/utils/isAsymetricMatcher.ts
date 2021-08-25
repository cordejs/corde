import { AsymmetricMatcher } from "../expect/asymmetricMatcher";

/**
 * @internal
 */
export function isAsymetricMatcher(value: any): value is AsymmetricMatcher {
  return value instanceof AsymmetricMatcher;
}
