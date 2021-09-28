/* eslint-disable no-console */
import { testCollector } from "../common/testCollector";
import { corde } from "../types/globals";
import { getStackTrace } from "../utils";
import { any } from "../expect/asymmetricMatcher";
import * as matchers from "./matches";
import { runtime } from "../common/runtime";
import { ICordeBot, ITestReport } from "../types";
import { CommandState } from "./matches/commandstate";

interface ICreateMatcherParam {
  matcher: string;
  isNot: boolean;
  commandName?: string | boolean | number;
  channelId?: string;
  guildId?: string;
  isDebug: boolean;
  isCascade?: boolean;
  cordeBot?: ICordeBot;
}

interface IMatcher {
  (props: CommandState, ...args: any[]): Promise<ITestReport>;
}

type KeyOfMatcher = keyof typeof matchers;

function pickFn(name: KeyOfMatcher) {
  return matchers[name] as any as IMatcher;
}

function createMatcherFn({
  matcher,
  isNot,
  commandName,
  channelId,
  isDebug,
  isCascade,
  cordeBot,
  guildId,
}: ICreateMatcherParam) {
  const trace = getStackTrace(undefined, true, matcher);
  if (!testCollector.currentTestFile?.isInsideTestClausure && !isCascade) {
    throw new Error("command can only be used inside a test(it) clausure");
  }

  return async (
    ...args: any[]
  ): Promise<ITestReport | void | ((...args: any[]) => Promise<ITestReport>)> => {
    // If someone pass expect.any, we must invoke it to return
    // the Any matcher.

    // If the suite is already marked as failed,
    // There is no need to run other tests.
    // Same for command assertion
    if (testCollector.currentSuite?.markedAsFailed) {
      return;
    }

    args = args.map((arg) => {
      if (arg === any) {
        return arg();
      }
      return arg;
    });

    try {
      const matcherFn = pickFn(matcher as KeyOfMatcher);

      const props = new CommandState({
        isNot,
        cordeBot: isDebug ? cordeBot ?? runtime.bot : runtime.bot,
        command: commandName,
        timeout: runtime.timeout,
        guildId: guildId ?? runtime.guildId,
        channelId: channelId ?? runtime.channelId,
        testName: matcher,
        isCascade: isCascade ?? false,
      });

      const fn = matcherFn.bind(props, ...args);

      if (isCascade) {
        return fn;
      }

      const report = await fn();

      if (!report.pass && !isDebug) {
        report.trace = trace;
      }

      runtime.internalEvents.emit("test_end", report);

      if (isDebug) {
        return report;
      }
    } catch (error) {
      const failedReport: ITestReport = {
        pass: false,
        testName: matcher,
        message: handleError(error),
      };

      if (!isDebug) {
        failedReport.trace = trace;
      }

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

function createLocalCommand(isDebug: boolean) {
  let localExpect: any = {};

  localExpect = (commandName: any, channelId?: string, cordeBot?: ICordeBot) => {
    const _expect: any = {};
    _expect.not = {};
    Object.getOwnPropertyNames(matchers).forEach((matcher) => {
      _expect[matcher] = createMatcherFn({
        commandName,
        isDebug,
        isNot: false,
        matcher,
        channelId,
        cordeBot,
      });
      _expect.not[matcher] = createMatcherFn({
        commandName,
        isDebug,
        isNot: true,
        matcher,
        channelId,
        cordeBot,
      });
    });
    return _expect;
  };

  Object.getOwnPropertyNames(matchers).forEach((matcher) => {
    localExpect[matcher] = createMatcherFn({
      isDebug,
      isNot: false,
      matcher,
      isCascade: true,
    });
  });

  localExpect.any = any;

  return localExpect;
}

export const command = createLocalCommand(false) as corde.ICommand;

type Matchers = {
  not: typeof matchers;
} & typeof matchers;

type DebugExpectType<T, TResponse extends "cascade" | "unique"> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? (
        ...params: Parameters<T[P]>
      ) => TResponse extends "cascade" ? () => ReturnType<T[P]> : ReturnType<T[P]>
    : DebugExpectType<T[P], TResponse>;
};

export interface IDebugExpect extends DebugExpectType<Matchers, "cascade"> {
  <T extends any>(value: T, channelId?: string, cordeBot?: ICordeBot): DebugExpectType<
    Matchers,
    "unique"
  >;
  any(...classType: any[]): any;
}

/**
 * Testing object for corde
 * This is not used in production
 *
 * @internal
 */
export const debugCommand = createLocalCommand(true) as IDebugExpect;
