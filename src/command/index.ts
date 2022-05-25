/* eslint-disable no-console */
import { forEachPropsName } from "../utils/forEachPropsName";
import { getStackTrace } from "../utils/getStackTrace";
import { isNullOrUndefined } from "../utils/isNullOrUndefined";
import { any } from "../expect/asymmetricMatcher";
import * as matchers from "./matches";
import runtime from "../core/runtime";
import { ICordeBot, ITestReport } from "../types";
import { CommandState } from "./matches/CommandState";

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

  forEachPropsName(matchers, (matcher) => {
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

class CommandPromise extends Promise<any> implements corde.ICommandPromise {
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

  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
  ): CommandPromise {
    super.catch(onrejected);
    return this;
  }

  finally(onfinally?: (() => void) | null): CommandPromise {
    super.finally(onfinally);
    return this;
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): CommandPromise {
    super.then(onfulfilled, onrejected);
    return this;
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
  const { testCollector, configs } = runtime;

  if (!testCollector.currentTestFile?.isInsideTestClosure && !isCascade) {
    throw new Error("command can only be used inside a test(it) closure");
  }

  return (
    ...args: any[]
  ): Promise<ITestReport | void | ((...args: any[]) => Promise<ITestReport>)> => {
    const trace = getStackTrace(undefined, true, matcher);
    // If someone pass expect.any, we must invoke it to return
    // the Any matcher.

    // If the suite is already marked as failed,
    // There is no need to run other tests.
    // Same for command assertion
    if (testCollector.currentSuite?.markedAsFailed) {
      return Promise.reject();
    }

    args = args.map((arg) => {
      if (arg === any) {
        return arg();
      }
      return arg;
    });

    const matcherFn = pickFn(matcher as KeyOfMatcher);

    let bot = runtime.bot;

    if (isDebug) {
      bot = cordeBot ?? runtime.bot;
    }

    const props = new CommandState({
      isNot,
      cordeBot: bot,
      command: commandName,
      timeout: configs.commandTimeout,
      guildId: guildId ?? configs.guildId,
      channelId: channelId ?? configs.channelId,
      testName: matcher,
      isCascade: isCascade ?? false,
      mustSendCommand: isNullOrUndefined(mustSendCommand) ? true : !!mustSendCommand,
    });

    const fn = matcherFn.bind(props, ...args);
    params.trace = trace;
    return new CommandPromise(async (resolve, reject) => {
      try {
        const result = await resolveTestFunction(params, fn);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, params);
  };
}

function handleError(error: any) {
  if (error instanceof Error) {
    return error.message + "\n" + error.stack;
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

    forEachPropsName(matchers, (matcher) => {
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

type DebugTypes<T> = {
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

type MatchersWithNot = {
  not: typeof matchers;
} & typeof matchers;

type Matchers = {
  should: MatchersWithNot;
};

interface DebugFn {
  <T>(value: T, channelId?: string, cordeBot?: ICordeBot): DebugTypes<Matchers>;
}

/**
 * Testing object for corde
 * This is not used in production
 *
 * @internal
 */
export const debugCommand = createLocalCommand(true) as DebugFn;
