import chalk from "chalk";
import { buildReportMessage, isNumber, typeOf } from "../utils";
import { AsymmetricMatcher } from "./asymmetricMatcher";

interface IMatcherValues {
  value: any;
  received?: any;
}

export namespace matcherUtils {
  export function isAsymetric(value: any): value is AsymmetricMatcher {
    return value instanceof AsymmetricMatcher;
  }

  export function match(assertFn: () => boolean, values: IMatcherValues, ...anyType: any[]) {
    if (isAsymetric(values.value) && isAsymetric(values.received)) {
      return values.value.matchType(...anyType) && values.received.matchType(...anyType);
    }

    if (isAsymetric(values.value)) {
      return values.value.matchType(...anyType);
    }

    if (isAsymetric(values.received)) {
      return values.received.matchType(...anyType);
    }

    return assertFn();
  }

  export function isAsymetricSpecified(value: any) {
    return isAsymetric(value) && !value.isSpecified();
  }

  export function isAsymetricAny(value: any) {
    return isAsymetric(value) && value.isSpecified();
  }

  export function validateParameterAsNumber(value: any, received: any) {
    if (!matcherUtils.isAsymetric(value) && !isNumber(value)) {
      return {
        pass: false,
        message: buildReportMessage(
          "value value is not a number.\n",
          `received: '${chalk.red(typeOf(value))}'`,
        ),
      };
    }

    if (!matcherUtils.isAsymetric(received) && !isNumber(received)) {
      return {
        pass: false,
        message: buildReportMessage(
          "received value is not a number.\n",
          `received: '${chalk.red(typeOf(received))}'`,
        ),
      };
    }

    return null;
  }
}
