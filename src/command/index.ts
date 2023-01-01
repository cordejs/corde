/* eslint-disable no-console */
import { forEachPropsName } from "../utils/forEachPropsName";
import { getStackTrace } from "../utils/getStackTrace";
import { isNullOrUndefined } from "../utils/isNullOrUndefined";
import { any } from "../expect/asymmetricMatcher";
import * as matchers from "./matches";
import * as matchersUtils from "./matches/utilities";
import runtime from "../core/runtime";
import { ICordeBot, ITestReport } from "../types";
import { CommandState } from "./matches/CommandState";
import { object } from "../utils/object";
import { ICreateMatcherParam } from "./types";

interface IMatcher {
  (props: CommandState, ...args: any[]): Promise<ITestReport>;
}

interface IUtilityMatcher {
  (props: CommandState, ...args: any[]): CommandState;
}

type KeyOfMatcher = keyof typeof matchers;
type KeyOfMatcherUtilities = keyof typeof matchersUtils;

function pickMatcher(name: KeyOfMatcher) {
  return matchers[name] as any as IMatcher;
}

function pickUtilityMatcher(name: KeyOfMatcherUtilities) {
  return matchersUtils[name] as any as IUtilityMatcher;
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
    utility,
  } = params;
  const { testCollector, configs } = runtime;

  if (!testCollector.currentTestFile?.isInsideTestClosure && !isCascade) {
    throw new Error("command can only be used inside a test(it) closure");
  }

  return (...args: any[]) => {
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

    let bot = runtime.bot;

    if (isDebug) {
      bot = cordeBot ?? runtime.bot;
    }

    const props = new CommandState({
      isNot: isNot ?? false,
      cordeBot: bot,
      command: commandName,
      timeout: configs.commandTimeout,
      guildId: guildId ?? configs.guildId,
      channelId: channelId ?? configs.channelId,
      testName: matcher ?? "",
      isCascade: isCascade ?? false,
      mustSendCommand: isNullOrUndefined(mustSendCommand) ? true : !!mustSendCommand,
    });

    if (utility) {
      const matcherUtilityFn = pickUtilityMatcher(matcher as KeyOfMatcherUtilities);
      const fnUtility = matcherUtilityFn.bind(props, ...args);
      const newConfig = fnUtility();
      const funcs = {
        not: {},
      };

      const configs: ICreateMatcherParam = {
        isNot: newConfig.isNot,
        commandName: newConfig.command,
        isCascade: newConfig.isCascade,
        channelId: newConfig.channelId,
        guildId: newConfig.guildId,
        utility: false,
        isDebug: isDebug,
        cordeBot: newConfig.cordeBot,
        mustSendCommand: newConfig.mustSendCommand,
      };

      injectMatchFunctions(funcs, matchers, configs);
      injectMatchFunctions(funcs.not, matchers, configs);

      return funcs;
    }

    const matcherFn = pickMatcher(matcher as KeyOfMatcher);
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
    return error.message;
  }
  return error;
}

function injectMatchFunctions(objToInject: any, functions: any, params?: ICreateMatcherParam) {
  object.foreachKey(functions, (matcher) => {
    objToInject[matcher] = createMatcherFn({
      commandName: params?.commandName ?? "",
      isDebug: params?.isDebug ?? false,
      isNot: params?.isNot ?? false,
      matcher: params?.matcher ?? (matcher as string),
      channelId: params?.channelId,
      utility: params?.utility,
      cordeBot: params?.cordeBot,
    });
  });
}

function createLocalCommand(isDebug: boolean, params?: ICreateMatcherParam) {
  let localCommand: any = {};

  localCommand = (commandName: any, channelId?: string, cordeBot?: ICordeBot) => {
    const commandReturn: any = {
      should: {
        not: {},
      },
    };

    object.foreachKey(matchersUtils, (matcher) => {
      commandReturn.should[matcher] = createMatcherFn({
        commandName: params?.commandName ?? commandName,
        isDebug: params?.isDebug ?? isDebug,
        isNot: params?.isNot ?? false,
        matcher: params?.matcher ?? matcher,
        channelId: params?.channelId ?? channelId,
        utility: params?.utility ?? true,
        cordeBot: params?.cordeBot ?? cordeBot,
      });
    });

    object.foreachKey(matchers, (matcher) => {
      commandReturn.should[matcher] = createMatcherFn({
        commandName: params?.commandName ?? commandName,
        isDebug: params?.isDebug ?? isDebug,
        isNot: params?.isNot ?? false,
        matcher: params?.matcher ?? matcher,
        channelId: params?.channelId ?? channelId,
        cordeBot: params?.cordeBot ?? cordeBot,
      });

      commandReturn.should.not[matcher] = createMatcherFn({
        commandName: params?.commandName ?? commandName,
        isDebug: params?.isDebug ?? isDebug,
        isNot: params?.isNot ?? true,
        matcher: params?.matcher ?? matcher,
        channelId: params?.channelId ?? channelId,
        cordeBot: params?.cordeBot ?? cordeBot,
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
    : T[P] extends (...params: any[]) => CommandState
    ? (...params: Parameters<T[P]>) => DebugTypes<T>
    : T[P] extends Record<string, any>
    ? DebugTypes<T[P]>
    : T[P];
};

type MatchersWithNot = {
  not: typeof matchers;
} & typeof matchers;

type Matchers = {
  should: MatchersWithNot & typeof matchersUtils;
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
