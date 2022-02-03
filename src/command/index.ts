/* eslint-disable no-console */
import { forEachProp, getStackTrace, isNullOrUndefined } from "../utils";
import { any } from "../expect/asymmetricMatcher";
import * as matchers from "./matches";
import runtime from "../core";
import { ICordeBot, ITestReport } from "../types";
import { CommandState } from "./matches/commandState";

interface ICreateMatcherParam {
  matcher: string;
  isNot: boolean;
  commandName?: string | boolean | number;
  channelId?: string;
  guildId?: string;
  isDebug: boolean;
  isCascade?: boolean;
  cordeBot?: ICordeBot;
  trace?: string;
  mustSendCommand?: boolean;
}

interface IMatcher {
  (props: CommandState, ...args: any[]): Promise<ITestReport>;
}

type KeyOfMatcher = keyof typeof matchers;

function pickFn(name: KeyOfMatcher) {
  return matchers[name] as any as IMatcher;
}

function buildAndMatcherFunctions(params: ICreateMatcherParam) {
  const { commandName, isDebug, channelId, cordeBot, mustSendCommand } = params;

  const commandReturn: any = {};
  commandReturn.not = {};

  forEachProp(matchers, (matcher) => {
    commandReturn[matcher] = createMatcherFn({
      commandName,
      isDebug,
      isNot: false,
      matcher,
      channelId,
      cordeBot,
      mustSendCommand,
    });
    commandReturn.not[matcher] = createMatcherFn({
      commandName,
      isDebug,
      isNot: true,
      matcher,
      channelId,
      cordeBot,
      mustSendCommand,
    });
  });

  return commandReturn;
}

class PromiseCommand extends Promise<any> implements corde.ICommandPromise {
  private readonly _param: ICreateMatcherParam;

  get and(): corde.AllCommandMatches {
    return buildAndMatcherFunctions({
      mustSendCommand: false,
      ...this._param,
    });
  }

  constructor(
    executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void,
    param: ICreateMatcherParam,
  ) {
    super(executor);
    this._param = param;
  }

  [Symbol.toStringTag]: string;
}

async function resolveTestFunction(
  params: ICreateMatcherParam,
  fn: (...args: any[]) => Promise<ITestReport>,
): Promise<any> {
  try {
    const report = await fn();
    if (!report.pass && !params.isDebug) {
      report.trace = params.trace;
    }

    runtime.internalEvents.emit("test_end", report);

    if (params.isDebug) {
      return report;
    }
  } catch (error) {
    const failedReport: ITestReport = {
      pass: false,
      testName: params.matcher,
      message: handleError(error),
    };

    if (!params.isDebug) {
      failedReport.trace = params.trace;
    }

    runtime.internalEvents.emit("test_end", failedReport);
    if (params.isDebug) {
      return failedReport;
    }
  }
}

function createMatcherFn(params: ICreateMatcherParam) {
  const {
    matcher,
    isNot,
    commandName,
    channelId,
    isDebug,
    isCascade,
    cordeBot,
    guildId,
    mustSendCommand,
  } = params;

  const trace = getStackTrace(undefined, true, matcher);
  const { testCollector, configs } = runtime;

  if (!testCollector.currentTestFile?.isInsideTestClosure && !isCascade) {
    throw new Error("command can only be used inside a test(it) closure");
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

    const matcherFn = pickFn(matcher as KeyOfMatcher);

    const props = new CommandState({
      isNot,
      cordeBot: isDebug ? cordeBot ?? runtime.bot : runtime.bot,
      command: commandName,
      timeout: configs.getConfigTimeoutOrDefault(),
      guildId: guildId ?? configs.guildId,
      channelId: channelId ?? configs.channelId,
      testName: matcher,
      isCascade: isCascade ?? false,
      mustSendCommand: isNullOrUndefined(mustSendCommand) ? true : !!mustSendCommand,
    });

    const fn = matcherFn.bind(props, ...args);
    params.trace = trace;
    return new PromiseCommand(async (resolve, reject) => {
      try {
        const response = await resolveTestFunction(params, fn);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }, params);
  };
}

function handleError(error: any) {
  if (error instanceof Error) {
    return error.message;
  }
  return error;
}

function createLocalCommand(isDebug: boolean) {
  let localCommand: any = {};

  localCommand = (commandName: any, channelId?: string, cordeBot?: ICordeBot) => {
    const commandReturn: any = {
      should: {
        not: {},
      },
    };

    forEachProp(matchers, (matcher) => {
      commandReturn.should[matcher] = createMatcherFn({
        commandName,
        isDebug,
        isNot: false,
        matcher,
        channelId,
        cordeBot,
      });
      commandReturn.should.not[matcher] = createMatcherFn({
        commandName,
        isDebug,
        isNot: true,
        matcher,
        channelId,
        cordeBot,
      });
    });

    return commandReturn;
  };

  localCommand.any = any;

  return localCommand;
}

export const command = createLocalCommand(false) as corde.ICommand;

type DebugTypes<T extends any> = {
  [P in keyof T]: T[P] extends (...args: any[]) => Promise<any>
    ? (...params: Parameters<T[P]>) => Promise<{
        pass: boolean;
        testName: string;
        message: string;
        trace?: string;
      }>
    : T[P] extends Record<string, any>
    ? DebugTypes<T[P]>
    : T[P];
};

interface DebugFn {
  <T extends any>(
    value: T,
    channelId?: string,
    cordeBot?: ICordeBot,
  ): DebugTypes<corde.IShouldCommands>;
}

/**
 * Testing object for corde
 * This is not used in production
 *
 * @internal
 */
export const debugCommand = createLocalCommand(true) as DebugFn;