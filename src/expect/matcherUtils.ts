import { AsymmetricMatcher } from "./asymmetricMatcher";

export namespace matcherUtils {
  export function match(assertFn: () => boolean, expected: any, anyType?: any) {
    if (expected instanceof AsymmetricMatcher) {
      return expected.matchType(anyType);
    } else {
      return assertFn();
    }
  }
}
