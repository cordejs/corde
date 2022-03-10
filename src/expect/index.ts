/* eslint-disable no-console */
import chalk from "chalk";
import runtime from "../core/runtime";
import { TestError } from "../errors";
import { ITestProps, ITestReport } from "../types";
import { getStackTrace } from "../utils/getStackTrace";
import { isAsymmetricMatcher } from "../utils/isAsymmetricMatcher";
import { typeOf } from "../utils/typeOf";
import { any } from "./asymmetricMatcher";
import * as matchers from "./matchers";

type Matchers = {
  not: typeof matchers;
} & typeof matchers;

interface IMatcher {
  (props: ITestProps, ...args: any[]): ITestReport;
}

type KeyOfMatcher = keyof typeof matchers;

function pickFn(name: KeyOfMatcher) {
  return matchers[name] as any as IMatcher;
}

function createMatcherFn(matcher: string, isNot: boolean, expected: any, isDebug: boolean) {
  const { testCollector } = runtime;
  if (!testCollector.currentTestFile?.isInsideTestClosure && !isDebug) {
    throw new Error("expect can only be used inside a test(it) Closure");
  }
  return (...args: any[]): ITestReport | void => {
    const trace = getStackTrace(Infinity, true, matcher);
    // If someone pass expect.any, we must invoke it to return
    // the Any matcher.

    // If the suite is already marked as failed,
    // There is no need to run other tests.
    // Same for command assertion
    if (testCollector.currentSuite?.markedAsFailed) {
      return;
    }

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
          if (typeof value === "symbol" || isAsymmetricMatcher(value)) {
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
        if (!isDebug) {
          report.trace = trace;
        }
        throw new TestError(report);
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
      if (isDebug) {
        delete failedReport.trace;
        return failedReport;
      }
      throw new TestError(failedReport);
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

interface MatcherFn {
  <T>(value: T): { not: ExpectType<typeof matchers> } & ExpectType<typeof matchers>;
}

type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

type ExpectType<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? (...params: DropFirst<Parameters<T[P]>>) => { pass: boolean; message: string }
    : DebugExpectType<T[P]>;
};

export const expect = createLocalExpect(false) as MatcherFn;

type DebugExpectType<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? (...params: DropFirst<Parameters<T[P]>>) => { pass: boolean; message: string }
    : DebugExpectType<T[P]>;
};

export interface IDebugExpect {
  <T>(value: T): ExpectType<Matchers>;
  any(...classType: any[]): any;
}

/**
 * Testing object for corde
 * This is not used in production
 *
 * @internal
 */
export const cordeExpect = createLocalExpect(true) as IDebugExpect;
