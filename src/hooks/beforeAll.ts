import { STACK_TRACE_COUNT_LIMIT } from "../const";
import runtime from "../core/runtime";
import { getStackTrace } from "../utils/getStackTrace";
import { isFunction } from "../utils/isFunction";
import { hookBuilder } from "./hookBuilder";

export const beforeAll: corde.IHook = (fn: () => void | Promise<void>, timeout?: number) => {
  const { testCollector } = runtime;
  if (isFunction(fn)) {
    const trace = getStackTrace(STACK_TRACE_COUNT_LIMIT);
    hookBuilder({
      hookHandler: (fn) => testCollector.currentTestFile.addBeforeAllHook(fn),
      fn,
      trace,
      errorTitle: "BeforeAll",
      timeout,
    });
  }
};
