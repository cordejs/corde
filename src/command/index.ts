/* eslint-disable no-console */
import { testCollector } from "../common/testCollector";
import { corde } from "../types/globals";
import { buildReportMessage, getStackTrace } from "../utils";
import { any } from "../expect/asymmetricMatcher";
import * as matchers from "./matches";
import { ICommandMatcherProps } from "./types";
import { runtime } from "../common/runtime";
import { ICordeBot, ITestReport } from "../types";
import { InternalError } from "../errors";

interface ICreateMatcherParam {
  matcher: string;
  isNot: boolean;
  commandName?: string;
  channelId?: string;
  guildId?: string;
  isDebug: boolean;
  isCascade?: boolean;
  cordeBot?: ICordeBot;
}

interface IReportMatcher {
  pass: boolean;
  message: string;
}

interface IMatcher {
  (props: ICommandMatcherProps, ...args: any[]): Promise<IReportMatcher>;
}

type KeyOfMatcher = keyof typeof matchers;

function pickFn(name: KeyOfMatcher) {
  return matchers[name] as any as IMatcher;
}

// Export this function to be used in tests
export function createMatcherObject({
  isNot,
  commandName,
  matcher,
  channelId,
  guildId,
  cordeBot,
  isDebug,
}: ICreateMatcherParam): Partial<ICommandMatcherProps> {
  const propTemp: Partial<ICommandMatcherProps> = {
    isNot,
    cordeBot: isDebug ? cordeBot ?? runtime.bot : runtime.bot,
    command: commandName,
    timeout: runtime.timeout,
    guildId: guildId ?? runtime.guildId,
    channelId: channelId ?? runtime.channelId,
    hasPassed: false,
    testName: matcher,
  };

  // "Gambiarra" to use only properties.
  const prop: ICommandMatcherProps = propTemp as any;

  prop.createReport = function (...messages: (string | null | undefined)[]): ITestReport {
    let message = "";
    if (messages.length) {
      message = buildReportMessage(...messages);
    }

    return {
      testName: prop.testName,
      pass: prop.hasPassed,
      message,
    };
  };

  prop.createPassTest = function (): ITestReport {
    return {
      pass: true,
      testName: this.testName,
    };
  };

  prop.createFailedTest = function (...messages: (string | null | undefined)[]): ITestReport {
    const report = prop.createReport(...messages);
    report.pass = false;
    return report;
  };

  prop.invertHasPassedIfIsNot = function () {
    if (prop.isNot) {
      prop.hasPassed = !prop.hasPassed;
    }
  };

  prop.sendCommandMessage = function (forceSend?: boolean) {
    // Tests in cascade controus when the message should be sent.
    if (!prop.isCascade || forceSend) {
      return prop.cordeBot.sendTextMessage(prop.command, prop.channelIdToSendCommand);
    }
    return Promise.resolve();
  };

  prop.toString = function () {
    return this.testName ?? "ExpectTest";
  };

  return prop;
}

function createMatcherFn({
  matcher,
  isNot,
  commandName,
  channelId,
  isDebug,
  isCascade,
  cordeBot,
}: ICreateMatcherParam) {
  return async (...args: any[]) => {
    // If someone pass expect.any, we must invoke it to return
    // the Any matcher.

    args = args.map((arg) => {
      if (arg === any) {
        return arg();
      }
      return arg;
    });

    const trace = getStackTrace(undefined, true, matcher);
    try {
      const matcherFn = pickFn(matcher as KeyOfMatcher);

      const props = createMatcherObject({
        isDebug,
        commandName,
        isNot,
        matcher,
        channelId,
        cordeBot,
      });

      const fn = matcherFn.bind(props, ...args);

      if (isCascade) {
        return fn;
      }

      const report = await fn();

      if (isDebug) {
        return report;
      }

      if (report.pass) {
        testCollector.testsPass++;
      } else {
        testCollector.testsFailed++;
        console.log(report.message);
        console.log(trace);
      }

      return undefined;
    } catch (error) {
      testCollector.testsFailed++;
      handleError(error, trace);
      return {
        pass: false,
        message: error,
      };
    }
  };
}
function handleError(error: any, trace: string) {
  if (error instanceof InternalError) {
    console.log(buildReportMessage(error.message));
    console.log(trace);
  } else if (error instanceof Error) {
    console.log(buildReportMessage(error.message));
    console.log(buildReportMessage(error.stack));
  } else {
    console.log(buildReportMessage(error));
  }
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

type DebugExpectType<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? (...params: Parameters<T[P]>) => ReturnType<T[P]>
    : DebugExpectType<T[P]>;
};

export interface IDebugExpect {
  <T extends any>(value: T, channelId?: string, cordeBot?: ICordeBot): DebugExpectType<Matchers>;
  any(...classType: any[]): any;
}

/**
 * Testing object for corde
 * This is not used in production
 *
 * @internal
 */
export const debugCommand = createLocalCommand(true) as IDebugExpect;
