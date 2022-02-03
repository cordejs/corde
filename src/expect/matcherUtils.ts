import chalk from "chalk";
import { ITestProps } from "../types";
import { asymmetricTypeOf, buildReportMessage, isNumber, isString, typeOf } from "../utils";
import { AsymmetricMatcher } from "./asymmetricMatcher";

interface IParamWithValidAsymetrics {
  value: any;
  validParameters?: any[];
}

interface IStringTestParameters {
  props: ITestProps;
  expected: any;
  value: any;
  isNotText: string;
  expectationText: string;
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
      return asymetricParams.every((param) => {
        const paramValue = param.value as AsymmetricMatcher;
        return paramValue.matchType(...(param.validParameters ?? []));
      });
    }
    return assertFn();
  }

  export function matchValues(testFn: () => boolean, expected: any, received: any) {
    if (isAsymetric(expected) && matcherUtils.isAsymetric(received)) {
      return expected.matchType(...received.getTypes());
    }

    if (isAsymetric(expected)) {
      return expected.matchValue(received);
    }

    if (isAsymetric(received)) {
      return received.matchValue(expected);
    }

    return testFn();
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

  export function getMessageForParamatersExpectedToBeStrings(
    props: ITestProps,
    expected: any,
    value: any,
  ) {
    let message = "";
    message = `${props.expectedColorFn("expected")} and ${props.expectedColorFn(
      "value",
    )} should both be a string.\n`;
    message += `got: ${chalk.green(asymmetricTypeOf(expected))} and ${chalk.red(
      asymmetricTypeOf(value),
    )} respectively`;
    return message;
  }

  export function getFailMessageForStringsLengthTest({
    props,
    expected,
    value,
    isNotText,
    expectationText,
  }: IStringTestParameters) {
    if (isString(expected) && typeof isString(value)) {
      return `expected '${chalk.green(expected)}' to${isNotText} ${expectationText} '${chalk.red(
        value,
      )}'`;
    } else {
      return matcherUtils.getMessageForParamatersExpectedToBeStrings(props, expected, value);
    }
  }
}
