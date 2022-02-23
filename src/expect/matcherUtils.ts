import chalk from "chalk";
import { ITestProps } from "../types";
import { asymmetricTypeOf } from "../utils/asymmetricTypeOf";
import { buildReportMessage } from "../utils/buildReportMessage";
import { isNumber } from "../utils/isNumber";
import { isString } from "../utils/isString";
import { typeOf } from "../utils/typeOf";
import { AsymmetricMatcher } from "./asymmetricMatcher";

interface IParamWithValidAsymmetric {
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
  export function isAsymmetric(value: any): value is AsymmetricMatcher {
    return value instanceof AsymmetricMatcher;
  }

  export function match(
    assertFn: () => boolean,
    ...valuesWithParameters: IParamWithValidAsymmetric[]
  ) {
    const asymmetricParams = valuesWithParameters.filter((param) => isAsymmetric(param.value));
    if (asymmetricParams.length > 0) {
      return asymmetricParams.every((param) => {
        const paramValue = param.value as AsymmetricMatcher;
        return paramValue.matchType(...(param.validParameters ?? []));
      });
    }
    return assertFn();
  }

  export function matchValues(testFn: () => boolean, expected: any, received: any) {
    if (isAsymmetric(expected) && matcherUtils.isAsymmetric(received)) {
      return expected.matchType(...received.getTypes());
    }

    if (isAsymmetric(expected)) {
      return expected.matchValue(received);
    }

    if (isAsymmetric(received)) {
      return received.matchValue(expected);
    }

    return testFn();
  }

  export function isAsymmetricSpecified(value: any) {
    return isAsymmetric(value) && !value.isSpecified();
  }

  export function isAsymmetricAny(value: any) {
    return isAsymmetric(value) && value.isSpecified();
  }

  export function validateParameterAsNumber(value: any, received: any) {
    if (!matcherUtils.isAsymmetric(value) && !isNumber(value)) {
      return {
        pass: false,
        message: buildReportMessage(
          "value is not a number.\n",
          `received: '${chalk.red(typeOf(value))}'`,
        ),
      };
    }

    if (!matcherUtils.isAsymmetric(received) && !isNumber(received)) {
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

  export function getMessageForParametersExpectedToBeStrings(
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
      return matcherUtils.getMessageForParametersExpectedToBeStrings(props, expected, value);
    }
  }
}
