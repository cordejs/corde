import chalk from "chalk";
import { buildReportMessage, isNumber, typeOf } from "../utils";
import { AsymmetricMatcher } from "./asymmetricMatcher";

interface IParamWithValidAsymetrics {
  value: any;
  validParameters?: any[];
}

export namespace matcherUtils {
  export function isAsymetric(value: any): value is AsymmetricMatcher {
    return value instanceof AsymmetricMatcher;
  }

  export function match(
    assertFn: () => boolean,
    ...valuesWithParameters: IParamWithValidAsymetrics[]
  ) {
    const asymetricParams = valuesWithParameters.filter((param) => isAsymetric(param.value));
    if (asymetricParams.length > 0) {
      return asymetricParams.every((param) =>
        (param.value as AsymmetricMatcher).matchType(...(param.validParameters ?? [])),
      );
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
          "value is not a number.\n",
          `received: '${chalk.red(typeOf(value))}'`,
        ),
      };
    }

    if (!matcherUtils.isAsymetric(received) && !isNumber(received)) {
      return {
        pass: false,
        message: buildReportMessage(
          "received is not a number.\n",
          `received: '${chalk.red(typeOf(received))}'`,
        ),
      };
    }

    return null;
  }
}
