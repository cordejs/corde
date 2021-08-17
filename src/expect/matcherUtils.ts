import { AsymmetricMatcher } from "./asymmetricMatcher";

interface IMatcherValues {
  expected: any;
  received?: any;
}

export namespace matcherUtils {
  export function isAsymetric(expected: any): expected is AsymmetricMatcher {
    return expected instanceof AsymmetricMatcher;
  }

  export function match(assertFn: () => boolean, values: IMatcherValues, anyType?: any) {
    if (isAsymetric(values.expected)) {
      return values.expected.matchType(anyType);
    }

    if (isAsymetric(values.received)) {
      return values.received.matchType(anyType);
    }

    return assertFn();
  }

  export function isAsymetricSpecified(expected: any) {
    return isAsymetric(expected) && !expected.isSpecified();
  }

  export function isAsymetricAny(expected: any) {
    return isAsymetric(expected) && expected.isSpecified();
  }
}
