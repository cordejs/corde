/* eslint-disable no-console */
import chalk from "chalk";
import { runtime } from "../common/runtime";
import { ITestProps, ITestReport } from "../types";
import { corde } from "../types/globals";
import { getStackTrace, typeOf } from "../utils";
import { any } from "./asymmetricMatcher";
import * as matchers from "./matchers";

interface IMatcher {
  (props: ITestProps, ...args: any[]): ITestReport;
}

type KeyOfMatcher = keyof typeof matchers;

function pickFn(name: KeyOfMatcher) {
  return matchers[name] as any as IMatcher;
}

function createMatcherFn(matcher: string, isNot: boolean, expected: any, isDebug: boolean) {
  return (...args: any[]): ITestReport | void => {
    // If someone pass expect.any, we must invoke it to return
    // the Any matcher.

    if (expected === any) {
      args = [expected(), ...args];
    } else {
      args = [expected, ...args];
    }

    args = args.map((arg) => {
      if (arg === any) {
        return arg();
      }
      return arg;
    });

    const trace = getStackTrace(undefined, true, matcher);
    try {
      const matcherFn = pickFn(matcher as KeyOfMatcher);

      const props: ITestProps = {
        isNot,
        expectedColorFn: chalk.bold,
        receivedColorFn: chalk.bold,
        createHint: (...paramsName: string[]) => {
          return `expect(${chalk.green("expected")}).${isNot ? "not." : ""}${matcher}(${paramsName
            .map((param) => chalk.red(param))
            .join(",")})`;
        },
        formatValue: (value: any) => {
          if (typeof value === "symbol") {
            return value.toString();
          }

          if (typeOf(value) === "object") {
            if (Object.keys(value).length === 0) {
              return "{}";
            }

            return "{ ... }";
          }

          if (
            typeof value === "string" &&
            (value.length === 0 || (!value.startsWith("'") && !value.endsWith("'")))
          ) {
            return `'${value}'`;
          }

          if (Array.isArray(value)) {
            if (value.length > 0) {
              return "[...]";
            }
            return "[]";
          }

          return value;
        },
      };

      const report = matcherFn.bind(props, ...args)();
      if (!report.pass) {
        report.trace = trace;
      }

      runtime.internalEvents.emit("test_end", report);

      if (isDebug) {
        return report;
      }
    } catch (error) {
      const failedReport: ITestReport = {
        pass: false,
        message: handleError(error),
        trace: trace,
      };
      runtime.internalEvents.emit("test_end", failedReport);
      if (isDebug) {
        return failedReport;
      }
    }
  };
}

function handleError(error: any) {
  if (error instanceof Error) {
    return error.message;
  }
  return error;
}

function createLocalExpect(isDebug: boolean) {
  let localExpect: any = {};

  localExpect = (expected: any) => {
    const _expect: any = {};
    _expect.not = {};
    Object.getOwnPropertyNames(matchers).forEach((matcher) => {
      _expect[matcher] = createMatcherFn(matcher, false, expected, isDebug);
      _expect.not[matcher] = createMatcherFn(matcher, true, expected, isDebug);
    });
    return _expect;
  };

  localExpect.any = any;

  return localExpect;
}

export const expect = createLocalExpect(false) as corde.IExpect;

type DebugExpectType<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? (...params: Parameters<T[P]>) => { pass: boolean; message: string }
    : DebugExpectType<T[P]>;
};

export interface IDebugExpect {
  <T extends any>(value: T): DebugExpectType<corde.IMatchersWithNot<T>>;
  any(...classType: any[]): any;
}

/**
 * Testing object for corde
 * This is not used in production
 *
 * @internal
 */
export const cordeExpect = createLocalExpect(true) as IDebugExpect;
