/* eslint-disable no-console */
import chalk from "chalk";
import { testCollector } from "../common/testCollector";
import { ITestProps } from "../types";
import { corde } from "../types/globals";
import { buildReportMessage, getStackTrace, typeOf } from "../utils";
import { any } from "./asymmetricMatcher";
import * as matchers from "./matchers";

interface IReportMatcher {
  pass: boolean;
  message: string;
}

interface IMatcher {
  (props: ITestProps, ...args: any[]): IReportMatcher;
}

type KeyOfMatcher = keyof typeof matchers;

function pickFn(name: KeyOfMatcher) {
  return matchers[name] as any as IMatcher;
}

function createMatcherFn(matcher: string, isNot: boolean, expected: any, isDebug: boolean) {
  return (...args: any[]) => {
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
      if (report.pass) {
        testCollector.testsPass++;
      } else {
        testCollector.testsFailed++;
        console.log(report.message);
        console.log(trace);
      }

      if (isDebug) {
        return report;
      }
    } catch (error) {
      testCollector.testsFailed++;
      if (error instanceof Error) {
        console.log(buildReportMessage(error.message));
      } else {
        console.log(buildReportMessage(error.message));
      }
      console.log(trace);
      return error;
    }
  };
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
